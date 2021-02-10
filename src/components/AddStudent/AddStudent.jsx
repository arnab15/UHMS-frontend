import { Formik } from "formik";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import * as Yup from "yup";
import UserContext from "../../context/userContext";
import { getAllMentors } from "../../services/mentorService";
import { createStudentDetails } from "../../services/studentService";
import CustomSelect from "../CustomSelect/CustomSelect";
import Input from "../Input/Input";
import { genderOptions, hostelOptions, stateOptions } from "./option_helper";
function AddStudent(props) {
   const authenticatedUser = useContext(UserContext);
   const [backendError, setBackendError] = useState(null);
   const [mentors, setMentors] = useState();
   //console.log("ADDSTUDENT", authenticatedUser);
   const getMentors = async () => {
      const { data } = await getAllMentors();
      const modifiedMentors = data.mentors.map((mentor) => ({
         value: mentor._id,
         label: mentor.name,
      }));
      //console.log(modifiedMentors);
      setMentors(modifiedMentors);
   };
   useEffect(() => {
      getMentors();
   }, []);
   // if (!authenticatedUser.currentUser) return <Redirect to="/" />;

   const initialValues = {
      name: "",
      parentsContactNumber: "",
      mobileNumber: "",
      assignedMentor: "",
      state: "",
      hostelName: "",
      hostelRoomNo: "",
      gender: "",
      // studentId: "",
   };

   const phoneRegx = /^[0-9]{10}$/;

   const validationSchema = Yup.object().shape({
      name: Yup.string().trim().min(3).required("Required"),
      parentsContactNumber: Yup.string()
         .trim()
         .matches(phoneRegx, "Phone number Must Be 10 digit")
         .required("Require"),
      mobileNumber: Yup.string()
         .trim()
         .matches(phoneRegx, "Phone number Must Be 10 digit")
         .required("Require"),
      state: Yup.string().trim().required("Required"),
      hostelName: Yup.string().trim().min(3).required("Required"),
      hostelRoomNo: Yup.string().trim().min(3).required("Required"),
      assignedMentor: Yup.string().trim().required("Required"),
      gender: Yup.string().trim().required("Required"),
   });

   const handelStudentInfoSubmit = async (
      values,
      { setSubmiting, resetForm, setFieldError }
   ) => {
      console.log(values);
      const studentDetails = {
         ...values,
         studentId: authenticatedUser.currentUser._id,
      };
      try {
         const { data } = await createStudentDetails(studentDetails);
         //console.log("Returned data", data);
         resetForm();
         props.history.replace("/dashboard");
      } catch (error) {
         if (error.response && error.response.status === 400) {
            setBackendError(error.response.data.error.message);
            // setFieldError("name", error.response.data.error.message);
         }
      }
   };
   // resetForm();

   return (
      <Formik
         initialValues={initialValues}
         validationSchema={validationSchema}
         onSubmit={handelStudentInfoSubmit}>
         {(props) => {
            const {
               values,
               isValidating,
               errors,
               handleChange,
               handleBlur,
               handleSubmit,
               setFieldValue,
            } = props;
            return (
               <div className="my-10 mx-6 md:max-w-sm md:mx-auto">
                  <h1 className="text-center font-semibold text-xl">
                     Student Details
                  </h1>
                  {backendError && (
                     <p className="text-center text-red-500">{backendError}</p>
                  )}
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
                     <Input
                        labelName="Submit Your Parents mobile number"
                        placeholder="Enter Your Parents mobile number"
                        type="text"
                        name="parentsContactNumber"
                        value={values.parentsContactNumber}
                        handelChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.parentsContactNumber}
                     />
                     <Input
                        labelName="Submit Your Phone number"
                        placeholder="Enter Your Phone number"
                        type="text"
                        name="mobileNumber"
                        value={values.mobileNumber}
                        handelChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.mobileNumber}
                     />
                     <CustomSelect
                        value={values.hostelName}
                        labelName="Select Your Hostel"
                        options={hostelOptions}
                        onChange={(value) =>
                           setFieldValue("hostelName", value.value)
                        }
                        error={errors.hostelName}
                     />
                     <Input
                        labelName="What is your Hostel Room Number?"
                        placeholder="Enter Your hostel room  number"
                        type="text"
                        name="hostelRoomNo"
                        value={values.hostelRoomNo}
                        handelChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.hostelRoomNo}
                     />
                     <CustomSelect
                        value={values.gender}
                        labelName="Gender"
                        options={genderOptions}
                        onChange={(value) =>
                           setFieldValue("gender", value.value)
                        }
                        error={errors.gender}
                     />

                     <CustomSelect
                        value={values.state}
                        labelName="Where You Came From? Select Your State"
                        options={stateOptions}
                        onChange={(value) =>
                           setFieldValue("state", value.value)
                        }
                        error={errors.state}
                     />
                     <CustomSelect
                        value={values.assignedMentor}
                        labelName="Choose Your Mentor"
                        options={mentors}
                        onChange={(value) =>
                           setFieldValue("assignedMentor", value.value)
                        }
                        error={errors.assignedMentor}
                     />
                     <button
                        disabled={isValidating}
                        className="px-4 py-2 mt-4 text-white w-full font-light tracking-wider focus:outline-none  bg-blue-600 hover:bg-blue-700  rounded"
                        type="submit">
                        Submit
                     </button>
                  </form>
               </div>
            );
         }}
      </Formik>
   );
}

export default AddStudent;
