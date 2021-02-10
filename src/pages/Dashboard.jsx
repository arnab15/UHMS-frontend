import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import moment from "moment";
import UserContext from "../context/userContext";
import {
   getStudentById,
   submitStudentHealthRecord,
} from "../services/studentService";

import MentorDetails from "../components/MentorDetails/MentorDetails";
import DashBoardHeader from "../components/DashBoardHeader/DashBoardHeader";
import SUbmitDailyHealth from "../components/SubmitDailyHealth/SUbmitDailyHealth";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

function Dashboard(props) {
   const authenticatedUser = useContext(UserContext);

   const [currentDay, setCurrentDay] = useState(0);
   const [error, setError] = useState("You Must Choose Atleast One Option");
   const [student, setStudent] = useState(null);
   const [selectedValue, setSelectedValue] = useState();
   const [hidden, setHidden] = useState(false);
   const [disable, setDisable] = useState(true);

   const [currentTime, setCurrentTime] = useState(
      moment(new Date().toISOString()).format("HH:mm")
   );

   const userId = authenticatedUser.currentUser
      ? authenticatedUser.currentUser._id
      : "";

   const getStudet = async () => {
      if (userId) {
         try {
            const {
               data: { student },
            } = await getStudentById(userId);
            setStudent(student);

            const { createdAt } = student;

            var now = moment(new Date().toISOString()); //todays date
            var end = moment(createdAt); // another date
            var days = now.diff(end, "days");
            setCurrentDay(days + 1);
            // console.log(student);
         } catch (error) {
            if (error.response && error.response.status >= 400)
               toast.error(error.response.data.error.message);
         }
      } else return;
   };
   useEffect(() => {
      getStudet();
   }, [userId, currentDay]);

   useEffect(() => {
      const time = +currentTime.split(":")[0];
      const isDay = time >= 9 && time < 12;
      const isNignt = time >= 18 && time < 22;
      const isValidTime = isDay || isNignt ? true : false;
      setHidden(!isValidTime);
   }, [selectedValue, currentTime]);

   function currentTimeInHourMin() {
      let c = moment(new Date().toISOString()).format("HH:mm");
      setCurrentTime(c);
   }

   setTimeout(currentTimeInHourMin, 60 * 1000);

   const handelChange = (values) => {
      setSelectedValue(values);
      if (values.length === 0) {
         setError("You Must Choose Atleast One Option");
         setDisable(true);
      } else {
         setError("");
         setDisable(false);
      }
   };

   const handelHealthConditionSubmit = async () => {
      const time = +moment(new Date().toISOString()).format("HH");
      const isDay = time >= 9 && time < 12;
      const isNignt = time >= 18 && time < 22;
      const isValidTimeForSubmit = isDay || isNignt ? true : false;

      if (isValidTimeForSubmit) {
         const submitedSymptoms = [];
         selectedValue.forEach((symp) => {
            submitedSymptoms.push(symp.value);
         });

         // console.log(submitedSymptoms);
         try {
            const healthRecord = {
               symptoms: submitedSymptoms,
               dayNumber: currentDay,
               recordedAt: isDay ? "day" : "night",
            };
            await submitStudentHealthRecord(student._id, healthRecord);
            setHidden(true);
            if (isDay) {
               localStorage.setItem("morningReport", "true");
               localStorage.setItem("nigntReport", "false");
            }

            if (isNignt) {
               localStorage.setItem("nigntReport", "true");
               localStorage.setItem("morningReport", "false");
            }

            console.log("Form Submited");
         } catch (error) {
            if (error.response && error.response.status >= 400) {
               setHidden(false);
               setError(error.response.data.error.message);
            }
         }
      } else {
         setHidden(false);
         setError("Invalid Time To submit Record");
         setDisable(true);
      }

      // setDisable(true);
   };

   return (
      <>
         {student && !student.detailsSubmitted ? (
            <Redirect to="/adddetails" />
         ) : (
            <div className="md:max-w-sm md:mx-auto">
               <DashBoardHeader currentDay={currentDay} />
               <MentorDetails student={student} />
               <SUbmitDailyHealth
                  error={error}
                  currentTime={currentTime}
                  hidden={hidden}
                  handelHealthConditionSubmit={handelHealthConditionSubmit}
                  handelChange={handelChange}
                  disable={disable}
                  selectedValue={selectedValue}
               />
            </div>
         )}
      </>
   );
}

export default Dashboard;
