import { ISO_8601 } from "moment";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import HealthReportCard from "../components/StudentHealthReportCard/HealthReportCard";
import UserContext from "../context/userContext";
import { getStudentById } from "../services/studentService";

function YourRecord(props) {
   const authenticatedUser = useContext(UserContext);

   const [student, setStudent] = useState(null);

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
         } catch (error) {
            if (error.response && error.response.status >= 400)
               toast.error(error.response.data.error.message);
         }
      }
   };
   useEffect(() => {
      getStudet();
   }, [userId]);
   return (
      <>
         <h1 className="text-center text-gray-500 text-xl p-4">
            Your 7 Days Health Record{" "}
         </h1>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <HealthReportCard
               dayNo={1}
               healthRecord={student && student.healthRecord}
            />
            <HealthReportCard
               dayNo={2}
               healthRecord={student && student.healthRecord}
            />
            <HealthReportCard
               dayNo={3}
               healthRecord={student && student.healthRecord}
            />
            <HealthReportCard
               dayNo={4}
               healthRecord={student && student.healthRecord}
            />
            <HealthReportCard
               dayNo={5}
               healthRecord={student && student.healthRecord}
            />
            <HealthReportCard
               dayNo={6}
               healthRecord={student && student.healthRecord}
            />
            <HealthReportCard
               dayNo={7}
               healthRecord={student && student.healthRecord}
            />
         </div>
      </>
   );
}

export default YourRecord;
