import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Features from "../Guest/Features";
import FeaturedCategory from "../Guest/FeaturedCategory";
import HowItWorks from "./Why";
import { Divider, Icon, IconButton, InputBase, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { useHelpers } from "../../Hooks/useHelpers";
import React from "react";
import districts from "../../Data/districts_bd.json";
import SearchIcon from '@mui/icons-material/Search';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import Footer from "../../Components/Footer";
import CTA from "./CTA";
import Testimonials from "./Testimonials";
import video from '/heroVideo.mp4';

export default function Page() {
  const [userLocation, setUserLocation] = React.useState("");
  const { getLocation } = useHelpers();

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
  
  return (
    <>
    <div className="relative h-[55vh] md:h-[45vh] lg:h-[75vh] w-screen">
        <video className="absolute w-full h-full object-cover saturate-100" autoPlay loop muted playsInline>
            <source src="/heroVideo.mp4" type="video/mp4"/>
        </video>

          <div className="relative z-10 flex items-center justify-center flex-col h-full">

            <div className="text-center">
              <h1 className="text-3xl font-semibold text-white lg:text-4xl my-4">Need a helping hand?</h1>
              <h1 className="text-3xl font-semibold text-white lg:text-4xl my-4">Hand-Picked Professionals to serve you 24/7</h1>
            </div>
            <div className="w-1/2 flex justify-evenly mt-8">
              <div className="mx-auto lg:mx-0 flex gap-2 items-center w-96 px-2 max-w-xs">
                  {/* <InputBase
                    ref={async (el) => { setUserLocation("Lat: " + (await getLocation()).latitude.toFixed(2) + " Long: " + (await getLocation()).longitude.toFixed(2)) }}
                    sx={{ ml: 1, flexGrow: 1 }}
                    placeholder="Search Google Maps"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    onChange={(event) => { setUserLocation(event.target.value) }}
                    value={userLocation || ""}
                  ></InputBase>
                  <IconButton>
                    <Icon>search</Icon>
                  </IconButton> */}
                  <Select
                    size="small"
                    value={""} // Use null instead of an empty string
                    displayEmpty
                    onChange={(event) => {
                      // Handle the selected value here
                    }}
                    input={<OutlinedInput className="border border-white text-white rounded-lg"
                    label="Select District"
                    labelId="select-district-label"
                    id="select-district"/>}
                    renderValue={(selected) => {
                      if (!selected) return <em className="text-white">Select District</em>;
                      return selected;
                    }}
                    className="grow"
                  >
                    {/* Add your options here */}

                    {districts.map((item, index) => (
                      <MenuItem key={index} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
                  <IconButton onClick={async () => { setUserLocation("Lat: " + (await getLocation()).latitude.toFixed(2) + " Long: " + (await getLocation()).longitude.toFixed(2)) }}>
                    <PersonPinCircleIcon className="text-white border rounded-full w-12 h-12"/>
                  </IconButton>
              </div>
              <div className="relative px-2">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <SearchIcon className="text-blue"/>
                </div>
                <input type="text" className="bg-white text-black text-sm rounded-lg block w-96 h-12 pl-10 p-2.5" placeholder="Search for you service"/>
              </div>
            </div>
          </div>
        </div>
      <HowItWorks/>
      <Features/>
      <Testimonials/>
      <CTA/>
      <Footer/>
    </>
  );
};
