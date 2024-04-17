import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import Cookies from "universal-cookie";
import axios, { AxiosError} from "axios";
const cookies = new Cookies();

interface RegisterProps {}


const Register = (props: RegisterProps) => {

 const[lightMode, setLightMode] = useState(false);
const[lightOrDark, setLightOrDark] = useState('on');
const [username, setUsername] = React.useState("");
const [password, setPassword] = React.useState("");
const [register, setRegister] = React.useState(false);



const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  const configuration = {
     method: "post",
     url: "http://localhost:8082/authenticate/register",   
     data: {
       username,
       password,
     },
   };
   axios(configuration).then((result) => {
    console.log(result)
    cookies.set("TOKEN", result.data.token, {
      path: "/",
  });
  window.location.href = "/home";
  setRegister(true);
})
.catch((error: AxiosError)=> {
  setRegister(false)
if (error.response) {
  console.log('Error response data:', error.response.data);
      console.log('Error response status:', error.response.status);
      console.log('Error response headers:', error.response.headers);
  } else if (error.request) {
      // The request was made but no response was received
      console.log('Error request:', error.request);
  } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error message:', error.message);
  }
  console.log('Error config:', error.config);
});
}


 
const clickLight = () => {
///toggle light mode   
setLightMode(!lightMode);
if(lightMode === true){
    setLightOrDark('off');
   
}
else{
    setLightOrDark('on');
}
}


return(
<div>
<h1>Sign Up</h1>
<form onSubmit={(e) => handleSubmit(e)}>
  <label>
    Username:
    <input type="text" placeholder="Enter username" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
  </label>
  <label>
    Password:
    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
  </label>
  <button type="submit">Sign Up</button> 
 <p>Already have an Account?<Link to="/login"> Login here</Link></p> 
 <p> Turn the lights <strong onClick={clickLight}>{lightOrDark}</strong></p>
  </form> 
  {register ? 
  (<p className="text-success">You Are Registered Successfully</p>) : 
  (<p className="text-danger">You Are Not Registered</p>)}
</div>
)
}

export default Register;