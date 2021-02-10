import React from "react";
import { useContext } from "react";
import { Link, Redirect } from "react-router-dom";

import LoginWithGoogle from "../components/Loginwithgoogle/GoogleLogin";
import UserContext from "../context/userContext";

function Auth(props) {
   const authenticatedUser = useContext(UserContext);
   if (authenticatedUser.currentUser) return <Redirect to="/" />;
   return (
      <div className="mt-10 mx-6 md:max-w-sm md:mx-auto">
         <h1 className="text-center font-semibold text-xl">Student Login</h1>
         <LoginWithGoogle buttonText="Login with Google" />
         <div className="ml-3 my-3">
            Are You a Mentor?
            <Link to="/mlogin">
               <span className="text-blue-500"> Login As Mentor </span>
            </Link>
         </div>
      </div>
   );
}

export default Auth;
