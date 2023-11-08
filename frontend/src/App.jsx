import { useAuth } from "./Hooks/useAuth";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import { Suspense, lazy } from 'react';
import { Outlet } from "react-router-dom";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
import Login from "./Pages/Login";

const Search = lazy(() => import("./Pages/Search"));
const Category = lazy(() => import("./Pages/Category"));
const AdminPanel = lazy(() => import("./Pages/AdminPanel"));
const Chats = lazy(() => import("./Pages/Chats"));
const ChatById = lazy(() => import("./Pages/ChatById"));
const Notifications = lazy(() => import("./Pages/Notifications"));
const CustomerHome = lazy(() => import("./Pages/CustomerHome"));
const RegisterWorker = lazy(() => import("./Pages/RegisterWorker"));
const Orders = lazy(() => import("./Pages/Orders"));
const CustomerOrders = lazy(() => import("./Pages/Customer/Orders"));
const WorkerJobs = lazy(() => import("./Pages/WorkerJobs"));
const Settings = lazy(() => import("./Pages/Settings"));
const Services = lazy(() => import("./Pages/AdminPanel/Services"));
const AdminPanelJobs = lazy(() => import("./Pages/AdminPanel/Jobs"));
const Users = lazy(() => import("./Pages/AdminPanel/Users"));
const Reviews = lazy(() => import("./Pages/AdminPanel/Comments/Reviews"));
const Suggestions = lazy(() => import("./Pages/AdminPanel/Comments/Suggestions"));
const Questions = lazy(() => import("./Pages/AdminPanel/Comments/Questions"));
const CommentById = lazy(() => import("./Pages/AdminPanel/Comments/CommentById"));
const ServiceById = lazy(() => import("./Pages/ServiceById"));
const Home = lazy(() => import("./Pages/Home"));
const LandingPage = lazy(() => import("./Pages/LandingPage"));
const NotFound = lazy(() => import("./Pages/NotFound"));
const TopNav = lazy(() => import("./Components/Utils/TopBar"));
const Register = lazy(() => import("./Pages/Register"));
const Logout = lazy(() => import("./Pages/Logout"));
const Footer = lazy(() => import("./Components/Footer"));
const FAQ = lazy(() => import("./Pages/Guest/FAQ"));
const Contact = lazy(() => import("./Pages/Guest/Contact"));
const Blog = lazy(() => import("./Pages/Guest/Blog"));
const Details = lazy(() => import("./Pages/Guest/Blog/Details"));
const Profile = lazy(() => import('./Pages/Profile'));
const Jobs = lazy(() => import('./Pages/Jobs'));

const CustomerProfile = lazy(() => import('./Pages/Customer/Profile'));
const CustomerSettings = lazy(() => import('./Pages/Customer/Settings'));
const CustomerHistory = lazy(() => import('./Pages/Customer/History'));

import './i18n';
import { useTranslation } from 'react-i18next';
import { useGlobalState } from "./Hooks/useGlobalState";

import Loading from "./Components/Loading";
import Maintenance from './Pages/Maintenance/index';
import TAP from './Pages/Guest/Terms&Privacy';
import Dashboard from './Pages/AdminPanel/Dashboard'


function App() {

  const { globalState, setGlobalState } = useGlobalState();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = React.useState("1");
  const { user, setUser, fetchUser } = useAuth();
  React.useEffect(() => {
    setGlobalState(prev => ({ ...prev, socket: null }));
    (async () => {
      if (user) await fetchUser();
    })();

  }, []);
  return (
    <div className="relative flex flex-col w-full h-full">
      <div className={`text-sm w-full ${globalState.socket?.id ? "bg-green-500" : "bg-red-500"} text-white`}>
        {globalState.socket?.id || ""}
      </div>
      <TopNav />
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute redirect={<LandingPage />}>
                <Home className="flex flex-col  w-full h-full overflow-auto" />
              </ProtectedRoute>
            }
          />
          <Route path="registerWorker" element={
            <ProtectedRoute redirect="/login">
              <RegisterWorker />
            </ProtectedRoute>
          } />
          <Route path="chats" element={<Chats />}>
            <Route path=":slug" element={
              <Suspense fallback={<Loading />}>
                <ChatById />
              </Suspense>
            } />
          </Route>
          <Route path="search" element={<Search />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="category/:slug" element={<Category />} />
          <Route path="service/:slug" element={<ServiceById />} />
          <Route path="orders" element={
            <div className="flex flex-col w-full h-full">
              <Outlet />
            </div>
          } >
            <Route path="user" element={<CustomerOrders />} />
            <Route path="user/:slug" element={<CustomerOrders />} />
            <Route path="worker" element={<WorkerJobs />} />
            <Route path="worker/:slug" element={<WorkerJobs />} />
          </Route>
          <Route path="jobs" element={<Jobs />} />
          <Route path="jobs/:slug" element={<Jobs />} />
          <Route
            path="settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          >

            <Route path="profile" element={
              <Profile />
            } />

            <Route path="*" element={<NotFound />} />
          </Route>

          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="customer/profile" element={<CustomerProfile />} />
          <Route path="customer/settings" element={<CustomerSettings />} />
          <Route path="customer/history" element={<CustomerHistory />} />
          
          <Route path="login" element={<Login />} />
          <Route path="FAQ" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blogs" element={<Blog />} />
          <Route path="blogs/details" element={<Details />} />
          <Route path="register" element={<Register />} />
          <Route path="admin" element={<AdminPanel />}>
            <Route path="" element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="users" element={<Users />} />
            <Route path="services" element={<Services />} />
            <Route path="jobs" element={<AdminPanelJobs />} />
            <Route path="comments/:slug" element={<CommentById />} />
            <Route
              path="comments"
              element={
                <div className="relative flex flex-col w-full h-full overflow-auto">
                  <Tabs
                    variant="fullWidth"
                    value={tabValue}
                    onChange={(event, newValue) => {
                      setTabValue(newValue);
                      navigate(
                        `/admin/comments/${newValue == 1
                          ? "reviews"
                          : newValue == 2
                          ? "suggestions"
                          : "questions"
                        }`
                        );
                      }}
                    aria-label="icon label tabs example"
                  >
                    <Tab iconPosition="start" value="1" label="Reviews" />
                    <Tab iconPosition="start" value="2" label="Suggestions" />
                    <Tab iconPosition="start" value="3" label="Questions" />
                  </Tabs>{" "}
                  <Outlet />
                </div>
              }
            >
              <Route path="" element={<Reviews />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="suggestions" element={<Suggestions />} />
              <Route path="questions" element={<Questions />} />
            </Route>
          </Route>
          <Route path="logout" element={<Logout />} />
          <Route path="careers" element={<Maintenance />} />
          <Route path="privacy-policy" element={<TAP />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
              
    </div>
  );
}

export default App;
