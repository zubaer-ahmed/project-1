import { Button, CircularProgress, Icon, IconButton, MenuItem, Select, Step, StepLabel, Stepper, TextField } from "@mui/material";
import React from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import useFileUpload from "../../Hooks/useFileUpload";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useAuth } from "../../Hooks/useAuth";

// MUI ICONS
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

export default function Page() {

  const navigate = useNavigate();
  const [tempUser, setTempUser] = React.useState({});
  const [files, setFiles] = React.useState([]);
  const [selfie, setSelfie] = React.useState(null);
  const inputRef = React.useRef();
  const [loading, setLoading] = React.useState(false);
  const { user, setUser, fetchUser } = useAuth();

  if (!user) {
    navigate("/login");
    return;
  }
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`files`, file); // these fields will be parsed into req.files
      });
      formData.append(`selfie`, tempUser.selfie); // these fields will be parsed into req.files
      for (let key in tempUser) {
        formData.append(key, tempUser[key]); // these fields will be parsed as request body
      }
      let res = await (await fetch(import.meta.env.VITE_BASE_URL + "/api/users/registerWorker", {
        method: "POST",
        credentials: "include",
        body: formData
      })).text();
      console.log("result", res);
      await fetchUser();
    } catch (e) { console.log(e) }
    setLoading(false);

  }
  async function revokeApplication(event) {
    event.preventDefault();
    setLoading(true);
    let res = await (await fetch(import.meta.env.VITE_BASE_URL + "/api/users/revokeWorkerApplication", {
      method: "GET",
      credentials: "include",
    })).text();
    console.log("result", res);
    await fetchUser();
    setLoading(false);
  }

  // const [file, error, handleFileChange] = useFileUpload(null);
  const docTypes = ["NID", "Passport", "Driving License", "Voter ID", "Birth Certificate", "Other"];
  const steps = ['Fill in Details', 'Review in Progress', 'Verified'];

  return (
    <div className="flex flex-col bg-white h-full w-full items-center py-12">
      <div className="flex flex-col w-full max-w-lg p-4">
        <Stepper activeStep={user.documentsVerificationStatus + 1} >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {/** Document Details Section */}
        {user.documentsVerificationStatus == 0 && (
          <div className="flex flex-col mt-8">
              <label htmlFor="file" className="block text-sm font-bold text-gray-500 mb-1">Type of Document</label>
              <Select fullWidth displayEmpty inputProps={{ 'aria-label': 'Without label' }}
                value={tempUser.documentType || ""} onChange={(event) => setTempUser({ ...tempUser, documentType: event.target.value })}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {docTypes.map((option, index) => (
                  <MenuItem key={index} value={option}>{option}</MenuItem>
                ))}
              </Select>
            
            <input type='file' className="hidden" multiple
              onChange={(evt) => { window.uploadAwaiter(evt.target.files) }}
              ref={inputRef} />

            {/** Document Upload Section */}
            <label htmlFor="file" className="block text-sm font-bold text-gray-500 mt-4">Documents</label>
            <div className="flex flex-wrap justify-center">
              {(
                files.length > 0 && files.map((file, index) => (
                  <div className="flex flex-col" key={index}>
                    <div className="self-center w-60 h-40 p-1">
                      <img id="imagePreview" className="w-full h-full object-contain border" src={file ? URL.createObjectURL(file) : "/noimage.svg"} alt="Image Preview" />
                    </div>
                    <div className="flex justify-center h-12">
                      <DeleteForeverIcon className="text-red" 
                      onClick={
                        () => { setFiles(files.filter((f) => f !== file)); }
                      }/>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="flex flex-col mb-2">
              <div className="flex flex-col items-center w-full max-w-lg p-5 mx-auto my-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer rounded-xl"
                onClick={async () => {
                  inputRef.current?.click(); setFiles([...files,
                  ...(await new Promise(resolve => { window.uploadAwaiter = resolve; }))])
                }}>
                <UploadFileIcon  className="text-blue"/>
                <h2 className="mt-1 font-medium tracking-wide text-gray-700">Select File</h2>
                <p className="mt-2 text-xs tracking-wide text-gray-500">Upload or darg & drop your file</p>
              </div>
            </div>



            {/** Document Details Section */}
            <div>
              <label htmlFor="file" className="block text-sm font-bold text-gray-500 mb-1">Name on Document</label>
              <TextField fullWidth variant="outlined" value={tempUser.name} onChange={(event) => setTempUser({ ...tempUser, name: event.target.value })} />
              <div className="my-2"></div>
            </div>


            {/** Date of Birth Section */}
            <div className="flex flex-col my-2">
              <label htmlFor="file" className="block text-sm font-bold text-gray-500 mb-1">Date of Birth</label>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker orientation="landscape" defaultValue={tempUser.dateOfBirth || dayjs('1995-01-01')}  slots={{ openPickerIcon: CalendarMonthIcon }}/>
              </LocalizationProvider>
            </div>
              
            
            {/** Selfie Section */}
            <div className="flex flex-col my-2">
            <label htmlFor="file" className="block text-sm font-bold text-gray-500">Selfie</label>
              {
                selfie && (
                  <>
                    <div className="self-center w-64 h-40 my-2">
                      <img id="imagePreview" className="w-full h-full object-contain border" src={selfie ? URL.createObjectURL(selfie) : "/noimage.svg"} alt="Image Preview" />
                    </div>
                    <div className="flex justify-center p-2">
                      <DeleteForeverIcon className="text-red" onClick={() => setSelfie(null)}/>
                    </div>
                  </>
                )
              }

              {!selfie && (
                <div className="flex flex-col items-center w-full max-w-lg p-5 mx-auto my-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer rounded-xl"
                  onClick={async () => {
                    inputRef.current?.click(); setSelfie((await new Promise(resolve => { window.uploadAwaiter = resolve; }))[0])
                  }}>            
                  <UploadFileIcon  className="text-blue"/>
                  <h2 className="mt-1 font-medium tracking-wide text-gray-700" >Upload Photo</h2>
                  <p className="mt-2 text-xs tracking-wide text-gray-500">Upload or darg & drop your file SVG, PNG, JPG or GIF. </p>
                </div>
              )}
            </div>


            <div className="relative flex flex-col w-full mt-2">
            <button className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue rounded-lg hover:bg-blue-hover focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                disabled={loading}
                onClick={handleSubmit}>
                  Submit
            </button>
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
        )
          || user.documentsVerificationStatus == 1 &&
          (
            
            <div className="flex text-center sm:block sm:p-0">

            <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                    <div className="flex items-center justify-center">
                        <PublishedWithChangesIcon className="text-blue" size={48}/>
                    </div>

                    <div className="mt-2 text-center">
                        <h3 className="text-4xl font-medium leading-6 text-gray-800 capitalize my-4">Under Process</h3>
                        <p className="mt-2 text-lg text-gray-500">
                          Your Application is under review. You will be notified through email once it is approved by the authority.
                        </p>
                    </div>
                </div>

                <div className="mt-5 sm:flex sm:justify-between sm:items-center">
                    <a href="#" className="text-sm text-blue-500 hover:underline">Learn more</a>

                    <div className="sm:flex sm:justify-between">
                    <button className="px-6 py-2 mt-4 md:mt-none lg:mt-0 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue rounded-lg hover:bg-blue-hover focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                      disabled={loading}
                      onClick={revokeApplication}>
                        Revoke Application
                    </button>
                      {loading && (
                      <CircularProgress
                        size={24}
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          marginTop: '-12px',
                          marginLeft: '-12px',
                          color: 'black'
                        }}
                      />
                    )}
                    </div>
                </div>
            </div>
        </div> 
          )}
      </div>
    </div >
  );
};
