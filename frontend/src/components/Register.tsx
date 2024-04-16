import { useState } from 'react';
import { Link } from 'react-router-dom'; 

interface RegisterProps {}


const Register = (props: RegisterProps) => {

 const[lightMode, setLightMode] = useState(false);
const[lightOrDark, setLightOrDark] = useState('on');

 
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
<form>
  <label>
    Username:
    <input type="text" name="username" />
  </label>
  <label>
    Password:
    <input type="password" name="password" />
  </label>
  <button type="submit">Login</button> 
 <p>Already have an Account?<Link to="/login"> Login here</Link></p> 
 <p> Turn the lights <strong onClick={clickLight}>{lightOrDark}</strong></p>
  </form> 
</div>
)
}

export default Register;