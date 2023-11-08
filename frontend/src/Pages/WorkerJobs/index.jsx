
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as React from "react";
import { Link, Routes, Route, useNavigate, Outlet } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Icon from "@mui/material/Icon";
import { useAuth } from "../../Hooks/useAuth";
import OrdersSideBar from "../../Components/OrdersSideBar";
import { useParams } from "react-router-dom";
import services from '../../Data/services';

import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider, TimePicker, renderTimeViewClock } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DataGrid } from '@mui/x-data-grid';
export default function Page() {
  const { slug: orderId, slug2: mode } = useParams();
  const { user, setUser, fetchUser } = useAuth();
  const [allOrders, setAllOrders] = React.useState([]);
  const [allJobs, setAllJobs] = React.useState([]);
  const [order, setOrder] = React.useState(null);
  const service = React.useMemo(() => services.find(item => item.id == order?.serviceId), [order])
  const steps = ['Order Received', 'Provider Selected', 'Delivered'];
  const [activeStep, setActiveStep] = React.useState(1);
  const [skipped, setSkipped] = React.useState(new Set());
  React.useEffect(() => {
    (async () => {
      let res = await (await fetch(import.meta.env.VITE_BASE_URL + `/api/orders/getOrder/${orderId}`, {
        method: "GET",
        credentials: "include",
      })).json()
      let allOrdersList = await (await fetch(import.meta.env.VITE_BASE_URL + `/api/orders/getAcceptedOrders`, {
        method: "GET",
        credentials: "include",
      })).json()
      console.log("all", allOrdersList);
      setOrder(res);
      setAllOrders(allOrdersList);
    })();
    console.log("slug", orderId)
    return () => { };
  }, [orderId])

  const columns = [
    {
      field: "id", headerName: "Index",
      valueFormatter: ({ value }) => value + 1,
    },
    {
      sortComparator: (v1, v2) => (new Date(v1.time) - new Date(v2.time)),
      field: "data", headerName: "Data", flex: 1, renderCell: (params) => {
        const order = params.value;
        return (<div className="w-full p-2 flex items-center sm:flex-row flex-col ">

          <div className="h-20 w-20 sm:mr-10 inline-flex items-center justify-center flex-shrink-0 ">
            <img
              src={services.find(item => item.id == order?.serviceId).imageSrc || `${"https://firebasestorage.googleapis.com/v0/b/thecaffeinecode.appspot.com/o/Tcc_img%2Flogo.png?alt=media&token=5e5738c4-8ffd-44f9-b47a-57d07e0b7939"}`} />
          </div>
          <div className="flex-grow sm:text-left mt-6 sm:mt-0">
            <div className="my-4"></div>
            {order.provider && (
              <>
                <label className="block mb-2 text-xl font-bold text-gray-900">Provider</label>
                <div className="flex">{order.provider.email}</div>
              </>
            )}
            <div className="my-4"></div>
            <Stepper activeStep={order?.step + 1}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <h1 className="text-black text-2xl title-font font-bold my-2">{services.find(item => item.id == order?.serviceId).name}</h1>
            <div className="flex gap-2">
              <label className="block text-sm font-bold text-gray-900">Time: </label>
              <div>{new Date(order.time).toLocaleString()}</div>
            </div>
            <div className="my-2"></div>
            <div className="flex gap-2">
              <label className="block text-sm font-bold text-gray-900">Location:</label>
              <div>{order.location}</div>
            </div>
            <div className="my-2"></div>


            <Link to={`/orders/worker/${order._id}`} className="mt-3 text-indigo-500 inline-flex items-center">View
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>)
      },
    },

  ];

  return (
    <section className="flex flex-col w-full h-full">
      <div className="flex w-full grow items-stretch">
        <div className="basis-3/12 hidden sm:flex flex-col p-6 pb-24 border-r sticky top-[4.5em] h-screen overflow-auto">
          <OrdersSideBar />
        </div>
        <div className="relative flex flex-col basis-9/12 grow w-full h-full">
          {orderId && order && (
            <div className="flex flex-col space-y-4">
              <div className="my-2"></div>
              <Stepper activeStep={order?.step + 1}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              <div className="my-4"></div>
              {order.provider && (
                <>
                  <label className="block mb-2 text-xl font-bold text-gray-900">Provider</label>
                  <div className="flex">{order.provider.email}</div>
                </>
              )}
              <div className="my-4"></div>
              <div className="p-4 bg-white flex items-center mx-auto border-b  mb-10 border-gray-200 rounded-lg sm:flex-row flex-col border">
                <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center flex-shrink-0 sm:self-start">
                  <img
                    src={`${service.imageSrc || "https://firebasestorage.googleapis.com/v0/b/thecaffeinecode.appspot.com/o/Tcc_img%2Flogo.png?alt=media&token=5e5738c4-8ffd-44f9-b47a-57d07e0b7939"}`} />
                </div>
                <div className="flex-grow sm:text-left  mt-6 sm:mt-0">
                  <h1 className="text-black text-2xl title-font font-bold mb-2">{service.name}</h1>
                  <p className="leading-relaxed text-base">{service.desciption}Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
                  <div className="py-4">
                    <div className=" inline-block mr-2" >
                      <div className="flex  pr-2 h-full items-center">
                        <svg className="text-yellow-500 w-6 h-6 mr-1" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <circle cx="12" cy="12" r="9" />
                          <path d="M9 12l2 2l4 -4" />
                        </svg>
                        <p className="title-font font-medium">Php</p>
                      </div>
                    </div>
                    <div className=" inline-block mr-2" >
                      <div className="flex  pr-2 h-full items-center">
                        <svg className="text-gray-500 w-6 h-6 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="15" y1="9" x2="9" y2="15" />
                          <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                        <p className="title-font font-medium">Java</p>
                      </div>
                    </div>
                  </div>

                  {/* info */}
                  <div className="flex flex-col w-full my-4">
                    <div className="">
                      <label className="block text-sm font-bold text-gray-900">Details</label>
                      <div>{order.description}</div>
                    </div>
                    <div className="my-2"></div>
                    {service.options?.map((item, index) => {
                      return (<div key={index}>
                        {(() => {
                          if (item.type == "input#text") {
                            return (
                              <div className="">
                                <label className="block text-sm font-bold text-gray-900">{index + 1 + ". " + item.title}</label>
                                <div>{order?.data[index]}</div>
                              </div>
                            )
                          }
                          if (item.type == "select") {
                            return (
                              <div className="">
                                <label className="block text-sm font-bold text-gray-900">{index + 1 + ". " + item.title}</label>
                                <div>{order?.data[index]}</div>
                              </div>
                            )
                          }
                        })()}
                        <div className="my-2"></div>
                      </div>)
                    })}

                    <div className="">
                      <label className="block text-sm font-bold text-gray-900">Time</label>
                      <div>{new Date(order.time).toLocaleString()}</div>
                    </div>
                    <div className="my-2"></div>
                  </div>

                  <div className="md:flex font-bold text-gray-800">
                    <div className="w-1/2">
                      <h2 className="text-gray-500">Title</h2>
                      <p >description</p>
                    </div>
                    <div className="w-1/2">
                      <h2 className="text-gray-500">Title</h2>
                      <p>description</p>
                    </div>
                  </div>
                  <a className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )
            ||
            allOrders?.length > 0 && (
              <div className="p-6 w-full">

                <div className="h-full w-full">
                  <DataGrid
                    getRowHeight={() => 'auto'}
                    columns={columns}
                    rows={allOrders.map((item, index) => ({ id: index, data: item }))}
                    initialState={{
                      pagination: { paginationModel: { pageSize: 5 } },
                    }}
                    pageSizeOptions={[5, 10, 50, 100]}
                    disableRowSelectionOnClick
                  />
                </div>

              </div>
            )}

        </div>
      </div>
    </section>
  );
};
