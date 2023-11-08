import React from 'react'


// Icons
import PersonIcon from '@mui/icons-material/Person';
import EngineeringIcon from '@mui/icons-material/Engineering';

const index = () => {
  return (
    <>
        <div class="antialiased bg-gray-50">

    <main class="p-4 h-auto pt-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        <div class="border-2 p-4 border-dashed rounded-lg border-black h-32 md:h-64">
            <div class="w-full space-y-4 text-center border border-gray-200 rounded-lg">
                <PersonIcon class="text-black h-12 mx-auto"/>

                <h2 class="text-4xl font-semibold text-gray-800 uppercase">29999</h2>

                <p class="font-medium text-gray-500">Customer</p>

                <button class="w-1/2 px-4 py-2 mt-1 tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                    View
                </button>
            </div>
        </div>
        <div class="border-2 p-4 border-dashed rounded-lg border-black h-32 md:h-64">
            <div class="w-full space-y-4 text-center border border-gray-200 rounded-lg">
                <EngineeringIcon class="text-black h-12 mx-auto"/>

                <h2 class="text-4xl font-semibold text-gray-800 uppercase">29999</h2>

                <p class="font-medium text-gray-500">Customer</p>

                <button class="w-1/2 px-4 py-2 mt-1 tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                    View
                </button>
            </div>
        </div>
        <div class="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default">
            <div className='flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2'>
            <EngineeringIcon class="text-black h-12"/>
            </div>
            <div class="mt-4 flex items-end justify-between">
                  <div>
                    <h4 class="text-title-md font-bold text-black">
                      $3.456K
                    </h4>
                    <span class="text-sm font-medium">Total views</span>
                  </div>

                  <span class="flex items-center gap-1 text-sm font-medium text-meta-3">
                    0.43%
                    <svg class="fill-meta-3" width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z" fill=""></path>
                    </svg>
                  </span>
                </div>
        </div>
        <div
          class="border-2 border-dashed rounded-lg border-gray-300 h-32 md:h-64"
        ></div>
        <div
          class="border-2 border-dashed rounded-lg border-gray-300 h-32 md:h-64"
        ></div>
      </div>
      <div
        class="border-2 border-dashed rounded-lg border-gray-300 h-96 mb-4"
      ></div>
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div
          class="border-2 border-dashed rounded-lg border-gray-300 h-48 md:h-72"
        ></div>
        <div
          class="border-2 border-dashed rounded-lg border-gray-300 h-48 md:h-72"
        ></div>
        <div
          class="border-2 border-dashed rounded-lg border-gray-300 h-48 md:h-72"
        ></div>
        <div
          class="border-2 border-dashed rounded-lg border-gray-300 h-48 md:h-72"
        ></div>
      </div>
      <div
        class="border-2 border-dashed rounded-lg border-gray-300 h-96 mb-4"
      ></div>
      <div class="grid grid-cols-2 gap-4">
        <div
          class="border-2 border-dashed rounded-lg border-gray-300 h-48 md:h-72"
        ></div>
        <div
          class="border-2 border-dashed rounded-lg border-gray-300 h-48 md:h-72"
        ></div>
        <div
          class="border-2 border-dashed rounded-lg border-gray-300 h-48 md:h-72"
        ></div>
        <div
          class="border-2 border-dashed rounded-lg border-gray-300 h-48 md:h-72"
        ></div>
      </div>
    </main>
  </div>
    </>
  )
}

export default index