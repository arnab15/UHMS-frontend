import React, { useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { mentorLogin } from "../services/authService";
import { setItem } from "../services/storageService";
import Input from "../components/Input/Input";
import { Link, Redirect } from "react-router-dom";
import UserContext from "../context/userContext";
function LoginPage(props) {
   const userContext = useContext(UserContext);
   if (userContext.currentUser) return <Redirect to="/" />;

   const initialValues = {
      email: "",
      password: "",
   };
   const validationSchema = Yup.object().shape({
      email: Yup.string().trim().email().required("Required"),
      password: Yup.string().trim().min(6).required("Required"),
   });
   const handelLoginSubmit = async (
      values,
      { setSubmiting, resetForm, setFieldError }
   ) => {
      try {
         const { email, password } = values;

         const {
            data: { token },
         } = await mentorLogin(email, password);
         setItem(token);
         userContext.setCurrentUser();
         props.history.push("/");
         // console.log(token);
         resetForm();
      } catch (error) {
         if (error.response && error.response.status === 400) {
            setFieldError("email", error.response.data.error.message);
         }
      }
      // resetForm();
   };
   return (
      <Formik
         initialValues={initialValues}
         validationSchema={validationSchema}
         onSubmit={handelLoginSubmit}>
         {(props) => {
            const {
               values,
               isValidating,
               errors,
               handleChange,
               handleBlur,
               handleSubmit,
            } = props;
            return (
               <div className="mt-10 mx-6 md:max-w-sm md:mx-auto">
                  <h1 className="text-center font-semibold text-xl">
                     Mentor/Admin Login
                  </h1>
                  <form onSubmit={handleSubmit}>
                     <Input
                        labelName="Email Address"
                        placeholder="Enter email"
                        type="text"
                        name="email"
                        value={values.email}
                        error={errors.email}
                        onBlur={handleBlur}
                        handelChange={handleChange}
                     />
                     <Input
                        labelName="Password"
                        placeholder="Enter Password"
                        type="password"
                        name="password"
                        value={values.password}
                        handelChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.password}
                     />
                     <button
                        disabled={isValidating}
                        className="px-4 py-2 mt-4 text-white w-full font-light tracking-wider focus:outline-none  bg-blue-600 hover:bg-blue-700  rounded"
                        type="submit">
                        Login
                     </button>
                  </form>

                  <div className="ml-3 my-3">
                     Are You A student?{" "}
                     <Link to="/auth">
                        <span className="text-blue-500"> Student Login </span>
                     </Link>
                  </div>
               </div>
            );
         }}
      </Formik>
   );
}

export default LoginPage;
