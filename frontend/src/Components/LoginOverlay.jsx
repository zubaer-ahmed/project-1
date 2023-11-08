import React from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "@/Hooks/useAuth";
import { useLocalStorage } from "@/Hooks/useLocalStorage";
import { useGlobalState } from '@/Hooks/useGlobalState';
import { useOutsideClick } from "../Hooks/useClickOutside";


const Component = (props) => {
    const { globalState, setGlobalState } = useGlobalState();

    const { login: localStorageLogin } = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = React.useState({
        email: "admin",
        password: "",
    });
    const [currentPage, setCurrentView] = React.useState("login");
    async function handleLoginSubmit(event) {
        event.preventDefault();
        console.log(user);
        clearErrors();
        if (user.email != "admin" && (!user.email || !user.password))
            return showErrorMessage("Please fill in all the fields");

        let res = await fetch(import.meta.env.VITE_BASE_URL + "/api/users/login", {
            method: "POST",
            credentials: "include", // Required to allow setting of cookies
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        let responseJSON = await res.json();
        console.log("response", responseJSON);
        if (res.status != 200) {
            return showErrorMessage(responseJSON?.error);
        }
        localStorage.jwt = responseJSON.jwt;
        localStorageLogin(responseJSON);
        await fetchUser(); // load extra details of users like, order history
        setGlobalState(() => ({ ...globalState, showLogin: false }))
    }
    async function handleRegisterSubmit(event) {
        event.preventDefault();
        console.log(user);
        clearErrors();
        if (!user.email || !user.password)
            return showErrorMessage("Please fill in all the fields");

        if (user.password != user.passwordConfirmation)
            return showErrorMessage("Password confirmation doesn't match");

        let res = await fetch(
            import.meta.env.VITE_BASE_URL + "/api/users/register",
            {
                method: "POST",
                credentials: "include", // Required to allow setting of imcomming cookies
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            }
        );
        let responseJSON = await res.json();
        console.log("response", responseJSON);
        if (res.status != 200) {
            return showErrorMessage(responseJSON?.error);
        }
        localStorage.jwt = responseJSON.jwt;
        await fetchUser(); // load extra details of users like, order history

        navigate("/");
    }

    function showErrorMessage(msg) {
        document.querySelector("#login-error").textContent = msg;
        document.querySelector("#login-error").classList.remove("hidden");
    }
    function clearErrors() {
        document.querySelector("#login-error").classList.add("hidden");
    }

    const ref = useOutsideClick(() => { props.setOpen(false) });


    return (
        <div className="fixed top-0 left-0 w-screen h-screen  flex flex-col items-center px-4 py-14 overflow-auto">
            <div ref={ref} className="login-container flex  w-full max-w-sm mx-auto ">
                {currentPage == "login" && (
                    <div className="flex flex-col px-6 bg-white shadow-xl p-4 rounded w-full  justify-self-center">
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
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm text-gray-600 "
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="engineerhut@example.com"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                        value={user.email}
                                        onChange={(event) => {
                                            setUser({ ...user, email: event.target.value });
                                        }}
                                    />
                                </div>

                                <div className="mt-6">
                                    <div className="flex justify-between mb-2">
                                        <label
                                            htmlFor="password"
                                            className="text-sm text-gray-600"
                                        >
                                            Password
                                        </label>
                                        <a
                                            href="#"
                                            className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                                        >
                                            Forgot password?
                                        </a>
                                    </div>

                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Your Password"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                        value={user.password}
                                        onChange={(event) => {
                                            setUser({ ...user, password: event.target.value });
                                        }}
                                    />
                                </div>

                                <div className="mt-6">
                                    <button
                                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                                        onClick={handleLoginSubmit}
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </form>

                            <p className="mt-6 text-sm text-center text-gray-400">
                                Don&#x27;t have an account yet?{" "}
                                <a
                                    onClick={() => setTimeout(() => setCurrentView("signup"))}
                                    className="text-blue-500 focus:outline-none focus:underline hover:underline"
                                >
                                    Sign up
                                </a>
                                .
                            </p>
                        </div>
                    </div>)
                    || (
                        <div className="flex flex-col px-6 bg-white shadow-xl p-4 rounded w-full ">
                            <div className="text-center">
                                <div className="flex justify-center mx-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 21h17v-2H5V3H3v17a1 1 0 0 0 1 1z"></path><circle cx="10" cy="8" r="2"></circle><circle cx="18" cy="12" r="2"></circle><circle cx="11.5" cy="13.5" r="1.5"></circle><circle cx="16.5" cy="6.5" r="1.5"></circle></svg>
                                </div>

                                <p className="mt-3 text-dark-500">Sing up and connect with us</p>
                            </div>

                            <div className="mt-8">
                                <form>
                                    <div>
                                        <label htmlFor="firstName" className="block mb-2 text-sm text-gray-600 ">First name</label>
                                        <input type="text" name="firstName" id="firstName" placeholder="John" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                            value={user.firstName}
                                            onChange={(event) => {
                                                setUser({ ...user, firstName: event.target.value });
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block mb-2 text-sm text-gray-600 ">First name</label>
                                        <input type="text" name="lastName" id="lastName" placeholder="Doe" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                            value={user.lastName}
                                            onChange={(event) => {
                                                setUser({ ...user, lastName: event.target.value });
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm text-gray-600 ">Email Address</label>
                                        <input type="email" name="email" id="email" placeholder="engineerhut@example.com" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                            value={user.email}
                                            onChange={(event) => {
                                                setUser({ ...user, email: event.target.value });
                                            }}
                                        />
                                    </div>

                                    <div className="mt-6">
                                        <div className="flex justify-between mb-2">
                                            <label htmlFor="password" className="text-sm text-gray-600">Password</label>
                                        </div>

                                        <input
                                            type="password"
                                            name="password"
                                            id="password" placeholder="**********" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                            value={user.password}
                                            onChange={(event) => {
                                                setUser({ ...user, password: event.target.value });
                                            }}
                                        />
                                    </div>

                                    <div className="mt-6">
                                        <div className="flex justify-between mb-2">
                                            <label htmlFor="password" className="text-sm text-gray-600">Confirm Password</label>
                                        </div>

                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            id="confirmPassword" placeholder="**********" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                            value={user.passwordConfirmation}
                                            onChange={(event) => {
                                                setUser({ ...user, passwordConfirmation: event.target.value });
                                            }}
                                        />
                                    </div>

                                    <div className="mt-6">
                                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                                            type="submit"
                                            onClick={handleRegisterSubmit}
                                        >
                                            Create Account
                                        </button>
                                    </div>

                                </form>

                                <p className="mt-6 text-sm text-center text-gray-400">Already have an account? <a className="text-blue-500 focus:outline-none focus:underline hover:underline"
                                    onClick={() => setTimeout(() => setCurrentView("login"))}
                                >Sign in</a>.</p>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default Component;
