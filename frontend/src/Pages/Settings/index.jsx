import * as React from "react";
import { useLocation, Link, Routes, Route, useNavigate, Outlet } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Icon from "@mui/material/Icon";
import { useAuth } from "../../Hooks/useAuth";
import SideBar from "../../Components/SideBar";
import ProfileNavigation from '../../Components/Customer/ProfileNavigation';

import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
export default function index() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const location = useLocation();

  const { user, setUser } = useAuth();
  return (
    <>
      <div className="flex flex-row basis-2/12 grow w-full h-full">
        <ProfileNavigation/>
        <Outlet />
      </div>
    {/*<section className="flex flex-col w-full h-full">
      <div className="flex w-full grow items-stretch ">
        <div className=" sm:flex flex-col basis-3/12 grow w-full h-full border m-8 rounded-xl p-4 text-blue-700 space-y-4 hidden">
          <Link
            to="/settings/profile"
            className={`${location.pathname == "/settings/profile" && "bg-blue-100"} space-x-2 rounded p-2 hover:bg-gray-100 flex items-center `}
            >
            <Icon fontSize="inherit">info</Icon>
            <div className="text-gray-500 font-bold">Information</div>
          </Link>
          <Link
            to="/settings/billing"
            className="space-x-2 rounded p-2 hover:bg-gray-100 flex items-center "
            >
            className="todo space-x-2 rounded p-2 hover:bg-gray-100 flex items-center "
          >
            <Icon fontSize="inherit">payment</Icon>
            <div className="text-gray-500 font-bold">Billing</div>
          </Link>
          <Link
            to="/settings/appearance"
            className="space-x-2 rounded p-2 hover:bg-gray-100 flex items-center "
            >
            className="todo space-x-2 rounded p-2 hover:bg-gray-100 flex items-center "
          >
            <Icon fontSize="inherit">brush</Icon>
            <div className="text-gray-500 font-bold">Appearance</div>
          </Link>
          <Link
            to="/settings/notifications"
            className="space-x-2 rounded p-2 hover:bg-gray-100 flex items-center "
            >
            className="todo space-x-2 rounded p-2 hover:bg-gray-100 flex items-center "
          >
            <Icon fontSize="inherit">notifications</Icon>
            <div className="text-gray-500 font-bold">Notifications</div>
          </Link>
          <Link
            to="/settings/privacy"
            className="space-x-2 rounded p-2 hover:bg-gray-100 flex items-center "
            >
            className="todo space-x-2 rounded p-2 hover:bg-gray-100 flex items-center "
          >
            <Icon fontSize="inherit">security</Icon>
            <div className="text-gray-500 font-bold">Privacy</div>
          </Link>
        </div>
        <div className="flex flex-col basis-9/12 grow w-full h-full">
          <Outlet />
        </div>
      </div>
    </section>*/}
    </>
  );
};