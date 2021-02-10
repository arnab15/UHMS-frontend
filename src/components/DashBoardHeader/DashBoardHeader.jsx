import React from "react";

function DashBoardHeader({ currentDay }) {
   return (
      <div className="flex flex-col text-center m-4">
         <h2>It's Your</h2>
         <h2>Day</h2>
         <h2
            className="text-red-400"
            style={{
               fontSize: "35px",
            }}>
            {currentDay}
         </h2>
         <h2>Of Quarentine </h2>
      </div>
   );
}

export default DashBoardHeader;
