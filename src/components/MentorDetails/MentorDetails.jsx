import React from "react";
import call from "../../assets/img/telephone.png";

function MentorDetails({ student }) {
   return (
      <div className="flex flex-col content-center justify-items-center">
         <div className="m-2 shadow-md  w-4/5  mx-auto p-2 rounded-md">
            <h4 className="text-center p-1">Your Mentor Details</h4>
            {!student && <p>Please Provide Your Details To Use Dashboard</p>}
            <p className="pl-3 my-2">
               <span>Name: </span>{" "}
               <span>{student ? student.assignedMentor.name : ""}</span>
            </p>
            {student && (
               <div>
                  <p className="pl-3 my-1 mb-3">
                     <span>Contact Number: </span>{" "}
                     <span>
                        <a
                           href={`tel:${
                              student ? student.assignedMentor.mobileNumber : ""
                           }`}>
                           {student ? student.assignedMentor.mobileNumber : ""}
                        </a>
                     </span>
                  </p>
                  <p className="pl-3 my-1 mb-3 ">
                     <a
                        href={`tel:${
                           student ? student.assignedMentor.mobileNumber : ""
                        }`}>
                        <img
                           src={call}
                           alt="call button"
                           className="h-7 w-7 mx-auto"
                        />
                     </a>
                  </p>
               </div>
            )}
         </div>
      </div>
   );
}

export default MentorDetails;
