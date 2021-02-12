import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link, Redirect, Route } from "react-router-dom";
import AddNewMentor from "../components/AdminPanel/AddNewMentor/AddNewMentor";
import ViewMentors from "../components/AdminPanel/ViewMentors/ViewMentors";
import UserContext from "../context/userContext";

function Admin(props) {
   const userContext = useContext(UserContext);
   const [user, setUser] = useState({});
   useEffect(() => {
      setUser(userContext.currentUser);
   }, [user]);

   if (userContext.currentUser)
      return (
         <>
            {userContext.currentUser &&
            userContext.currentUser.role !== "admin" ? (
               <Redirect to="" />
            ) : (
               <div className="p-5 sm:p-0">
                  <h1 className="text-xl text-center p-8">ADMIN PANEL</h1>
                  <div className="flex justify-center">
                     <button className="mr-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                        <Link to="/admin/viewmentors">View All Mentors</Link>
                     </button>
                     <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                        <Link to="/admin/addmentor"> Add New Mentor</Link>
                     </button>
                  </div>
                  <Route path="/admin/addmentor" component={AddNewMentor} />
                  <Route path="/admin/viewmentors" component={ViewMentors} />
               </div>
            )}
         </>
      );
}

export default Admin;
