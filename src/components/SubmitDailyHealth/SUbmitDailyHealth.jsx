import React from "react";
import { useState } from "react";
import CustomSelect from "../CustomSelect/Select";
import { symptoms } from "./symptoms";

function SUbmitDailyHealth({
   currentTime,
   hidden,
   handelHealthConditionSubmit,
   handelChange,
   error,
   disable,
   selectedValue,
}) {
   return (
      <div className="m-2 shadow-md  w-full  h-96 mx-auto p-2 rounded-md">
         <h3 className="px-6 text-center text-sm text-red-400">
            You Have To Submit Your Health Condition Twice In A Day
         </h3>
         <div className="m-2 shadow-md  w-8/12  mx-auto p-2 rounded-md">
            <h2 className="text-center text-gray-500 p-2">
               {currentTime && currentTime}
            </h2>
            <p className="text-center text-gray-400 text-sm">
               Morning: <span>9 AM - 12PM</span>
            </p>
            <p className="text-center text-gray-400 text-sm">
               Evening: <span>6PM - 9PM</span>
            </p>
         </div>
         <h2 className="text-center font-semibold p-4 text-gray-400">
            Submit Your Current Health Condition
         </h2>
         {hidden && (
            <p className="text-xs px-3 text-center text-green-400">
               You Have Already Submitted the Form Or It Submitted SuccessFully.
               <br /> Form Submission Will Be Appear Here In morning 9pm -12pm
               or In Evening 6pm-9pm
            </p>
         )}
         <div className={`m-4 ${hidden ? "hidden" : ""}`}>
            <CustomSelect
               isMulti={true}
               labelName="How are You Felling  Now?"
               options={symptoms}
               onChange={handelChange}
               error={error}
            />
            <button
               disabled={disable}
               onClick={handelHealthConditionSubmit}
               className={`px-4 py-2 mt-4  text-white w-full font-light tracking-wider focus:outline-none   ${
                  disable ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
               } rounded`}
               type="submit">
               Submit
            </button>
         </div>
         <p>{selectedValue && selectedValue.map((value) => value.label)}</p>
      </div>
   );
}

export default SUbmitDailyHealth;
