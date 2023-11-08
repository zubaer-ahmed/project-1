import React from "react";

// Components
import Stats from "./Stats";

// Material UI Icons
import HailIcon from '@mui/icons-material/Hail';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const Features = () => {
  return (
    <>
        <section className="mt-8 mb-0 container mx-auto">
            <div className="max-w-screen-xl text-black items-center justify-between lg:flex md:px-8">
                <div className="mt-6 sm:mt-0 md:flex lg:block">
                  <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl max-w-2xl">
                    Because we care about your <span className="underline decoration-blue-500">Safety</span>..
                  </h3>
                  <div className="flex-none mt-6 md:mt-0 lg:mt-6">
                      <ul className="inline-grid gap-y-8 gap-x-14 grid-cols-2">
                        <li>
                            <div className="text-center px-8 py-8 md:px-16 border border-blue-400 rounded-lg">
                              <h4 className="text-blue-600 font-bold text-center"><HailIcon sx={{ fontSize: 40 }}/></h4>
                              <p className="mt-3 font-medium text-black text-lg">One stop service</p>
                            </div>
                        </li>
                        <li>
                            <div className="text-center px-8 py-8 md:px-16 border border-blue-400 rounded-lg">
                            <h4 className="text-black font-bold text-center"><LocalShippingIcon sx={{ fontSize: 40 }}/></h4>
                            <p className="mt-3 font-medium text-black text-lg">Fast Response</p>
                            </div>
                        </li>
                        <li>
                            <div className="text-center px-8 py-8 md:px-16 border border-blue-400 rounded-lg">
                            <h4 className="text-[#15803d] font-bold text-center"><DoneAllIcon sx={{ fontSize: 40 }}/></h4>
                            <p className="mt-3 font-medium text-black text-lg">Verified Workers</p>
                            </div>
                        </li>
                        <li>
                            <div className="text-center px-8 py-8 md:px-16 border border-blue-400 rounded-lg">
                            <h4 className="text-[#b91c1c] font-bold text-center"><SupportAgentIcon sx={{ fontSize: 40 }}/></h4>
                            <p className="mt-3 font-medium text-black text-lg">24/7 Support</p>
                            </div>
                        </li>
                      </ul>
                  </div>
                </div>
                <div className="sm:hidden lg:block lg:max-w-xl">
                    <img src="https://plus.unsplash.com/premium_photo-1661719110458-f97f4b0a9bd4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" className="rounded-lg" alt="" />
                </div>
            </div>
        </section>
        <Stats/>
    </>
  );
};

export default Features;
