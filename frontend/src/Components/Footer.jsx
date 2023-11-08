import React from "react";

// Material UI Icons
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Footer = () => {
  return (
    <>
        <footer className="body-font w-full text-black container mx-auto">
          <div className="md:flex-no-wrap flex flex-col flex-wrap px-5 my-16 md:flex-row md:items-center lg:items-start">
            <div className="mx-auto w-64 flex-shrink-0 text-center md:mx-0 md:text-left">
              <a className="title-font flex items-center justify-center font-medium text-black md:justify-start">
                {
                  <div className="flex items-center">
                    <svg
                      fill="#4f46e5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 21h17v-2H5V3H3v17a1 1 0 0 0 1 1z"></path>
                      <circle cx="10" cy="8" r="2"></circle>
                      <circle cx="18" cy="12" r="2"></circle>
                      <circle cx="11.5" cy="13.5" r="1.5"></circle>
                      <circle cx="16.5" cy="6.5" r="1.5"></circle>
                    </svg>
                    <h2 className="ml-3 text-2xl font-bold">Helpers</h2>
                  </div>
                }
              </a>
              <div className="mt-4">
                <span className="mt-2 inline-flex justify-center sm:ml-auto sm:mt-0 sm:justify-start">
                  <a className="cursor-pointer text-gray-500 hover:text-black">
                    <FacebookIcon className="text-blue"/>
                  </a>
                  <a className="ml-3 cursor-pointer">
                    <WhatsAppIcon className="text-[#15803d]"/>
                  </a>
                </span>
              </div>
            </div>
            <div className="-mb-10 mt-10 flex flex-grow flex-wrap text-center md:mt-0 md:pl-20 md:text-left">
              <div className="w-full px-4 md:w-1/2 lg:w-1/5">
                <h2 className="title-font font-bold  mb-3 text-sm uppercase tracking-widest text-black">
                  About
                </h2>
                <nav className="mb-10 list-none">
                  <li className="mt-3">
                    <a
                      className="cursor-pointer text-gray-500 hover:text-black"
                      href={"/About"}
                    >
                      Company
                    </a>
                  </li>
                  <li className="mt-3">
                    <a
                    href={"/careers"}
                    className="cursor-pointer text-gray-500 hover:text-black">
                      Careers
                    </a>
                  </li>
                  <li className="mt-3">
                    <a
                      className="cursor-pointer text-gray-500 hover:text-black"
                      href={"/Blogs"}
                    >
                      Blog
                    </a>
                  </li>
                </nav>
              </div>
              <div className="w-full px-4 md:w-1/2 lg:w-1/5">
                <h2 className="title-font mb-3 text-sm font-bold uppercase tracking-widest text-black">
                  Platform
                </h2>
                <nav className="mb-10 list-none">
                  <li className="mt-3">
                    <a
                    href={"/privacy-policy"}
                    className="cursor-pointer text-gray-500 hover:text-black">
                      Privacy Policy
                    </a>
                  </li>
                  <li className="mt-3">
                    <a
                      href={"/FAQ"}
                      className="cursor-pointer text-gray-500 hover:text-black"
                    >
                      FAQ's
                    </a>
                  </li>
                </nav>
              </div>
              <div className="w-full px-4 md:w-1/2 lg:w-1/5">
                <h2 className="title-font mb-3 text-sm font-bold uppercase tracking-widest text-black">
                  Contact
                </h2>
                <nav className="mb-10 list-none">
                  <li className="mt-3">
                    <a
                      href={"/contact"}
                      className="cursor-pointer text-gray-500 hover:text-black"
                    >
                      Send a Message
                    </a>
                  </li>
                  <li className="mt-3">
                    <a className="cursor-pointer text-gray-500 hover:text-black">
                      +123-456-7890
                    </a>
                  </li>
                </nav>
              </div>
              <div className="w-full px-4 md:w-2/2 lg:w-2/6">
                <h2 className="title-font mb-3 text-sm font-bold uppercase tracking-widest text-black">
                  Stay tuned
                </h2>
                <form onSubmit={(e) => e.preventDefault()} className="mt-1">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-lg p-2 text-black outline-blue-500 border border-blue-200"
                  />
                  <button
                    className="mt-4 rounded-lg bg-blue-600 p-2 px-3 font-medium
                              text-white shadow-md outline-none duration-150 hover:bg-blue-500 focus:shadow-none sm:px-4"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </footer>
          <div className="bg-blue-500">
            <div className="container px-5 py-4">
              <p className="text-center text-sm capitalize text-white">
                © {new Date().getFullYear()} All rights reserved by{" "}
                <span className="text-black"> 
                    <a href={"/contact"}
                    className="cursor-pointer">Helpers</a> 
                </span>
              </p>
            </div>
          </div>
    </>
  );
};

export default Footer;
