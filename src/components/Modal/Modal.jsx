import React from "react";
import { createPortal } from "react-dom";
function Modal(props) {
  const { modalTitle, handelModalClose, footerComponent } = props;

  return createPortal(
    <>
      <div
        className="fixed  overflow-auto z-10 inset-0"
        onClick={handelModalClose}>
        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>

        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="relative top-20 w-11/12 z-20 mx-auto  md:w-1/2  rounded p-3 bg-white">
          <header className="flex justify-between">
            <div>
              <h1 className="pl-5 text-xl">{modalTitle}</h1>
            </div>
            <div onClick={handelModalClose}>
              <svg
                className="w-7 h-7 cursor-pointer hover:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
          </header>
          <hr className="my-3" />
          <section className="my-3">{props.children}</section>
          <hr className="my-3" />
          <footer className="flex justify-between m-2">
            {footerComponent}
          </footer>
        </div>
      </div>
    </>,
    document.querySelector("#modal")
  );
}

export default Modal;
