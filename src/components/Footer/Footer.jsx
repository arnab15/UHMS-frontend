import React from "react";

function Footer(props) {
   return (
      <footer className="text-gray-600 body-font">
         <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
            <a
               className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
               href="/">
               <span className="ml-3 text-xl">UHMS</span>
            </a>
            <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
               © 2021 Devloped By —
               <a
                  href="https://twitter.com/arnabsahoo9"
                  className="text-gray-600 ml-1"
                  rel="noopener noreferrer"
                  target="_blank">
                  @Arnab Sahoo
               </a>
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
               <a
                  className="ml-3 text-gray-500"
                  href="https://twitter.com/arnabsahoo9">
                  <svg
                     fill="#1DA1F2"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     className="w-5 h-5"
                     viewBox="0 0 24 24">
                     <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
               </a>
               <a
                  className="ml-3 text-gray-500"
                  href="https://www.linkedin.com/in/arnab-sahoo-0b3427187/">
                  <svg
                     fill="#0e76a8"
                     stroke="currentColor"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="0"
                     className="w-5 h-5"
                     viewBox="0 0 24 24">
                     <path
                        stroke="none"
                        d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                     <circle cx="4" cy="4" r="2" stroke="none"></circle>
                  </svg>
               </a>
            </span>
         </div>
      </footer>
   );
}

export default Footer;
