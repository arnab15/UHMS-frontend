import React from "react";

function MentorCard({ name, noOfAssignedStudents, phnNumber }) {
   return (
      <div className="p-2  w-full">
         <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <div className="flex-grow">
               <h2 className="text-gray-900 title-font font-medium">{name}</h2>
               <h2 className="text-gray-600 title-font font-medium">
                  {phnNumber}
               </h2>
               <p className="text-gray-500">
                  Number Of Assigned Student : {noOfAssignedStudents}
               </p>
            </div>
         </div>
      </div>
   );
}

export default MentorCard;
