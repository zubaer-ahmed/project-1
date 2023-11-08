import { useLocalStorage } from "../../Hooks/useLocalStorage";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Icon from "@mui/material/Icon";

import {
  Link,
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import PlaceIcon from "@mui/icons-material/Place";
import * as React from "react";
import ProductCard from "../../Components/ProductCard";

export default () => {
  const navigate = useNavigate();
  const [services, setServices] = React.useState([]);
  const [user, setUser] = useLocalStorage("user", null);
  const [globalState, setGlobalState] = useLocalStorage("globalState", {});

  React.useEffect(() => {
    // setUser({ name: "name" });
    console.log(user);
  }, []);
  const [sortTypes, setSortTypes] = React.useState([
    "Name Ascending",
    "Name Descending",
    "Price Ascending",
    "Price Descending",
  ]);
  const breadcrumbNameMap = {
    "/worker": "Jobs",
  };
  const [sortType, setSortType] = React.useState("");
  React.useEffect(() => {
    fetchJobs();
    return () => { };
  }, []);
  async function fetchJobs() {
    const fetchedArray = await (
      await fetch(import.meta.env.VITE_BASE_URL + "/api/services/getServices")
    ).json();
    setServices(fetchedArray);
    console.log(fetchedArray);
  }
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  function LinkRouter(props) {
    return <Link {...props} component={Link} />;
  }
  return (
    <div className="flex w-full h-full items-start relative basis-full shrink-0 ">

      <div className="basis-full h-full flex flex-col space-y-4 sm:basis-8/12 py-8 px-4  shrink-0">
        {/* <div className="flex flex-wrap flex-col sm:flex-row  w-full text-blue-700 space-y-2 sm:space-y-0 items-center ">
          <div className="basis-full sm:basis-1/3 aspect-video p-2 w-full  flex items-center justify-center max-w-xs">
            <div className="border rounded w-full h-full flex items-center justify-center text-4xl flex-col max-w-xs hover:shadow">
              <Icon fontSize="inherit">explore</Icon>
              <div className="text-base font-bold">Explore Jobs</div>
            </div>
          </div>
          <div className="basis-full sm:basis-1/3 aspect-video p-2 w-full  flex items-center justify-center max-w-xs">
            <div className="border rounded w-full h-full flex items-center justify-center text-4xl flex-col max-w-xs hover:shadow">
              <Icon fontSize="inherit">explore</Icon>
              <div className="text-base font-bold">Explore Services</div>
            </div>
          </div>
          <div className="basis-full sm:basis-1/3 aspect-video p-2 w-full  flex items-center justify-center max-w-xs">
            <div className="border rounded w-full h-full flex items-center justify-center text-4xl flex-col max-w-xs hover:shadow">
              <Icon fontSize="inherit">star</Icon>
              <div className="text-base font-bold">My Jobs</div>
            </div>
          </div>
          <div className="basis-full sm:basis-1/3 aspect-video p-2 w-full  flex items-center justify-center max-w-xs">
            <div className="border rounded w-full h-full flex items-center justify-center text-4xl flex-col max-w-xs hover:shadow">
              <Icon fontSize="inherit">star</Icon>
              <div className="text-base font-bold">My Services</div>
            </div>
          </div>
          <div className="basis-full sm:basis-1/3 aspect-video p-2 w-full  flex items-center justify-center max-w-xs">
            <div className="border rounded w-full h-full flex items-center justify-center text-4xl flex-col max-w-xs hover:shadow">
              <Icon fontSize="inherit">star</Icon>
              <div className="text-base font-bold">My Services</div>
            </div>
          </div>
        </div> */}
        <Breadcrumbs
          separator="›"
          aria-label="breadcrumb"
          sx={{ fontSize: "14px", fontWeight: "600" }}
        >
          <Link underline="hover" color="inherit" to="/">
            Home
          </Link>
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;

            return last ? (
              <div key={to}>{breadcrumbNameMap[to]}</div>
            ) : (
              <Link underline="hover" color="inherit" to={to} key={to}>
                {breadcrumbNameMap[to]}
              </Link>
            );
          })}
        </Breadcrumbs>
        <div className="text-2xl font-bold">Best Services Near You</div>
        <div className="flex items-center space-x-2 rounded px-4 shadow-sm border w-full h-16 p-2">
          <div className="font-bold ">Sort By</div>
          <FormControl size="small">
            <InputLabel id="demo-simple-select-label">Select</InputLabel>
            <Select
              className="w-40"
              label="Sort By"
              value={sortType}
              onChange={(event) => {
                setSortType(event.target.value);
              }}
            >
              <MenuItem value="">
                <em>Select One</em>
              </MenuItem>
              {sortTypes.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="jobs-list w-full h-full flex flex-col space-y-4">
          {services.slice(0, 10).map((item, index) => (
            <div key={index}>
              <Link to={`/service/${item._id}`}>
                <div className="w-full h-full flex flex-col items-center justify-center bg-white">
                  {/* <div className="flex w-full h-full justify-center border rounded-lg shadow-sm p-4 button bg-opacity-50  space-x-4 flex-wrap sm:flex-nowrap">
                    <img
                      src={"/noimage.svg"}
                      alt=""
                      className="w-full sm:w-28 h-28 object-cover self-start"
                    />
                    <div className="w-full h-full flex flex-col justify-center space-y-1">
                      <h3 className="text-lg font-bold text-blue-600">
                        {item.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-xs">
                        <div className="rounded px-1 bg-green-500 text-white">
                          4.6
                        </div>
                        <div className="flex">
                          {Array(3)
                            .fill()
                            .map((_, index) => (
                              <Icon key={index} fontSize="inherit">
                                star
                              </Icon>
                            ))}
                          {Array(2)
                            .fill()
                            .map((_, index) => (
                              <Icon
                                key={index}
                                className="text-gray-400"
                                fontSize="inherit"
                              >
                                star
                              </Icon>
                            ))}
                        </div>
                        <div className="rounded px-1 text-gray-500">
                          ( 223 Ratings )
                        </div>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 space-x-1">
                        <Icon fontSize="inherit">access_time</Icon>
                        <div>
                          {new Date(
                            item.availabilityStartTime
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}{" "}
                          -{" "}
                          {new Date(
                            item.availabilityEndTime
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </div>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 space-x-1">
                        <PlaceIcon fontSize="inherit" />
                        <div>{item.locations.join(". ")}</div>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 space-x-1">
                        <Icon fontSize="inherit">attach_money</Icon>
                        <div>{item.cost} USD</div>
                      </div>
                      <div className="flex text-xs items-center text-gray-500 space-x-1">
                        <Icon fontSize="inherit">description</Icon>
                        <div>{item.description}</div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="p-2 border border-gray-500 font-medium self-start flex items-center space-x-1 bg-white hover:bg-green-100 hover:shadow-lg rounded">
                          <Icon fontSize="inherit">phone</Icon>
                          <div>Direct Call</div>
                        </div>
                        <div className="p-2 border border-gray-500 text-white font-medium self-start flex items-center space-x-1 bg-green-500 hover:bg-green-400 hover:shadow-lg rounded">
                          <Icon fontSize="inherit">chat</Icon>
                          <div>Instant Chat</div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <ProductCard object={{ ...item }} />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-auto basis-4/12 flex flex-col absolute sm:static h-full w-full sm:w-auto py-8 px-8 -translate-x-full opacity-0 sm:opacity-100 sm:translate-x-0 ">
        <div className="flex flex-col space-y-2">
          <div className="font-bold text-xl">Filters</div>
          <div className="mt-4"></div>
          <div className="font-bold mb-2">Sort By</div>
          <FormControl fullWidth>
            <InputLabel>Select</InputLabel>
            <Select
              label="Sort By"
              value={sortType}
              onChange={(event) => {
                setSortType(event.target.value);
              }}
            >
              <MenuItem value="">
                <em>Select One</em>
              </MenuItem>
              {sortTypes.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            <div className="mt-4"></div>
            <div className="font-bold">Options</div>
          </FormControl>
          <FormControlLabel control={<Checkbox />} label="Online Now" />
        </div>
        <div className="flex flex-col">
          <div className="mt-4"></div>
          <div className="font-bold ">More Services Like This</div>
          {services.slice(0, 5).map((item, index) => (
            <Link to={`/service/${item._id}`} key={index}>
              <div className="text-blue-600 text-xs flex">
                <div>{item.title + " - " + item.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
