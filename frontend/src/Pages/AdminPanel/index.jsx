import Sidebar from "../../Components/SideBar";
import { Outlet } from "react-router-dom";

export default () => {
  return (
    <div className="relative flex items-stretch w-full h-full">
      <Sidebar />
      <Outlet />
    </div>
  );
};
