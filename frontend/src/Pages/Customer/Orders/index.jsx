import * as React from "react";
import { Link, Routes, Route, useNavigate, Outlet } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Icon from "@mui/material/Icon";
import { useAuth } from "../../../Hooks/useAuth";
import SideBar from "../../../Components/Customer/Sidebar";
import WorkerPanel from "../../Jobs";
import CustomerPanel from "../../CustomerPanel";
import AdminPanel from "../../AdminPanel";
import { LineChart } from '@mui/x-charts/LineChart';

import {
  Checkbox,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Popover,
  Select,
} from "@mui/material";
import LandingPage from "../../LandingPage";
import servicesList from "@/Data/services";
import Orders from "./orders";

export default function Page() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  const { user, setUser } = useAuth();

  const [suggestions, setSuggestions] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');

  const services = React.useMemo(() => {
    if (!suggestions) {
      return servicesList;
    }
    return suggestions;
  }, [suggestions]);
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);
    const newSuggestions = await (await fetch(import.meta.env.VITE_BASE_URL + `/api/services/search/${value}`)).json();
    setSuggestions(newSuggestions);
  };


  return (
    <section className="flex flex-col w-full h-full  basis-full shrink-0 container mx-auto mt-8">
      {(() => {
        if (user?.roles?.includes("customer")) {
          return (
            <>
            <div className="flex flex-col">
            <div className="flex flex-col sm:flex-row">
              <div className="sm:basis-11/12">
            <Orders />
              </div>
              {/*<div className="basis-3/12 py-12 flex flex-col p-6 m-6 shadow border rounded-lg">
                <Link to="/" className="flex items-center gap-2 p-3 rounded hover:bg-gray-200">
                  <Icon>engineering</Icon>
                  <div>All Services</div>
                </Link>
                <Link to="/orders/user" className="flex items-center gap-2 p-3 rounded hover:bg-gray-200">
                  <Icon>person</Icon>
                  <div>My Orders</div>
                </Link>
                <Link to="/suggest" className="flex items-center gap-2 p-3 rounded hover:bg-gray-200">
                  <Icon>assistant</Icon>
                  <div>Suggest New Service</div>
                </Link>
                <Link to="/favourite" className="flex items-center gap-2 p-3 rounded hover:bg-gray-200">
                  <Icon>favorite</Icon>
                  <div>Favorites</div>
                </Link>
              </div>*/}
              <SideBar/>
            </div>
          </div>
          </>)
        } else if (user?.roles?.includes("worker")) {
          return <LandingPage />;
        } else if (user?.roles?.includes("admin")) {
          return <AdminPanel />;
        }
      })()}
    </section >
  );
};
