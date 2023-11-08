import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const ProfileSection = () => {

    const location = useLocation();

  return (
    <>
    {
        location.pathname == "/customer/profile"
         && (
            
            <div class="w-96 max-w-sm overflow-hidden bg-white rounded-lg  mx-4 mt-4">
        <img class="object-cover object-center w-full h-56" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="avatar"/>

        <div class="flex items-center px-6 py-3 bg-gray-900">
            
            <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.965 8.521C19.988 8.347 20 8.173 20 8c0-2.379-2.143-4.288-4.521-3.965C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.035C6.138 3.712 4 5.621 4 8c0 .173.012.347.035.521C2.802 9.215 2 10.535 2 12s.802 2.785 2.035 3.479A3.976 3.976 0 0 0 4 16c0 2.379 2.138 4.283 4.521 3.965C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.035C17.857 20.283 20 18.379 20 16c0-.173-.012-.347-.035-.521C21.198 14.785 22 13.465 22 12s-.802-2.785-2.035-3.479zm-9.01 7.895-3.667-3.714 1.424-1.404 2.257 2.286 4.327-4.294 1.408 1.42-5.749 5.706z"></path></svg>

            <h1 class="mx-3 text-lg font-semibold text-white">Status</h1>
        </div>

        <div class="px-6 py-4  border border-b-gray-400 border-l-gray-400 border-r-gray-400 rounded-b-lg">
            <h1 class="text-xl font-semibold text-gray-800">User Name</h1>

            <p class="py-2 text-gray-700">Bio.</p>

            <div class="flex items-center mt-4 text-gray-700">
                <svg aria-label="location pin icon" class="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z"/>
                </svg>

                <h1 class="px-2 text-sm">Location</h1>
            </div>

            <div class="flex items-center mt-4 text-gray-700">
                <svg aria-label="email icon" class="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z"/>
                </svg>

                <h1 class="px-2 text-sm">Email</h1>
            </div>

            
        </div>
    </div>
        )
    }
    {
        location.pathname == "/customer/settings" && (
            <div className='mb-4 rounded-lg border border-gray-400 bg-white p-4 shadow-sm 2xl:col-span-2 mt-4 mx-4 pb-4'>
        <div className='relative items-center sm:flex sm:space-x-4 xl:block xl:space-x-0 2xl:flex 2xl:space-x-4'>
            <div className='relative h-36 w-28'>
            <img
                className='relative mb-4 h-28 w-28 rounded-lg border-2 object-cover sm:mb-0 xl:mb-4 2xl:mb-0'
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                alt="avatar"
            />
            <div className='absolute top-20 left-1 ml-4 mt-2'>
                <input
                type='file'
                accept='.jpg,.jpeg,.png,.gif'
                name='profilePicture'
                id='profilePicture'
                className='hidden -top-4'
                />

                <label
                htmlFor='profilePicture'
                className=' inline-block cursor-pointer rounded-lg bg-blue-700 opacity-80 hover:opacity-100 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300'
                >
                Choose
                </label>
            </div>
            </div>

            <div>
            <h3 className='mb-1 text-xl font-bold text-gray-900'>
                Profile picture
            </h3>
            <div className='mb-4 text-sm text-gray-500'>
                JPG, GIF or PNG. Max size of 800K
            </div>
            <div className='flex items-center space-x-4'>
                <button
                type='button'
                className=' inline-flex items-center text-white px-3 py-2 text-center text-sm font-medium  bg-[#0066FF] bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-gray-700'
                >
                <svg
                    className='-ml-1 mr-2 h-4 w-4'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path d='M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z'></path>
                    <path d='M9 13h2v5a1 1 0 11-2 0v-5z'></path>
                </svg>
                Upload picture
                </button>
                <button
                type='button'
                className='rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-500 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200'
                >
                Delete
                </button>
            </div>
            </div>
        </div>
    </div>
        )
    }
    </>
  )
}

export default ProfileSection