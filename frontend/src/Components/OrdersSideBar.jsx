import { Icon } from "@mui/material";
import { Link, Routes, Route, useNavigate, Outlet } from "react-router-dom";


export default function Component() {
    return <div className="flex flex-col w-full h-full text-gray-700">
        <div className="text-2xl text-black">Customer</div>
        <Link
            to="/orders/user"
            className="space-x-2 rounded p-2 hover:bg-gray-100 flex items-center "
        >
            <Icon fontSize="inherit">info</Icon>
            <div className="text-gray-500 font-bold">Orders</div>
        </Link>
        <Link
            to="/orders/user/wishlist"
            className="space-x-2 rounded p-2 hover:bg-gray-100 flex items-center "
        >
            <Icon fontSize="inherit">favorite</Icon>
            <div className="text-gray-500 font-bold">Favourite</div>
        </Link>
        <Link
            to="/orders/user/reviews"
            className="space-x-2 rounded p-2 hover:bg-gray-100 flex items-center "
        >
            <Icon fontSize="inherit">comment</Icon>
            <div className="text-gray-500 font-bold">Reviews</div>
        </Link>
        <div className="my-4"></div>
        <div className="text-2xl text-black">Worker</div>
        <Link
            to="/orders/worker"
            className="space-x-2 rounded p-2 hover:bg-gray-100 flex items-center "
        >
            <Icon fontSize="inherit">info</Icon>
            <div className="text-gray-500 font-bold">Jobs</div>
        </Link>

        <Link
            to="/orders/worker/reviews"
            className="space-x-2 rounded p-2 hover:bg-gray-100 flex items-center "
        >
            <Icon fontSize="inherit">comment</Icon>
            <div className="text-gray-500 font-bold">Reviews</div>
        </Link>
    </div>
}