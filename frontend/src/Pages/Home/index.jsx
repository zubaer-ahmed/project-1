import * as React from "react";
import { Link, Routes, Route, useNavigate, Outlet } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Icon from "@mui/material/Icon";
import { useAuth } from "../../Hooks/useAuth";
import SideBar from "../../Components/SideBar";
import WorkerPanel from "../Jobs";
import CustomerPanel from "../../Pages/CustomerPanel";
import CustomerHome from "../../Pages/CustomerHome";
import AdminPanel from "../AdminPanel";
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
import LandingPage from "../LandingPage";
import servicesList from "@/Data/services";
import Sidebar from "../../Components/Customer/Sidebar";

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
          return <CustomerHome />
        } else if (user?.roles?.includes("worker")) {
          return <LandingPage />;
        } else if (user?.roles?.includes("admin")) {
          return <AdminPanel />;
        }
      })()}
    </section >
  );
};
