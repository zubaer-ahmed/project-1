import React from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import { Step, StepLabel, Stepper } from "@mui/material";

export default function Page() {
  const { user, setUser, fetchUser, logout, login: localStorageLogin } = useAuth();
  const navigate = useNavigate();
  const [tempUser, setTempUser] = React.useState({ mode: "phone" });
  async function handleSubmit(event) {
    event.preventDefault();
    clearErrors()
    await logout();
    let res = await (await fetch(
      import.meta.env.VITE_BASE_URL + "/api/users/register",
      {
        method: "POST",
        credentials: "include", // Required to allow setting of imcomming cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tempUser),
      }
    )).json();
    console.log("register", res);
    localStorageLogin(res);
    await fetchUser();
  }
  async function handleSubmit2(event) {
    event.preventDefault();
    clearErrors()
    let res = await (await fetch(
      import.meta.env.VITE_BASE_URL + "/api/users/verify",
      {
        method: "POST",
        credentials: "include", // Required to allow setting of imcomming cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tempUser),
      }
    )).json(); if (res.error) {
      return showErrorMessage(res?.error);
    }
    console.log("verify", res)
    await fetchUser();
  }
  async function handleSubmit3(event) {
    event.preventDefault();
    clearErrors()
    let res = await (await fetch(
      import.meta.env.VITE_BASE_URL + "/api/users/updateUser",
      {
        method: "POST",
        credentials: "include", // Required to allow setting of imcomming cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...tempUser, _id: user._id }),
      }
    )).json(); if (res.error) {
      return showErrorMessage(res?.error);
    }
    console.log("requestbody", { ...tempUser, _id: user._id })
    console.log("update", res)
    await fetchUser();

    onUserRegistered();
  }
  function onUserRegistered() {
    const previousUrl = localStorage.getItem('previousUrl') || null;
    localStorage.removeItem('previousUrl'); // Remove after use
    if (previousUrl) return history.push(previousUrl);
    navigate("/");
  }
  function showErrorMessage(msg) {
    document.querySelector("#signup-error").textContent = msg;
    document.querySelector("#signup-error").classList.remove("hidden");
  }
  function clearErrors() {
    document.querySelector("#signup-error").classList.add("hidden");
  }
  const steps = ['Fill in Details', 'Verify Contact', 'Start Using Services'];

  return (
    <>
      <div className="bg-white h-full">
        <div className="flex justify-center h-screen">
          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-3/6">
            <div className="flex-1">
              <div className="text-center">
                <div className="flex justify-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 21h17v-2H5V3H3v17a1 1 0 0 0 1 1z"></path><circle cx="10" cy="8" r="2"></circle><circle cx="18" cy="12" r="2"></circle><circle cx="11.5" cy="13.5" r="1.5"></circle><circle cx="16.5" cy="6.5" r="1.5"></circle></svg>
                </div>

                <p className="mt-3 text-dark-500">Sing up and connect with us</p>
              </div>
              <div className="mt-8" />
              <Stepper activeStep={user && (user.verificationStatus + 1) || 0} >
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
              <div
                id="signup-error"
                className="text-sm p-2 rounded bg-red-100 border my-4 text-red-500 text-center hidden"
              ></div>
              <div className="mt-8">

                {!user && (
                  <form>
                    {tempUser.mode == "email" && (
                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm text-gray-600 ">Email Address</label>
                        <input type="email" name="email" placeholder="Email Address" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                          value={tempUser.email || ""}
                          onChange={(event) => { setTempUser({ ...tempUser, email: event.target.value }) }}
                        />
                        <div onClick={() => setTempUser({ ...tempUser, mode: "phone" })} className="inline hover:underline text-blue-500 text-sm">Use Phone Number Instead</div>
                      </div>
                    ) || (
                        <div>
                          <label htmlFor="phone" className="block mb-2 text-sm text-gray-600 ">Phone Address</label>
                          <input type="tel" name="phone" placeholder="Phone Address" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={tempUser.phone || ""}
                            onChange={(event) => { setTempUser({ ...tempUser, phone: event.target.value }) }}
                          />
                          <div onClick={() => setTempUser({ ...tempUser, mode: "email" })} className="inline hover:underline text-blue-500 text-sm">Use Email Instead</div>
                        </div>
                      )}
                    <div className="mt-6">
                      <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Next
                      </button>
                    </div>
                  </form>
                )}
                {user && user.verificationStatus == 0 && (
                  <form>
                    {user?.phone && (
                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm text-gray-600 ">Enter Phone Verification Code</label>
                        <input type="number" placeholder="Enter Code" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                          value={tempUser.phoneVerificationCode || ""}
                          onChange={(event) => { setTempUser({ ...tempUser, phoneVerificationCode: event.target.value }) }}
                        />
                      </div>
                    )}
                    {user?.email && (
                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm text-gray-600 ">Enter Email Verification Code</label>
                        <input type="number" placeholder="Enter Code" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                          value={tempUser.emailVerificationCode || ""}
                          onChange={(event) => { setTempUser({ ...tempUser, emailVerificationCode: event.target.value }) }}
                        />
                      </div>
                    )}

                    <div className="mt-6">
                      <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                        type="submit"
                        onClick={handleSubmit2}
                      >
                        Next
                      </button>
                    </div>
                  </form>
                ) || user && user.verificationStatus == 1 && (<form>
                  <div>
                    <label className="block mb-2 text-sm text-gray-600 ">First Name</label>
                    <input type="text" placeholder="Enter First Name" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      value={tempUser.firstName || ""}
                      onChange={(event) => { setTempUser({ ...tempUser, firstName: event.target.value }) }}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-gray-600 ">Last Name</label>
                    <input type="text" placeholder="Enter Last Name" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      value={tempUser.lastName || ""}
                      onChange={(event) => { setTempUser({ ...tempUser, lastName: event.target.value }) }}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-gray-600 ">Password</label>
                    <input type="password" placeholder="********" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      value={tempUser.password || ""}
                      onChange={(event) => { setTempUser({ ...tempUser, password: event.target.value }) }}
                    />
                  </div>
                  <div className="mt-6">
                    <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                      type="submit"
                      onClick={handleSubmit3}
                    >
                      Finish
                    </button>
                    <div
                      onClick={onUserRegistered}
                      className="hover:underline text-blue-500 text-sm cursor-pointer text-center my-2">Skip</div>
                  </div>
                </form>)

                }


                <div className="mt-6 text-sm text-center text-gray-400">Already have an account? <Link to="/login"><div className="text-blue-500 focus:outline-none focus:underline hover:underline">Sign in</div></Link>.</div>
              </div>
            </div>
          </div>
          <div className="hidden bg-cover lg:block lg:w-3/6" style={{ "backgroundImage": "url(https://images.unsplash.com/photo-1607923287346-24af932a5f41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjY2fHx3b3JrZXJ8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=500&q=60)" }}>
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">Engineer Hut</h2>

                <p className="max-w-xl mt-3 text-gray-300">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                  autem ipsa, nulla laboriosam dolores, repellendus perferendis libero suscipit nam temporibus
                  molestiae
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
