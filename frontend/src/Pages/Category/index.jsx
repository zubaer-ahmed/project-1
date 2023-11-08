
import dayjs, { Dayjs } from "dayjs";
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { DatePicker, LocalizationProvider, StaticDatePicker, StaticTimePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Select, MenuItem, FormControl, FormHelperText, TextField, Button, InputBase, IconButton, Divider, Container, Modal, Icon } from "@mui/material";
import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, OutlinedInput, Typography, Slider } from '@mui/material'
import { Link, useParams, useSearchParams } from "react-router-dom";
import categories from "../../Data/services.json";
import districts from "../../Data/districts_bd.json";
import { useGlobalState } from '../../Hooks/useGlobalState';
import CustomModal from '../../Components/CustomModal';
const moreServices = Array(3).fill(0).map((_, i) => categories[Math.floor(Math.random() * categories.length)]);


export default function Page() {
    let [searchParams, setSearchParams] = useSearchParams();
    let queryLocation = searchParams.get("location");
    let { slug: urlParamCategory } = useParams();
    let category = categories.find(category => category.value == urlParamCategory);
    const { globalState, setGlobalState } = useGlobalState();
    React.useEffect(() => {
        setGlobalState((p) => ({ ...p, chosenPackage: null }));

    }, [])

    const [priceFilter, setPriceFilter] = React.useState([20, 37]);

    return (
        <div className="w-full flex flex-col border min-h-screen self-center items-center">
            <nav class="flex px-12 p-4 border-b self-stretch" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-3 text-xl">
                    <li class="inline-flex items-center">
                        <a href="#" class="inline-flex items-center font-medium text-gray-700 hover:text-blue-600">
                            <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                            </svg>
                            Home
                        </a>
                    </li>
                    <li class="inline-flex items-center">
                        <a href="#" class="inline-flex items-center font-medium text-gray-700 hover:text-blue-600">
                            <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                            </svg>
                            Categories
                        </a>
                    </li>
                    <li aria-current="page">
                        <div class="flex items-center">
                            <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <span class="ml-1 font-medium text-gray-500 md:ml-2 dark:text-gray-400">{category.name}</span>
                        </div>
                    </li>
                </ol>
            </nav>
            <div className="flex grow sm:flex-row flex-col gap-8 p-6 sm:p-12 ">
                <div className="basis-4/12  flex flex-col max-w-xs sticky top-[4.5em] self-start">
                    <div className="my-2"></div>
                    <div className="text-4xl font-semibold">{category.name}</div>
                    <div className="my-2"></div>
                    <div class="flex items-center text-xl">
                        {Array(5).fill(0).map((_, i) => <span class=" text-yellow-500">★</span>)}
                        <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-2">5.0</span>
                    </div>
                    <div className="my-2"></div>
                    <div className="rounded bg-blue-100 p-4 font-medium flex items-center shadow cursor-pointer">
                        <div>
                            How it Works
                        </div>
                        <Icon>chevron_right</Icon></div>
                    <div className="text-xl font-bold my-2">More Services</div>
                    <div className="flex">
                        {moreServices.map((category, index) => (
                            <Link to={`/category/${category.value}`} key={index} className="basis-1/3 p-1">
                                <div className="border-2 border-gray-300 p-2 rounded flex flex-col items-center h-full w-full hover:bg-blue-100 relative">
                                    <img src={category.img} className="scale-100 hover:scale-105 duration-300 w-full aspect-square" />
                                    <p className="w-full rounded absolute bottom-0 left-0 text-xs text-center self-stretch mt-2 text-ellipsis break-all p-1 bg-gray-500/50 text-white">{category.name}</p>
                                </div>
                            </Link>
                        ))}</div>
                    {/* <div className="text-xl font-bold my-2">Catergory</div>
                    <Select size="small"
                        defaultValue={""}
                        input={<OutlinedInput />}
                        displayEmpty
                        onChange={(event) => {
                        }}
                        renderValue={(selected) => {
                            if (!selected) return <em>All</em>;
                            return selected;
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
                    <div className="text-xl font-bold my-2">Price</div>
                    <Slider
                        getAriaLabel={() => 'Price range'}
                        value={priceFilter}
                        onChange={(event, newValue) => { setPriceFilter(newValue) }}
                        valueLabelDisplay="auto"
                    />
                    <div className="flex text-gray-500">
                        <div>${priceFilter[0]}</div>
                        <div className="grow"></div>
                        <div>${priceFilter[1]}</div>
                    </div> */}


                    <div className="text-xl font-bold my-2">Location</div>
                    <div className="flex items-center  p-2 gap-2">
                        <Select size="small" className="grow"
                            defaultValue={queryLocation || ""}
                            input={<OutlinedInput />}
                            displayEmpty
                            onChange={(event) => {
                            }}
                            renderValue={(selected) => {
                                if (!selected) return <em>All</em>;
                                return selected;
                            }}
                        >
                            <MenuItem value="all">
                                All
                            </MenuItem>
                            {districts.map((item, index) => (
                                <MenuItem key={index} value={item.name}>
                                    {item.name.replace(/^\w/, (c) => c.toUpperCase())}
                                </MenuItem>
                            ))}
                        </Select>
                        <IconButton onClick={async () => { setUserLocation("Lat: " + (await getLocation()).latitude.toFixed(2) + " Long: " + (await getLocation()).longitude.toFixed(2)) }}>
                            <Icon>my_location</Icon>
                        </IconButton>
                    </div>
                </div>
                <div className="basis-9/12 flex flex-col px-6 gap-4">
                    <div className="max-w-4xl">

                        <Carousel
                            fullHeightHover={false}     // We want the nav buttons wrapper to only be as big as the button element is
                            navButtonsAlwaysVisible
                            animation="slide"
                            cycleNavigation={true}
                        >
                            {Array(4).fill(0).map((item, i) => <Item key={i} item={category} />)}
                        </Carousel>
                    </div>
                    <div className="flex flex-col">
                        {category?.packages.map((pck, i) => (
                            <div class="basis max-w-2xl p-2 bg-white border-b border-gray-200 rounded-lg  flex">
                                <img class="h-32 rounded-t-lg aspect-video  object-contain" src={pck.img || "/noimage.svg"} alt="product image" />
                                <div class="px-5 pb-5 gap-2 flex flex-col grow">
                                    <a href="#">
                                        <h5 class="text-xl font-bold tracking-tight text-gray-900 ">{pck.name}</h5>
                                    </a>
                                    <div class="flex items-center ">
                                        {Array(5).fill(0).map((_, i) => <span class="text-md text-yellow-500">★</span>)}
                                        <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-2">5.0</span>
                                    </div>
                                    <div className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                        molestiae quas vel </div>
                                    <ul className='text-xs'>
                                        <li>
                                            <div className="flex">
                                                <div className="w-5 h-5 mx-2">•</div>
                                                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                            </div>
                                            <div className="flex">
                                                <div className="w-5 h-5 mx-2">•</div>
                                                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="grow"></div>
                                    <div class="flex items-center justify-between">
                                        <span class="text-xl font-bold text-gray-900 ">$599</span>
                                        <a onClick={e => {
                                            setGlobalState((p) => ({ ...p, chosenPackage: pck }));
                                        }} class="cursor pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Book Now</a>
                                    </div>

                                </div>
                            </div>))}
                    </div>
                </div>
            </div>
            <CustomModal open={globalState.chosenPackage}
                setOpen={(b) => {
                }}
                onClose={() => {
                    setGlobalState((p) => ({ ...p, chosenPackage: null }));
                }}>
                {(globalState.chosenPackage && <div className="py-4 h-screen ">
                    <div className='flex flex-col w-full max-w-md bg-white shadow rounded overflow-auto h-full relative group'>
                        <div className="absolute top-0 left-0 w-full z-20 bg-gray-300/50 p-1 px-2 hidden group-hover:flex">
                            <div className="grow"></div>
                            <div className="hover:text-blue-500 hover:underline cursor-pointer" onClick={() => {
                                globalState.navigate(`/admin/edit/service/${globalState.chosenPackage.id}`);
                            }}>Edit</div>
                        </div>
                        <div className="sticky top-0 z-10 bg-white text-xl font-bold text-center self-stretch text-ellipsis break-all border-b p-4">{globalState.chosenPackage.name}</div>

                        <div className={`relative text-xl font-bold flex flex-col overflow-auto p-8 gap-2  ${globalState.chosenPackage.showReviews && " hidden" || "flex"}`}>
                            <img src={globalState.chosenPackage.img} className="w-full aspect-video object-contain" />
                            <div className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel
                            </div>
                            <div className="my-1"></div>
                            <ul className='text-xs'>
                                <li>
                                    <div className="flex">
                                        <div className="w-5 h-5 mx-2">•</div>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                    </div>
                                    <div className="flex">
                                        <div className="w-5 h-5 mx-2">•</div>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                    </div>
                                </li>
                            </ul>
                            <div className="my-3"></div>
                            <div className="">
                                <label className="block mb-2 text-sm font-bold text-gray-900">Describe Your Issue</label>
                                <TextField multiline rows={2} fullWidth variant="outlined" value={globalState.chosenPackage.description} onChange={(event) => setDescription(event.target.value)} />
                            </div>
                            <div className="my-2"></div>
                            <label className="block mb-2 text-sm font-bold text-gray-900">Location</label>
                            <div className="flex p-2 rounded border border-gray-300 hover:border-black">
                                <InputBase
                                    sx={{ ml: 1, flexGrow: 1 }}
                                    placeholder="Search Google Maps"
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                    onChange={(event) => { }}
                                    value={globalState.chosenPackage.userLocation || ""}
                                ></InputBase>
                                <IconButton>
                                    <Icon>search</Icon>
                                </IconButton>
                                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                <IconButton onClick={async () => { }}>
                                    <Icon>my_location</Icon>
                                </IconButton>
                            </div>
                            <div className="my-2"></div>
                            <label className="block mb-2 text-sm font-bold text-gray-900">Appointment Time</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker orientation="landscape" defaultValue={globalState.chosenPackage.time} />
                            </LocalizationProvider>
                            <div className="my-2"></div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker viewRenderers={{
                                    hours: renderTimeViewClock,
                                    minutes: renderTimeViewClock,
                                    seconds: renderTimeViewClock,
                                }}
                                    orientation="landscape" defaultValue={globalState.chosenPackage.time} />
                            </LocalizationProvider>
                            <div className="my-2"></div>
                            <div className="">
                                <label className="block mb-2 text-sm font-bold text-gray-900">Billing Account</label>
                                <Select fullWidth displayEmpty inputProps={{ 'aria-label': 'Without label' }}
                                    value={""} onChange={(event) => { }}>
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {false?.paymentOptions?.map((option, index) => (
                                        <MenuItem key={index} value={option.value}>{option.text}</MenuItem>
                                    ))}
                                    <MenuItem value="" >
                                        <div className=" space-x-2">
                                            <Icon fontSize='inherit'>add</Icon>
                                            <em>Add Payment Option</em>
                                        </div>
                                    </MenuItem>
                                </Select>
                            </div>
                            <div className="my-2"></div>
                            {globalState.chosenPackage.options.map((option, index) => {
                                console.log("option", option)
                                if (option.type == "input#text") {
                                    return (<>
                                        <label className="block mb-2 text-sm font-bold text-gray-900">{option.title}</label>
                                        <TextField rows={2} fullWidth variant="outlined" value={globalState.chosenPackage[option.name]} onChange={(event) => { }} />
                                        <div className="my-2"></div>
                                    </>)
                                }
                                if (option.type == "input#number") {
                                    return (<>
                                        <label className="block mb-2 text-sm font-bold text-gray-900">{option.title}</label>
                                        <TextField rows={2} inputProps={{ min: 0 }} type="number" fullWidth variant="outlined" value={globalState.chosenPackage[option.name]} onChange={(event) => { }} />
                                        <div className="my-2"></div>
                                    </>)
                                }

                                return (<></>)
                            })}
                        </div>

                        <div className="flex text-xl border p-4 items-center transition-all duration-500"
                            onClick={() => setGlobalState(p => ({ ...p, chosenPackage: { ...globalState.chosenPackage, showReviews: !globalState.chosenPackage.showReviews } }))}>
                            <div className="font-bold">Reviews</div>
                            <Icon>{globalState.chosenPackage.showReviews && "expand_more" || "expand_less"}</Icon></div>   <div className="flex flex-col overflow-auto">
                            <div className={`reviews overflow-auto flex flex-col transition-all duration-500 ${globalState.chosenPackage.showReviews && "opacity-100" || "opacity-0 h-0 pointer-events-none"}`}>
                                {Array(10).fill(0).map((review, index) => (
                                    <div key={index} className="flex p-2 gap-3 items-start ">
                                        <img src={"/noimage.svg"} alt="" className="w-12 h-12 cursor-pointer" />
                                        <div className="flex flex-col border-2 p-2 rounded shadow">
                                            <div className="flex">
                                                <div className="text-sm text-gray-500 hover:underline hover:text-blue-500 cursor-pointer">Name</div>
                                                <div className="text-sm text-gray-500 ml-auto">{new Date().toLocaleString()}</div>
                                            </div>
                                            <div className="text-md font-light">Lorem, ipsum dolor sit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex px-8 p-2 gap-3 items-center border-t bg-white">
                            <div className="grow"></div>
                            <div className="font-bold cursor-pointer text-lg" onClick={() => setGlobalState(p => ({ ...p, chosenPackage: null }))}>Cancel</div>
                            <div className="material-button text-lg">Book Now</div>
                        </div>
                    </div>
                </div>)}
            </CustomModal>
        </div >
    )



}
function Item(props) {
    return (
        <div className='border'>
            <img src={props.item.img} className='object-contain w-full h-64 sm:h-96 aspect-auto' alt="" />
        </div>
    )
}