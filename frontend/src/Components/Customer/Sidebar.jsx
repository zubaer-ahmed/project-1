import React from 'react'
import Icon from "@mui/material/Icon";
import { Link} from "react-router-dom";

const Sidebar = () => {
  return (
    <>
    <aside class="flex flex-col w-64 h-screen overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l">
        <div class="flex flex-col justify-between flex-1">
            <nav>
                <Link to="/" className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md">
                    <Icon>engineering</Icon>
                    <span class="mx-4 font-medium" >All Services</span>
                </Link>

                <Link to="/orders/user" class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-gray-100 hover:text-gray-700">
                    <Icon>person</Icon>
                    <span class="mx-4 font-medium">My Orders</span>
                </Link>

                <Link to="/suggest" class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-gray-100 hover:text-gray-700">
                    <Icon>assistant</Icon>
                    <span class="mx-4 font-medium">Suggest New Service</span>
                </Link>

                <Link to="/favourite" class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-gray-100 hover:text-gray-700">
                    <Icon>favorite</Icon>
                    <span class="mx-4 font-medium">Favorites</span>
                </Link>
            </nav>
        </div>
    </aside>
    </>
  )
}

export default Sidebar;