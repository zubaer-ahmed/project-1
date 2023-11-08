import * as React from "react";
import { Link, Routes, Route, useNavigate, Outlet } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Icon from "@mui/material/Icon";
import { useAuth } from "../../Hooks/useAuth";
import SideBar from "../../Components/SideBar";
import WorkerPanel from "../Jobs";
import CustomerPanel from "../../Pages/CustomerPanel";
import AdminPanel from "../AdminPanel";
import { LineChart } from '@mui/x-charts/LineChart';
import Loading from "@/Components/Loading";

import {
  Button,
  ButtonBase,
  Checkbox,
  Collapse,
  FormControl,
  Input,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  MenuItem,
  Popover,
  Select,
} from "@mui/material";


export default function Page() {
  const [categories, setCategories] = React.useState([
    { icon: "cleaning_services", name: 'cleaning' },
    { icon: "pest_control", name: 'bug-control' },
    { icon: "build", name: 'repair' },
    { icon: "power", name: 'electrics' },
    { icon: "food_bank", name: 'households' },
    { icon: "plumbing", name: 'plumbing' },
    { icon: "house", name: 'shifting' },
    { icon: "imagesearch_roller", name: 'painting' },
  ]);
  const [showSideBar, setShowSideBar] = React.useState(false);
  const [servicesList, setServicesList] = React.useState([]);
  const [services, setServices] = React.useState([]);
  const { user, setUser } = useAuth();
  const [suggestions, setSuggestions] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [inputValue, setInputValue] = React.useState('');
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      setServicesList(await (await fetch(import.meta.env.VITE_BASE_URL + `/api/services/getServices`)).json());
      setLoaded(true)
      console.log(await (await fetch(import.meta.env.VITE_BASE_URL + `/api/services/getServices`)).json())
    })();

  }, [])
  React.useEffect(() => {
    setCategories(categories.map((c) => {
      c.children = servicesList.filter((s) => s.category.includes(c.name));
      return c;
    }))

    let res = servicesList;
    if (suggestions)
      res = suggestions;
    setServices(res)
  }, [servicesList, suggestions]);
  React.useEffect(() => {
    let res = servicesList;
    if (suggestions)
      res = suggestions;
    if (selectedCategory && selectedCategory != "all")
      res = res.filter((s) => s.category.includes(selectedCategory));
    setServices(res)
  }, [selectedCategory])

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);
    const newSuggestions = await (await fetch(import.meta.env.VITE_BASE_URL + `/api/services/search/${value}`)).json();
    setSuggestions(newSuggestions);
  };

  const [open, setOpen] = React.useState(true);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="sm:hidden w-full h-12 bg-gray-100 flex items-center px-4 border shadow space-x-2" onClick={() => setShowSideBar(true)}>
        <Icon>menu</Icon>
        <div>More</div>
      </div>
      <div className="flex relative ">
        <div className={`${!showSideBar ? "-translate-x-full sm:translate-x-0" : ""} overscroll-none top-0 left-0  w-full sm:w-auto z-10 bg-white absolute sm:sticky basis-full sm:basis-3/12 flex flex-col p-6 pb-24 rounded-lg border-r  sm:top-[4.5em] h-screen overflow-auto`}>
          <div className="text-lg font-bold m-2 flex items-center space-x-2 cursor-pointer" onClick={() => setShowSideBar(false)}>
            <Icon>arrow_back</Icon>
            <div>Categories</div>
          </div>
          <List>
            {categories.map((item, index) => (
              <div key={index}>
                <Button className="w-full" onClick={() => setCategories(categories.map((c) => {
                  if (c.name === item.name) {
                    setSelectedCategory(c.name);
                    return { ...c, open: !c.open };
                  } else {
                    return { ...c, open: false };
                  }
                }
                ))}>
                  <Icon>{item.icon}</Icon>
                  <div className="grow" >{item.name.replace(/^\w/, (c) => c.toUpperCase())}</div>
                  {item.open ? <Icon>expand_less</Icon>
                    : <Icon>expand_more</Icon>}
                </Button>
                <Collapse in={item.open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding >
                    {item.children?.map((item, index) => (
                      <ListItemButton key={index} onClick={() => { setShowSideBar(false); document.getElementById(item._id).scrollIntoView({ block: 'end', behavior: 'smooth' }); }}>
                        <div className="text-sm" >{item.name}</div>
                      </ListItemButton>
                    ))}

                  </List>
                </Collapse>
              </div>
            ))}
          </List>
        </div>
        <div className="flex flex-col basis-full sm:basis-9/12 ">
          <div className="flex flex-col mx-6 p-6 bg-blue-400 text-white shadow-lg  rounded-b-xl" >
            <div className="relative flex gap-2 mb-4 w-full max-w-xs">
              <input
                type="text"
                onChange={handleInputChange}
                value={inputValue}
                placeholder="Type something..."
                className="border border-gray-300 p-1 rounded w-full text-black px-2"
              />
              <div className="material-button">Search</div>
            </div>
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4">
              All Services
            </h1>
            <p className="lg:w-2/3 leading-relaxed text-base">
              Get Your Desired Product from Categories!
            </p>
          </div>
          <div className="flex flex-wrap -m-4 text-center p-6">
            <div className="flex w-full  p-3 font-bold items-center space-x-2 border rounded-lg shadow m-4">
              <div>Category</div>
              <Select size="small"
                value={selectedCategory}
                onChange={(event) => {
                  setSelectedCategory(event.target.value);
                }}
              >
                <MenuItem value="all">
                  All
                </MenuItem>
                {categories.map((item, index) => (
                  <MenuItem key={index} value={item.name}>
                    {item.name.replace(/^\w/, (c) => c.toUpperCase())}
                  </MenuItem>
                ))}
              </Select>
            </div>
            {loaded && services.map((service, index) => (
              <Link id={service._id} to={`/service/${service.id}`} key={index} className="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div className="border px-4 py-4 rounded-lg h-full hover:bg-gray-100 shadow">
                  <img
                    src={service.imageSrc || "/noimage.svg"}
                    className="h-14 mx-auto"
                    alt=""
                  />
                  <p className="leading-relaxed mt-2">{service.name}</p>
                </div>
              </Link>
            )) || (
                <Loading />
              )}
          </div>
        </div>
      </div>
    </div >
  );
};


