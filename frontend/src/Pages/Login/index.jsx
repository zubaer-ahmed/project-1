import React from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";

export default () => {
  const { fetchUser, login: localStorageLogin } = useAuth();

  const navigate = useNavigate();
  const [tempUser, setTempUser] = React.useState({
    loginMode: "password",
    mode: "phone",
    email: "admin",
    password: "",
  });
  async function handleSubmit(event) {
    event.preventDefault();
    console.log(tempUser);
    clearErrors()
    let res = await fetch(import.meta.env.VITE_BASE_URL + "/api/users/login", {
      method: "POST",
      credentials: "include", // Required to allow setting of cookies
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tempUser),
    });
    let responseJSON = await res.json();
    console.log("response", responseJSON);
    if (res.status != 200) {
      return showErrorMessage(responseJSON?.error);
    }
    localStorage.jwt = responseJSON.jwt;
    await fetchUser(); // load extra details of users like, order history

    const previousUrl = localStorage.getItem('previousUrl') || null;
    localStorage.removeItem('previousUrl'); // Remove after use
    if (previousUrl) return navigate(previousUrl);
    navigate("/");
  }
  function showErrorMessage(msg) {
    document.querySelector("#login-error").textContent = msg;
    document.querySelector("#login-error").classList.remove("hidden");
  }
  function clearErrors() {
    document.querySelector("#login-error").classList.add("hidden");
  }

  function validEmail(email) {
    var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    return emailRegex.test(email);
  }
  return (
    <>
      <div className="bg-white h-full">
        <div className="flex justify-center h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-3/6"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHdvcmtlcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1470&q=80)",
            }}
          >
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Engineer Hut
                </h2>

                <p className="max-w-xl mt-3 text-gray-300">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                  autem ipsa, nulla laboriosam dolores, repellendus perferendis
                  libero suscipit nam temporibus molestiae
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-3/6">
            <div className="flex-1">
              <div className="text-center">
                <div className="flex justify-center mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 21h17v-2H5V3H3v17a1 1 0 0 0 1 1z"></path>
                    <circle cx="10" cy="8" r="2"></circle>
                    <circle cx="18" cy="12" r="2"></circle>
                    <circle cx="11.5" cy="13.5" r="1.5"></circle>
                    <circle cx="16.5" cy="6.5" r="1.5"></circle>
                  </svg>
                </div>

                <p className="mt-3 text-dark-500">
                  Sign in to access your account
                </p>
              </div>
              <div
                id="login-error"
                className="text-sm p-2 rounded bg-red-100 border my-4 text-red-500 text-center hidden"
              ></div>
              <div className="mt-8">
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

                  {tempUser.loginMode == "password" && (
                    <div className="mt-6">
                      <div className="flex justify-between">
                        <label htmlFor="password" className="text-sm text-gray-600">Password</label>
                        <a href="#" className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot password?</a>
                      </div>
                      <input
                        type="password" name="password" id="password" placeholder="Your Password"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={tempUser.password}
                        onChange={(event) => {
                          setTempUser({ ...tempUser, password: event.target.value });
                        }}
                      />
                      <a onClick={async () => {
                        let res = await (await fetch(import.meta.env.VITE_BASE_URL + `/api/users/sendLoginOTP?email=${tempUser.email}&phone=${tempUser.phone}`)).json();
                        if (res.error)
                          return showErrorMessage(res.error);
                        console.log("sendLoginOTP", res);
                        setTempUser({ ...tempUser, loginMode: "otp" });
                      }}
                        className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                      >Use OTP to login</a>
                    </div>
                  ) || (
                      <div className="mt-6">
                        <label htmlFor="password" className="text-sm text-gray-600">OTP Code</label>
                        <input
                          type="text" name="otp" id="text" placeholder="OTP Code"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                          value={tempUser.loginOTP || ""}
                          onChange={(event) => {
                            setTempUser({ ...tempUser, loginOTP: event.target.value });
                          }}
                        />
                        <div className="flex justify-between">
                          <a onClick={() => setTempUser({ ...tempUser, loginMode: "password" })}
                            className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                          >Use Password</a>
                          <a onClick={async () => {
                            let res = await (await fetch(import.meta.env.VITE_BASE_URL + `/api/users/sendLoginOTP?email=${tempUser.email}&phone=${tempUser.phone}`)).json();
                            if (res.error)
                              return showErrorMessage(res.error);
                            console.log("sendLoginOTP", res.error);
                            setTempUser({ ...tempUser, loginMode: "otp" });
                          }} className="todo text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Sent to {tempUser.mode == "email" ? tempUser.email : tempUser.phone}. Resend? (32 sec)</a>
                        </div>
                      </div>
                    )}
                  <div className="mt-6">
                    <button
                      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                      onClick={handleSubmit}
                    >
                      Sign in
                    </button>
                  </div>
                </form>

                <p className="mt-6 text-sm text-center text-gray-400">
                  Don&#x27;t have an account yet?{" "}
                  <Link
                    to="/register"
                    className="text-blue-500 focus:outline-none focus:underline hover:underline"
                  >
                    Sign up
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div >
      </div >
    </>
  );
};
