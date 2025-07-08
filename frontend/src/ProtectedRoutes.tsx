import { Outlet, Navigate } from "react-router-dom";
import Cookies from 'universal-cookie';

const ProtectedRoutes = () => {
    const cookies = new Cookies();
    //console.log(cookies)
    const token = cookies.get("TOKEN");
    //console.log(token);
    const isAuthenticated = Boolean(token);
    //console.log(isAuthenticated)
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
  
};

export default ProtectedRoutes;