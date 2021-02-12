import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { allMentors } from "../../../services/mentorService";
import MentorCard from "./MentorCard";

function ViewMentors(props) {
   const [allmentors, setMentors] = useState();
   const getMentors = async () => {
      try {
         const {
            data: { mentors },
         } = await allMentors();
         setMentors(mentors);
         //  console.log(mentors);
      } catch (error) {
         toast.error(error.message);
      }
   };

   useEffect(() => {
      getMentors();
   }, []);
   return (
      <div className="container  py-10 mx-auto">
         <h4 className="text-center py-2 text-gray-600">
            Total No Of Mentors : {allmentors && allmentors.length}
         </h4>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {allmentors &&
               allmentors.map((mentor) => (
                  <MentorCard
                     key={mentor._id}
                     name={mentor.name}
                     noOfAssignedStudents={mentor.assignedStudents.length}
                     phnNumber={mentor.mobileNumber}
                  />
               ))}
         </div>
      </div>
   );
}

export default ViewMentors;
