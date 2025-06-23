// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null); // null = loading, true/false = result

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get("https://noteapp-i3ky.onrender.com/api/auth/verify", {
          withCredentials: true, // Important for sending cookies
        });
        if(res.data.authenticated){
          setAuth(true)
        }else{
          setAuth(false);
        }
        
      } catch (err) {
        setAuth(false);
      }
    };

    verifyUser();
  }, []);

  if (auth === null) return <div>Loading...</div>;
  if (!auth) return <Navigate to="/signin" />;
  return children;
};

export default ProtectedRoute;
