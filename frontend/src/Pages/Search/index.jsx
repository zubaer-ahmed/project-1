import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Select, MenuItem, OutlinedInput, Typography, Slider } from '@mui/material'
import { useSearchParams } from "react-router-dom";


export default function Page() {
    let [searchParams, setSearchParams] = useSearchParams();
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        },
        {
            name: "Random Name #3",
            description: "Hello World 3!"
        }
    ]
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
    const [priceFilter, setPriceFilter] = React.useState([20, 37]);

    return (
        <div className="w-full flex flex-col border min-h-screen self-center sm:px-24 p-6 gap-4">
            <nav class="flex" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-3 text-xl">
                    <li class="inline-flex items-center">
                        <a href="#" class="inline-flex items-center font-medium text-gray-700 hover:text-blue-600">
                            <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                            </svg>
                            Home
                        </a>
                    </li>
                    <li aria-current="page">
                        <div class="flex items-center">
                            <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <span class="ml-1 font-medium text-gray-500 md:ml-2 dark:text-gray-400">Flowbite</span>
                        </div>
                    </li>
                </ol>
            </nav>
            <h1>Showing Results for "{searchParams.get("q")}"</h1>
            <div className="flex grow sm:flex-row flex-col">
                <div className="basis-3/12 border-r flex flex-col p-4">
                    <div className="text-xl font-bold my-2">Catergory</div>
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
                    </div>
                </div>
                <div className="basis-8/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6 grow">
                    {Array(5).fill(0).map((_, i) => (
                        <div class="basis-1/2 bg-white border border-gray-200 rounded-lg shadow flex flex-col">
                            <img class="p-8 rounded-t-lg aspect-video" src="/noimage.svg" alt="product image" />
                            <div class="px-5 pb-5">
                                <a href="#">
                                    <h5 class="text-xl font-semibold tracking-tight text-gray-900 ">Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport</h5>
                                </a>
                                <div class="flex items-center mt-2.5 mb-5">
                                    {Array(5).fill(0).map((_, i) => <span class="text-md text-yellow-500">★</span>)}
                                    <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-2">5.0</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-3xl font-bold text-gray-900 ">$599</span>
                                    <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                                </div>
                            </div>
                        </div>))}
                </div>
            </div>
            {/* <Carousel
                fullHeightHover={false}     // We want the nav buttons wrapper to only be as big as the button element is
                navButtonsAlwaysVisible
                animation="slide"
                cycleNavigation={true}
            >
                {items.map((item, i) => <Item key={i} item={item} />)}
            </Carousel> */}
        </div>
    )



}
function Item(props) {
    return (
        <div className='border'>
            <img src="/noimage.svg" className='w-full h-64 sm:h-96 aspect-auto' alt="" />
        </div>
    )
}