import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constant";
import api from "../api";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState();

  useEffect(() => {
    auth().catch( () => setIsAuthorized(false))
  }, [])

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      // send a request to backend with the refresh token to get a new access token
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });

      if (res.status == 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access)
        setIsAuthorized(true)
      }  else {
        setIsAuthorized(false)
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    // this first look and check if there is an access token and there is one, then it checks to know if it is expired or not
    // if it is expired this function just refreshes the token in the background, if expired just go back and login

    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now / 1000; //date in sec

    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

 if (isAuthorized === undefined) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}
export default ProtectedRoute;
