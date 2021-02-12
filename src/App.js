import React, { useEffect, useState } from "react";

import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Homepage from "./pages/Homepage";
import Navbar from "./components/NavBar/NavBar";
import LoginPage from "./pages/Login";
import SignupPage from "./components/AdminPanel/AddNewMentor/AddNewMentor";
import { getCurrentUser, deleteItem } from "./services/storageService";
import "react-toastify/dist/ReactToastify.css";
import Events from "./pages/Events";
import UserContext from "./context/userContext";
import Auth from "./pages/Auth";

import AddStudent from "./components/AddStudent/AddStudent";
import Dashboard from "./pages/Dashboard";
import YourRecord from "./pages/YourRecord";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SignUPPage from "./components/AdminPanel/AddNewMentor/AddNewMentor";
import Admin from "./pages/Admin";

function App() {
   const [currentUser, setUser] = useState({});
   const setCurrentUser = () => {
      setUser(getCurrentUser());
   };
   useEffect(() => {
      const user = getCurrentUser();
      setCurrentUser();
      setUser(user);
      // console.log(user);
      return () => setCurrentUser({});
   }, []);
   const logoutUser = () => {
      deleteItem();
      setCurrentUser({});
   };

   return (
      <div>
         <UserContext.Provider
            value={{ currentUser, logoutUser, setCurrentUser }}>
            <Navbar />
            <ToastContainer />
            <Switch>
               <Route exact path="/mlogin" component={LoginPage} />
               <Route exact path="/signup" component={SignupPage} />
               <ProtectedRoute
                  exact
                  path="/adddetails"
                  component={AddStudent}
               />
               <Route exact path="/auth" component={Auth} />
               <ProtectedRoute exact path="/dashboard" component={Dashboard} />
               <ProtectedRoute
                  exact
                  path="/yourrecords"
                  component={YourRecord}
               />
               <Route exact path="/allentries" component={Events} />
               <Route exact path="/signup" component={SignUPPage} />
               <Route path="/admin" component={Admin} />
               <Route path="/" component={Homepage} />
            </Switch>
         </UserContext.Provider>
      </div>
   );
}

export default App;
