import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
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
      let allOrdersList = await (await fetch(import.meta.env.VITE_BASE_URL + `/api/orders/getOrders`, {
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


            <Link to={`/orders/user/${order._id}`} className="mt-3 text-indigo-500 inline-flex items-center">View
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
    <section className="flex flex-col w-full h-full border-8">
      <div className="flex w-full grow items-stretch relative border-8">

        <div className="relative flex flex-col basis-9/12 grow w-full h-full border-8">
          dsd
          sdadad
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
                        <p className="title-font font-medium">Item1</p>
                      </div>
                    </div>
                    <div className=" inline-block mr-2" >
                      <div className="flex  pr-2 h-full items-center">
                        <svg className="text-gray-500 w-6 h-6 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="15" y1="9" x2="9" y2="15" />
                          <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                        <p className="title-font font-medium">Item2</p>
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
            || true &&
            (
              <div className="flex flex-col p-4 ">
                hsddh

              </div>
            )}

        </div>
      </div>
    </section>
  );
};

const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .ant-empty-img-1': {
    fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
  },
  '& .ant-empty-img-2': {
    fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
  },
  '& .ant-empty-img-3': {
    fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
  },
  '& .ant-empty-img-4': {
    fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
  },
  '& .ant-empty-img-5': {
    fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
    fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No Rows</Box>
    </StyledGridOverlay>
  );
}
