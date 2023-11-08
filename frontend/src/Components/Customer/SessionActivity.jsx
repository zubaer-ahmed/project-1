import React from 'react'

const SessionActivity = () => {
  return (
    <>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-400 my-4 p-4">
    <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <h2 class="mb-4 text-xl font-bold text-gray-900">Session</h2>
        </thead>
        <tbody>
            <tr class="bg-white border-b">
                <td class="flex items-center px-4 py-4 text-sm font-medium whitespace-nowrap">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17 2H7c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM7 16.999V5h10l.002 11.999H7z"></path></svg>
                                    <div className='mx-4'>
                                        <h2 class="font-medium text-gray-800">Xiomi Note 8 Pro</h2>
                                        <p class="text-md font-normal text-gray-600">Dhaka, Bangladesh</p>
                                    </div>
                                </td>
                <td class="px-2 py-4 text-center">
                    <a href="#" class="font-medium text-blue-600 hover:underline">Revoke</a>
                </td>
            </tr>
        </tbody>
    </table>
</div>
    </>
  )
}

export default SessionActivity