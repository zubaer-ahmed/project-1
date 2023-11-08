import * as React from "react";
import { useAuth } from "../../Hooks/useAuth";
import { useLocation } from 'react-router-dom';
import { CircularProgress} from "@mui/material";
import servicesList from '../../Data/services';

const GeneralInformation = () => {

  const [readOnlyFlag, setReadOnlyFlag] = React.useState(false);
  const location = useLocation();
  if(!location.pathname == "/customer/profile"){
    setReadOnlyFlag(true);
  }

  console.log(readOnlyFlag)

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [toast, setToast] = React.useState(false);
  const [services, setServices] = React.useState([]);
  const { user, setUser } = useAuth();
  
  const roles = ["customer", "worker", "admin"];

  async function updateProfile(event) {
    event.preventDefault();
    setLoading(true);
    let res = await (
      await fetch(import.meta.env.VITE_BASE_URL + "/api/users/updateUser", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
    ).json();
    setLoading(false);
    setToast(true);

    setTimeout(() => {
      setToast(false);
    }, 3000);
  }


  return (
    <>
    <div className=' border border-gray-400 rounded-lg'>
        <div className="mx-auto max-w-3xl lg:py-8">
            <h2 className="text-xl font-bold text-gray-900">General Information</h2>
            <h2 className="mb-4 text-sm font-sm text-gray-600">{(user?.roles.length > 0 &&
          user.roles[0].replace(/^\w/, (c) => c.toUpperCase())) ||
          "User"}{" "}</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="mt-4 w-full max-w-4xl">
                        <label className="text-gray-700">Username</label>
                        <input type="text" placeholder="John007" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" defaultValue={user.username || user.firstName + " " + user.lastName}/>
                </div>
                <div className='flex'>
                <div className="mt-4 w-full max-w-sm mr-8">
                        <label className="text-gray-700">First Name</label>
                        <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                        placeholder="John"
                        defaultValue={user.firstName || ""}
                        onChange={(e) => {
                          setUser({ ...user, firstName: e.target.value });
                        }}
                        readOnly={readOnlyFlag} />
                </div>
                <div className="mt-4 w-full max-w-sm">
                        <label className="text-gray-700">Last Name</label>
                        <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                        placeholder="Doe"
                        defaultValue={user.lastName || ""}
                        onChange={(e) => {
                          setUser({ ...user, lastName: e.target.value });
                        }}/>
                </div>
                </div>
                <div className='flex'>
                <div className="mt-4 w-full max-w-sm mr-8">
                        <label className="text-gray-700">Email</label>
                        <input type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                        placeholder="johnDoe@gmail.com"
                        defaultValue={user.email || ""}
                        onChange={(e) => {
                          setUser({ ...user, email: e.target.value });
                        }}/>
                </div>
                <div className="mt-4 w-full max-w-sm">
                        <label className="text-gray-700">Address</label>
                        <input type="password" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"/>
                </div>
                    
                </div>
                <div className='flex'>
                <div className="mt-4 w-full max-w-sm mr-8">
                        <label className="text-gray-700">Phone</label>
                        <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" 
                        placeholder="+8801720334455"
                        defaultValue={user.phone || ""}
                        onChange={(e) => {
                        setUser({ ...user, phone: e.target.value });
                        }}/>
                </div>
                <div className="mt-4 w-full max-w-sm">
                        <label className="text-gray-700">Title</label>
                        <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" 
                        placeholder="Active"
                        value={user.title || ""}
                        onChange={(e) => {
                        setUser({ ...user, title: e.target.value });
              }}/>
                </div>

                </div>
                <div className='flex'>
                        <div className="mt-4 w-full max-w-sm mr-8">
                                <label className="text-gray-700">Roles</label>
                                <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" 
                                readOnly
                                defaultValue={user.roles}/>
                        </div>
                        <div className="mt-4 w-full max-w-sm">
                                <label className="text-gray-700">Country</label>
                                <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" 
                                defaultValue={user.country || "USA"}
                                onChange={(e) => {
                                  setUser({ ...user, country: e.target.value });
                                }}/>
                        </div>
                </div>
                <div className="mt-4 w-full max-w-4xl">
                        <label className="text-gray-700" htmlFor="bio">Bio</label>

                        <textarea type="text" className="mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-300 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                        value={user.bio || ""}
                        onChange={(e) => {
                          setUser({ ...user, bio: e.target.value });
                        }}
                        />
                        
                        <p className="mt-3 text-xs text-gray-400">Your Bio will be visible while your account is set to public</p>
                </div>
                    
                {location.pathname == "/customer/settings" && (<button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white border bg-[#0066FF] bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-gray-700"
                onClick={updateProfile}>
                    Update
                    {loading && (
                    <CircularProgress
                        size={24}
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          marginTop: '-12px',
                          marginLeft: '-12px',
                          color: 'black'
                        }}
                      />
                    )}
                </button>)}
            </form>
        </div>
    </div>
    {toast && (<div id="toast-success" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow" role="alert">
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
            <span class="sr-only">Check icon</span>
        </div>
        <div class="ml-3 text-sm font-normal">Item moved successfully.</div>
    </div>)}
    </>
  )
}

export default GeneralInformation;
          








  






  


