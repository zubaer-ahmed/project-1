import Chip from "@mui/material/Chip";
import Icon from "@mui/material/Icon";
import * as React from "react";
import { useAuth } from "../../Hooks/useAuth";
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import servicesList from '../../Data/services';

export default function Page() {
  const [open, setOpen] = React.useState(false);
  const [services, setServices] = React.useState([]);
  const { user, setUser } = useAuth();
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = (chipToDelete) => () => {
    setUser({
      ...user,
      roles: user.roles.filter((chip) => chip != chipToDelete),
    });
  };

  const roles = ["customer", "worker", "admin"];

  async function updateProfile() {
    let res = await (
      await fetch(import.meta.env.VITE_BASE_URL + "/api/users/updateUser", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
    ).json();
    console.log(res);
  }
  return (
    <div className="flex flex-col items-center w-full h-full overflow-auto py-8">
      <div className="flex">
        <div className="basis-4/12">
          <div className="flex flex-col items-center whitespace-nowrap h-screen">
            No Notifications
          </div>
        </div>
        <div className="basis-8/12"></div>
      </div>
    </div>
  );
};
