import Icon from "@mui/material/Icon";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({ order: { serviceId, user, time, description, location, price }, service: { _id, name, id, imageSrc }, order, service }) => {
    const navigate = useNavigate();
    async function acceptOrder() {
        let res = await (await fetch(import.meta.env.VITE_BASE_URL + `/api/orders/acceptOrder/${order._id}`,
            {
                credentials: "include",
            })).json();
        console.log("accept order", res)
        navigate(`/jobs/${order._id}`);
    }

    return (
        <div
            className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0">
            <img src={`${imageSrc || "/noimage.svg"}`} alt="tailwind logo" className="rounded-xl h-40 sm:h-full sm:w-1/5 object-cover" />
            <div className="w-full md:w-3/4 bg-white flex flex-col space-y-2 p-3">
                <div className="flex justify-between item-center">
                    <div className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800  ">

                        <div className="flex space-x-1 text-gray-600 font-bold text-sm ml-1">
                            <div className="">
                                {user.firstName}</div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>  <div>{4.5}</div >
                            <span className="text-gray-500 font-normal">(76 reviews)</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">

                        <div className="text-gray-500 font-medium ">{id || 'Category'}</div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd" />
                    </svg>

                </div>
                <div className="flex items-center space-x-2 text-md text-gray-500">
                    <Icon fontSize="inherit">location_on</Icon>
                    <div>{location}</div>
                </div>
                <h3 className="font-black text-gray-800 text-xl">{name || "TITLE"}</h3>
                <p className=" text-gray-500 text-sm line-clamp-4">{description && false || `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                    numquam blanditiis harum quisquam eius sed odit fugiat iusto
`}</p>

                <div className="flex flex-col">

                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Icon fontSize="inherit">access_time</Icon>
                        <div>{new Date(
                            time
                        ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                        })}</div>
                    </div>

                </div>
                <div className="flex items-center ">
                    <p className="text-xl font-black text-gray-800">
                        ${price}
                        <span className="font-normal text-gray-600 text-base">/work</span>
                    </p>
                    <div className="grow"></div>
                    <div className="flex space-x-2">
                        <Link to={`/jobs/${order._id}`} className="button flex p-2 items-cneter">
                            <Icon>open_in_new</Icon>
                            <div>View</div>
                        </Link>
                        <Link className="button flex p-2 items-cneter bg-blue-500 text-white hover:text-white"
                            onClick={acceptOrder}>
                            <Icon>task_alt</Icon>
                            <div>Accept</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProductCard;