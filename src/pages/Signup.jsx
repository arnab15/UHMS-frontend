import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { signup } from "../services/authService";
import { setItem } from "../services/storageService";

import Input from "../components/Input/Input";

function SignUPPage(props) {
   const initialValues = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      mobileNumber: "",
   };

   const validationSchema = Yup.object().shape({
      name: Yup.string().trim().min(3).required("Name is required"),
      mobileNumber: Yup.string()
         .trim()
         .matches(/^[0-9]{10}$/, "Phone number Must Be 10 digit")
         .required("Require"),
      email: Yup.string()
         .lowercase()
         .trim()
         .email()
         .required("Email is Require"),
      password: Yup.string().trim().min(6).required("Require"),
      confirmPassword: Yup.string()
         .oneOf([Yup.ref("password"), null], "Passwords must be match")
         .required("required"),
   });

   const handelLoginSubmit = async (
      values,
      { setSubmiting, resetForm, setFieldError }
   ) => {
      const { name, email, password, confirmPassword } = values;
      if (password !== confirmPassword)
         return console.log("password not matched");

      try {
         //  const response = await signup(name, email, password);
         console.log(values);

         resetForm();
      } catch (error) {
         if (error.response && error.response.status === 400) {
            setFieldError("email", error.response.data.error.message);
         }
      }
      //console.log(values);
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
               <div className="mt-10 mx-6 md:max-w-sm md:mx-auto pb-5">
                  <h1 className="text-center font-semibold text-xl">
                     Add New Mentor
                  </h1>

                  <form onSubmit={handleSubmit}>
                     <Input
                        labelName="Mentor Name"
                        placeholder="Enter Mentor  Name"
                        type="text"
                        name="name"
                        value={values.name}
                        error={errors.name}
                        onBlur={handleBlur}
                        handelChange={handleChange}
                     />
                     <Input
                        labelName="Mentor Phone Number"
                        placeholder="Enter Mentor Phone Number"
                        type="text"
                        name="mobileNumber"
                        value={values.mobileNumber}
                        error={errors.mobileNumber}
                        onBlur={handleBlur}
                        handelChange={handleChange}
                     />
                     <Input
                        labelName="Mentor Email Address"
                        placeholder="Enter Mentor email"
                        type="text"
                        name="email"
                        value={values.email}
                        error={errors.email}
                        onBlur={handleBlur}
                        handelChange={handleChange}
                     />
                     <Input
                        labelName="Password"
                        placeholder="Enter Mentor Password"
                        type="password"
                        name="password"
                        value={values.password}
                        handelChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.password}
                     />
                     <Input
                        labelName="Confirm Mentor Password"
                        placeholder="confirm Mentor Password"
                        type="password"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        error={errors.confirmPassword}
                        onBlur={handleBlur}
                        handelChange={handleChange}
                     />
                     <button
                        disabled={isValidating}
                        className="px-4 py-2 mt-4 text-white w-full font-light tracking-wider focus:outline-none bg-blue-600 hover:bg-blue-700 rounded "
                        type="submit">
                        Add Mentor
                     </button>
                  </form>
               </div>
            );
         }}
      </Formik>
   );
}

export default SignUPPage;
