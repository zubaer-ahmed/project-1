import React from 'react'

// Material UI Icons
import SecurityIcon from '@mui/icons-material/Security';
import HandymanIcon from '@mui/icons-material/Handyman';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const WHY = () => {
    return (
        <>
        <section className="container mx-auto">
                  <h3 className="text-gray-800 text-3xl font-semibold text-center sm:text-4xl">
                  Why <span className="underline decoration-blue-500">XYZ</span>
                  </h3>
            <div className="mx-auto px-4 my-12 text-black items-center justify-between lg:flex md:px-8">
                <div className="mt-6 sm:mt-0 md:flex lg:block">
                  <div className="flex-none mt-6 md:mt-0 lg:mt-6">
                    <ol class="space-y-4 w-full">
                        <li>
                            <div class="w-full p-4 text-black" role="alert">
                                <div class="flex items-center justify-start">
                                    <RequestPageIcon style={{fontSize: '4rem' }}/>
                                    <div className='pl-8 py-3.5'>
                                        <h3 class="font-bold">Transparent Pricing</h3>
                                        <p>No hidden chargers. See detailed pricing before you book.</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="w-full p-4 text-black" role="alert">
                                <div class="flex items-center justify-start">
                                    <AdminPanelSettingsIcon style={{fontSize: '4rem' }}/>
                                    <div className='pl-8 py-3.5'>
                                        <h3 class="font-bold">Experts Only</h3>
                                        <p>Our professionals are well trained and have on-job expertise.</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="w-full p-4 text-black" role="alert">
                                <div class="flex items-center justify-start">
                                    <HandymanIcon style={{fontSize: '4rem' }}/>
                                    <div className='pl-8 py-3.5'>
                                        <h3 class="font-bold">Fully Equipped</h3>
                                        <p>We bring everything needed to get the job done well.</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ol>
                  </div>
                </div>
                <div className="sm:hidden lg:block lg:max-w-xl mt-5">
                    <SecurityIcon style={{fontSize: '8rem' }} className='mb-8 text-blue-500'/>
                    <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl my-2">
                        100% Quality Assured
                    </h3>
                    <p className="text-gray-400 text-xl font-semibold sm:text-xl">
                        If you don't love out service, we will make it right 
                    </p>
                </div>
            </div>
        </section>
        </>
    )
}

export default WHY