import React from 'react'

const TimeDate = () => {
  return (
    <>
    <section class="w-96 p-6 bg-white rounded-md border border-gray-400 mx-4 mb-4">
        <h2 class="text-lg font-semibold text-gray-700 capitalize">Language and Time</h2>

        <form>
            <div class="mt-4 w-full max-w-sm">
                    <label class="text-gray-700" for="oldPassword">Language</label>
                    <div className="relative max-w-xl mx-auto mt-4 border border-gray-300 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 right-2.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <select className="w-full p-2.5 text-gray-500 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:border-indigo-600">
                          <option>English</option>
                          <option>Bangla</option>
                      </select>
                  </div>
            </div>
            <div class="mt-4 w-full max-w-sm">
                    <label class="text-gray-700" for="oldPassword">Time</label>
                    <div className="relative max-w-xl mx-auto mt-4 border border-gray-300 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 right-2.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <select className="w-full p-2.5 text-gray-500 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:border-indigo-600">
                          <option>GMT 06.00+</option>
                          <option>GMT 06.00+</option>
                          <option>GMT 06.00+</option>
                          <option>GMT 06.00+</option>
                          <option>GMT 06.00+</option>
                      </select>
                  </div>
            </div>


            <div class="flex justify-end mt-6">
                <button class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-[#0066FF] rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save All</button>
            </div>
        </form>
    </section>
    </>
  )
}

export default TimeDate