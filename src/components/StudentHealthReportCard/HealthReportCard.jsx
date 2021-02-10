import React from "react";

function HealthReportCard({ dayNo, healthRecord }) {
   const healthReportsOfAday =
      healthRecord &&
      healthRecord.filter((record) => record.dayNumber === dayNo);
   return (
      <div>
         <div className="m-5 w-full p-3 mx-auto shadow-md bg-gray-100 rounded-md">
            <h1 className="text-center text-lg text-green-400">Day {dayNo}</h1>

            <div
               className={`rounded m-6 ${
                  healthReportsOfAday && healthReportsOfAday.length !== 0
                     ? ""
                     : "hidden"
               } shadow-md p-5`}>
               {healthReportsOfAday &&
                  healthReportsOfAday.map((report) => (
                     <div className="text-center " key={report._id}>
                        {report.recordedAt === "day" ? (
                           <h4 className="text-gray-400 p-1">Mornig Report</h4>
                        ) : (
                           <h4 className="text-gray-400 p-1">Evening Report</h4>
                        )}
                        {report.symptoms.map((symptom) => (
                           <p className="text-red-400" key={symptom}>
                              {symptom}
                           </p>
                        ))}
                     </div>
                  ))}
            </div>
         </div>
      </div>
   );
}

export default HealthReportCard;
