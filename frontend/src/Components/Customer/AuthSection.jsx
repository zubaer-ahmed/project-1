import React from 'react'

const AuthSection = () => {
  return (
    <>
    <section class="w-96 p-6 bg-white rounded-md border border-gray-400 mx-4 mb-4 mt-4">
        <h2 class="text-lg font-semibold text-gray-700 capitalize">Authentication</h2>

        <form>
            <div class="mt-4 w-full max-w-sm">
                    <label class="text-gray-700" for="oldPassword">Old Password</label>
                    <input id="oldPassword" type="password" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"/>
            </div>
            <div class="mt-4 w-full max-w-sm">
                    <label class="text-gray-700" for="password">Password</label>
                    <input id="password" type="password" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"/>
                </div>

                <div class="mt-4 w-full max-w-sm">
                    <label class="text-gray-700" for="passwordConfirmation">Password Confirmation</label>
                    <input id="passwordConfirmation" type="password" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"/>
                </div>


            <div class="flex justify-end mt-6">
                <button class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-[#0066FF] rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button>
            </div>
        </form>
    </section>
    </>
  )
}

export default AuthSection