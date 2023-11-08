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
import JobById from "@/Pages/JobById"

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
import services from '../../Data/services';
import { LineChart } from "@mui/x-charts/LineChart";

export default function Page() {
  const navigate = useNavigate();
  const [jobs, setJobs] = React.useState([]);
  const [user, setUser] = useLocalStorage("user", null);
  const { slug: orderId } = useParams()
  const [order, setOrder] = React.useState(null);

  const [sortTypes, setSortTypes] = React.useState([
    "Name Ascending",
    "Name Descending",
    "Price Ascending",
    "Price Descending",
  ]);
  const breadcrumbNameMap = {
    "/jobs": "Jobs",
  };
  const [sortType, setSortType] = React.useState("");
  React.useEffect(() => {
    (async () => {
      const fetchedObject = await (
        await fetch(import.meta.env.VITE_BASE_URL + `/api/orders/getAllOrders`)
      ).json();
      setJobs(fetchedObject);
    })()

    return () => { };
  }, [orderId]);

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  function LinkRouter(props) {
    return <Link {...props} component={Link} />;
  }
  return (
    !orderId && (
      <div className="flex flex-col w-full">
        <div className="flex flex-col sm:flex-row sm:flex-wrap bg-gray-50">
          <div className="flex flex-col sm:flex-row sm:flex-wrap bg-gray-50 grow ">
            <div className="hover:bg-gray-100 basis-1/3 border border-gray-300 px-4 py-6 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold">163</div>
              <div className="text-gray-500 text-center font-bold">Jobs Available</div>
            </div>
            <div className="hover:bg-gray-100 basis-1/3 border border-gray-300 px-4 py-6 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold">12</div>
              <div className="text-gray-500 text-center font-bold">My Jobs</div>
            </div>
            <div className="hover:bg-gray-100 basis-1/3 border border-gray-300 px-4 py-6 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold">3</div>
              <div className="text-gray-500 text-center font-bold">Reviews</div>
            </div>
          </div>
          <div className="basis-1/3 border h-52 border-gray-300 px-4 py-6 flex flex-col items-center justify-center">
            <LineChart
              margin={{ top: 25, bottom: 25, left: 25, right: 25 }}

              sx={{ flex: 1 }}
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
              ]}
            />
            <div className="flex p-4 gap-2">
              <div className="font-bold">Spendings:</div>
              <div>$432</div>
            </div>
          </div>
        </div>
        <div className="flex w-full h-full items-start relative basis-full shrink-0 ">
          <div className="basis-full h-full flex flex-col space-y-4 sm:basis-8/12 py-8 px-4  shrink-0">
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
                const to = ``;

                return last ? (
                  <div key={to}>{breadcrumbNameMap[to]}</div>
                ) : (
                  <Link underline="hover" color="inherit" to={to} key={to}>
                    {breadcrumbNameMap[to]}
                  </Link>
                );
              })}
            </Breadcrumbs>
            <div className="text-2xl font-bold">Best Jobs Near You</div>
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
            <div className="jobs-list w-full h-full flex flex-col space-y-4 py-4">
              {jobs.length > 0 && jobs.slice(0, 10).sort((a, b) => (new Date(b.updatedAt) - new Date(a.updatedAt))).map((order, index) => (
                <div key={index}>
                  <div className="w-full h-full flex flex-col bg-white">
                    <ProductCard order={order} service={services.find(item => item.id == order.serviceId)} />
                    <div className="divider w-full bg-zinc-600/25 h-[1px] my-6"></div>
                  </div>
                </div>
              )) || (
                  <div className="p-8 w-full h-64 text-gray-700 flex flex-col gap-2 items-center justify-center border-2 text-3xl">
                    <div className="text-8xl">

                      <Icon fontSize='inherit'>warning</Icon>
                    </div>
                    <div>No Jobs Found</div>
                  </div>
                )}
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
              {jobs.slice(0, 5).map((item, index) => (
                <Link to={`/service/${item._id}`} key={index}>
                  <div className="text-blue-600 text-xs flex">
                    <div>{item.title + " - " + item.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>)
    || (<div className="w-full flex flex-col">
      <JobById />
    </div>)
  );
};
