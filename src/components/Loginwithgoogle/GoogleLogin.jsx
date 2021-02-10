import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { loginWithGoogle } from "../../services/authService";
import { setItem } from "../../services/storageService";
import { ReactComponent as GoogleLogo } from "../../assets/img/search.svg";
import { useContext } from "react";
import UserContext from "../../context/userContext";
import { withRouter } from "react-router-dom";

const LoginWithGoogle = ({ buttonText, history }) => {
   const [error, setError] = useState(null);
   const user = useContext(UserContext);
   const responseSuccessGoogleLogin = async (res) => {
      try {
         const response = await loginWithGoogle(res.tokenId);

         if (response.status === 201) {
            setItem(response.headers["x-auth-token"]);
            user.setCurrentUser();
            history.replace("/adddetails");
            // console.log("New User", response);
         }

         if (response.status === 200) {
            const {
               data: { detailsSubmitted },
            } = response;
            setItem(response.data.token);
            user.setCurrentUser();
            history.replace(
               detailsSubmitted
                  ? (window.location = "/dashboard")
                  : "/adddetails"
            );
         }
         setError(null);
      } catch (error) {
         if (error.response && error.response.status >= 400)
            setError(error.response.data.error.message);
      }
   };
   const responseSuccessGoogleLoginFail = ({ details }) => {
      // setError(details);
   };
   return (
      <div className="mx-auto ">
         {error && <p className="text-center m-2 text-red-500">{error}</p>}
         <GoogleLogin
            clientId="974470046195-lqntanta1hcg4rvsjbp15h7rqh8vpfhj.apps.googleusercontent.com"
            render={(renderProps) => (
               <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="px-4 py-2 mt-4 flex text-black w-full font-light tracking-wider items-center justify-center border border-gray-200 bg-gray-100 hover:bg-gray-200 focus:outline-none shadow-md rounded">
                  <span className="mx-4 inline-block">
                     <GoogleLogo />
                  </span>
                  <span className="inline-block font-medium text-gray-500">
                     {buttonText}
                  </span>
               </button>
            )}
            onSuccess={responseSuccessGoogleLogin}
            onFailure={responseSuccessGoogleLoginFail}
            cookiePolicy={"single_host_origin"}
         />
      </div>
   );
};

export default withRouter(LoginWithGoogle);
