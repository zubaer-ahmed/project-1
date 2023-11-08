import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import * as React from "react";
import { useParams } from "react-router-dom";
import { useLocalStorage } from "../../Hooks/useLocalStorage";
import { Select, MenuItem, FormControl, FormHelperText, TextField, Button, InputBase, IconButton, Divider, Container, Modal } from "@mui/material";
import { DatePicker, LocalizationProvider, StaticDatePicker, StaticTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, CircularProgress, Icon } from "@mui/material";
import { useAuth } from "@/Hooks/useAuth";
import LoginOverlay from "@/Components/LoginOverlay";
import { useGlobalState } from '../../Hooks/useGlobalState';
import { useHelpers } from '../../Hooks/useHelpers';

function ServiceById() {
  // Access the "slug" parameter from the URL
  const { user, setUser } = useAuth();
  const { globalState, setGlobalState } = useGlobalState();
  const { slug: serviceId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({});
  const [time, setTime] = React.useState(dayjs(new Date()));
  const [description, setDescription] = React.useState("");
  const [userLocation, setUserLocation] = React.useState(user?.location);
  const { getLocation } = useHelpers();
  const [open, setOpen] = React.useState(false);
  const [services, setServices] = React.useState([]);
  const [service, setService] = React.useState(services.find(item => item.id == serviceId));

  React.useEffect(() => {
    (async () => {
      setServices(await (await fetch(import.meta.env.VITE_BASE_URL + `/api/services/getServices`)).json());
      setUserLocation("Lat: " + (await getLocation()).latitude.toFixed(2) + " Long: " + (await getLocation()).longitude.toFixed(2))
    })();
  }, [])
  React.useEffect(() => {
    setService(services.find(item => item.id == serviceId));
  }, [services])
  async function submitForm() {
    try {
      console.log("data", JSON.stringify({ serviceId: service.id, data, description, time }));
      if (!user) {
        setOpen(true);
        return;
      }
      let res = await (await fetch(import.meta.env.VITE_BASE_URL + "/api/orders/postOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ serviceId: service.id, service: service._id, data, description, time, location: userLocation })
      })).json();
      console.log("result", res)
      return res._id;
    }
    catch (e) {
      console.log(e);
      return null;
    }
  }


  return (service &&
    <div className="flex flex-col w-full h-full p-4 max-w-xl self-center py-8 my-8">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded shadow-md w-full max-w-sm">
          <div className="p-4">
            You need to login/register first
          </div>
          <div className="divider w-full bg-zinc-600/25 h-[1px]"></div>
          <div className="p-4 flex gap-2">
            <div onClick={() => {
              localStorage.setItem('previousUrl', window.location.pathname);
              navigate("/login");
            }} className='material-button'>Okay</div>
            <div className='material-button'>Cancel</div>
          </div>
        </div>
      </Modal>
      <img src={service.imageSrc} className=" w-32 h-32 self-center" />
      <div className="my-2"></div>
      <div className="text-center font-bold text-blue-500 title text-4xl">{service.name}</div>
      <div className="my-2"></div>
      <div className="">
        <label className="block mb-2 text-sm font-bold text-gray-900">Describe Your Issue</label>
        <TextField multiline rows={2} fullWidth variant="outlined" value={description} onChange={(event) => setDescription(event.target.value)} />
        <div className="my-2"></div>
      </div>
      {service.options?.map((item, index) => {
        return (<div key={index}>
          {(() => {
            if (item.type == "input#text") {
              return (
                <div className="">
                  <label className="block mb-2 text-sm font-bold text-gray-900">{index + 1 + ". " + item.title}</label>
                  <TextField multiline rows={2} fullWidth variant="outlined" value={data[index] || ""} onChange={(event) => setData({ ...data, [index]: event.target.value })} />
                </div>
              )
            }
            if (item.type == "select") {
              return (
                <div className="">
                  <label className="block mb-2 text-sm font-bold text-gray-900">{index + 1 + ". " + item.title}</label>
                  <Select fullWidth displayEmpty inputProps={{ 'aria-label': 'Without label' }}
                    value={data[index] || ""} onChange={(event) => setData({ ...data, [index]: event.target.value })}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {item.options.map((option, index) => (
                      <MenuItem key={index} value={option.value}>{option.text}</MenuItem>
                    ))}
                  </Select>
                </div>
              )
            }
          })()}
          <div className="my-2"></div>
        </div>)
      })}
      <label className="block mb-2 text-sm font-bold text-gray-900">Your Address</label>
      <div className="flex p-2 rounded border border-gray-300 hover:border-black">
        <InputBase
          sx={{ ml: 1, flexGrow: 1 }}
          placeholder="Search Google Maps"
          inputProps={{ 'aria-label': 'search google maps' }}
          onChange={(event) => { setUserLocation(event.target.value) }}
          value={userLocation || ""}
        ></InputBase>
        <IconButton>
          <Icon>search</Icon>
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton onClick={async () => { setUserLocation("Lat: " + (await getLocation()).latitude.toFixed(2) + " Long: " + (await getLocation()).longitude.toFixed(2)) }}>
          <Icon>my_location</Icon>
        </IconButton>
      </div>
      <div className="my-2"></div>
      <label className="block mb-2 text-sm font-bold text-gray-900">Appointment Time</label>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker orientation="landscape" defaultValue={time} />
      </LocalizationProvider>
      <div className="my-2"></div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
          seconds: renderTimeViewClock,
        }}
          orientation="landscape" defaultValue={time} />
      </LocalizationProvider>
      <div className="my-2"></div>
      <div className="">
        <label className="block mb-2 text-sm font-bold text-gray-900">Billing Account</label>
        <Select fullWidth displayEmpty inputProps={{ 'aria-label': 'Without label' }}
          value={""} onChange={(event) => { }}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {user?.paymentOptions?.map((option, index) => (
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
      <div className="relative flex flex-col w-full my-2">
        <Button
          variant="contained"
          disabled={loading}
          onClick={async (e) => {
            e.preventDefault();
            setLoading(true);
            const orderId = await submitForm();
            setLoading(false);
            if (orderId)
              navigate(`/orders/user/${orderId}`);
          }}>
          Order Service
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </div>
    </div>
  );
}

export default ServiceById;
