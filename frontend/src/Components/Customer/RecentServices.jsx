import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import ProfileNavigation from './ProfileNavigation';

const RecentServices = () => {
  const location = useLocation();
  return (
    <>
    <section className="container px-4 mx-auto  border border-gray-400 rounded-lg my-4">
        <div className="flex flex-col mt-6">
            <h2 className="mb-4 text-xl font-bold text-gray-900">{location.pathname == "/customer/history" ? "Services" : "Recent Services"  }</h2>
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">
                                        Service
                                    </th>

                                    <th scope="col" className="px-1 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                        Date
                                    </th>

                                    <th scope="col" className="px-1 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                        Provider Name
                                    </th>

                                    <th scope="col" className="px-1 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                        Amount
                                    </th>

                                    <th scope="col" className="px-1 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                        Status
                                    </th>
                                    {location.pathname == "/customer/history" && <th scope="col" className="px-1 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                    </th>}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            </tbody>
                                <tr>
                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                        <div className="inline-flex items-center gap-x-3">


                                            <div className="flex items-center gap-x-2">
                                                
                                                <div>
                                                    <h2 className="font-normal text-gray-800">AC service</h2>
                                                    <p className="text-xs font-normal text-gray-500">Single</p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-1 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                                    Jan 4, 2022
                                    </td>
                                    <td className="px-1 py-4 text-sm text-gray-500">Mr. Karim</td>
                                    <td className="px-1 py-4 text-sm text-gray-500">$42</td>
                                    <td className="px-1 py-4 text-sm text-gray-500">Complete</td>
                                    {location.pathname == "/customer/history" && <td className="px-1 py-4 text-sm text-gray-500"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg></td>}
                                </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        {location.pathname == "/customer/profile" && <div class="flex justify-end m-6">
                <button class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-[#0066FF] rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">View All</button>
            </div>}
    </section>
    </>
  )
}

export default RecentServices