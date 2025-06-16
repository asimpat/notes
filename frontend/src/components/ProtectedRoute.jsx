import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constant";
import api from "../api";
import { useState } from "react";

function ProtectedRoute({children}) {

    const [isAuthorized, setIsAuthorized] = useState();

    const refreshToken = async (params) => {
        
    }

    const auth = async () =>  {
        // this first look and check if there is an access token and there is one, then it checks to know if it is expired or not
        // if it is expired this function just refreshes the token in the background

    }

    if (isAuthorized) {
        return <div>Loading.....</div>
    }    

    return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoute