import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import CustomSelect from "../components/CustomSelect/CustomSelect";
import Input from "../components/Input/Input";
const Events = () => {
   const genderOptions = [
      { value: "Male", label: "male" },
      { value: "Female", label: "female" },
      { value: "Others", label: "others" },
   ];
   const validateSchema = Yup.object().shape({
      gender: Yup.string().required("Required"),
      name: Yup.string().required("Required"),
   });
   return (
      <Formik
         onSubmit={(values) => {
            console.log(values);
         }}
         validationSchema={validateSchema}
         initialValues={{
            gender: "",
            name: "",
         }}>
         {(props) => {
            const {
               values,
               errors,
               handleChange,
               handleBlur,
               handleSubmit,
               setFieldValue,
            } = props;

            return (
               <form onSubmit={handleSubmit}>
                  <Input
                     labelName="Your Full Name"
                     placeholder="Enter your full name"
                     type="text"
                     name="name"
                     value={values.name}
                     error={errors.name}
                     onBlur={handleBlur}
                     handelChange={handleChange}
                  />
                  <CustomSelect
                     options={genderOptions}
                     onChange={(value) => setFieldValue("gender", value.value)}
                     error={errors.gender}
                     value={values.gender}
                  />
                  <button type="submit">Submit</button>
               </form>
            );
         }}
      </Formik>
   );
};

export default Events;
