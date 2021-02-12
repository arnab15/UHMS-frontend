import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/userContext";
import profilePic from "../../assets/img/profile.png";
import logo from "../../assets/img/hospital.png";
export default function Navbar() {
   const [navbarOpen, setNavbarOpen] = React.useState(false);
   const authenticatedUser = useContext(UserContext);
   //console.log("NavBar", authenticatedUser);
   return (
      <>
         <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-gray-700 mb-3">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
               <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                  <Link
                     className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white"
                     to="/">
                     <div className="flex content-center">
                        <img src={logo} alt="UHMS logo" className="h-6 w-6" />
                        <span className="inline-block mx-2">UHMS</span>
                     </div>
                  </Link>
                  <button
                     className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                     type="button"
                     onClick={() => setNavbarOpen(!navbarOpen)}>
                     <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                           d="M4 6h16M4 12h16M4 18h16"></path>
                     </svg>
                  </button>
               </div>
               <div
                  className={
                     "lg:flex flex-grow items-center" +
                     (navbarOpen ? " flex" : " hidden")
                  }
                  id="example-navbar-danger">
                  <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                     {!authenticatedUser.currentUser && (
                        <>
                           <li className="nav-item">
                              <Link
                                 className="px-3  flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                 to="/auth">
                                 <button className="inline-flex items-center bg-gray-500 border-0 py-1 px-3 focus:outline-none hover:bg-gray-400 rounded text-base mt-4 md:mt-0">
                                    Login
                                    <svg
                                       fill="none"
                                       stroke="currentColor"
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth="2"
                                       className="w-4 h-4 ml-1"
                                       viewBox="0 0 24 24">
                                       <path d="M5 12h14M12 5l7 7-7 7"></path>
                                    </svg>
                                 </button>
                              </Link>
                           </li>
                        </>
                     )}
                     {authenticatedUser.currentUser && (
                        <>
                           {authenticatedUser.currentUser.role === "student" ? (
                              <>
                                 <li className="nav-item">
                                    <Link
                                       className="px-3 py-2 flex items-center text-xs  uppercase font-bold leading-snug text-white hover:opacity-75"
                                       to="/dashboard">
                                       <span className="ml-2">DashBoard</span>
                                    </Link>
                                 </li>
                                 <li className="nav-item">
                                    <Link
                                       className="px-3 py-2 flex items-center text-xs  uppercase font-bold leading-snug text-white hover:opacity-75"
                                       to="/yourrecords">
                                       <span className="ml-2">
                                          Your Health Records
                                       </span>
                                    </Link>
                                 </li>
                              </>
                           ) : null}
                           {authenticatedUser.currentUser.role === "admin" ? (
                              <li className="nav-item">
                                 <Link
                                    className="px-3 py-2 flex items-center text-xs  uppercase font-bold leading-snug text-white hover:opacity-75"
                                    to="/admin">
                                    <span className="ml-2">Admin Panel</span>
                                 </Link>
                              </li>
                           ) : null}
                           <li className="nav-item">
                              <Link
                                 className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                 to="/logout">
                                 <span
                                    className="ml-2"
                                    onClick={() => {
                                       if (authenticatedUser.currentUser)
                                          authenticatedUser.logoutUser();
                                    }}>
                                    Logout
                                 </span>
                              </Link>
                           </li>
                           <li className="nav-item">
                              <div className="px-3 pt-1 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 overflow-hidden cursor-pointer">
                                 <img
                                    src={
                                       (authenticatedUser.currentUser.picture &&
                                          authenticatedUser.currentUser
                                             .picture) ||
                                       profilePic
                                    }
                                    className="h-6 w-6 rounded-full ml-2"
                                    alt="Profile details"
                                 />
                              </div>
                           </li>
                        </>
                     )}
                  </ul>
               </div>
            </div>
         </nav>
      </>
   );
}
