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
import Loading from "../../Components/Loading";

export default function Page() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
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
    setLoading(true);
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
    setLoading(false);
    console.log(res);
  }

  // TODO: fix update call
  return (
    <div className="flex flex-col items-center w-full h-full overflow-auto py-8">
      <div className="text-3xl font-bold my-4">
        {(user?.roles.length > 0 &&
          user.roles[0].replace(/^\w/, (c) => c.toUpperCase())) ||
          "User"}{" "}
        Profile
      </div>
      <div className="px-4 text-gray-600 md:px-8">

        <div className="relative w-24 h-24 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <svg
            className="absolute w-12 h-12 text-gray-400 left-6 top-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
          </svg>
        </div>
        <div className="text-gray-700  mt-4 ">
          <div className="flex flex-col">
            <span className="">
              <a
                href="#"
                className="text-2xl text-indigo-600 hover:text-indigo-500"
              >
                {user.firstName + " " + user.lastName}
              </a>
              <div className="flex text-sm items-center">
                <Icon fontSize="inherit">place</Icon>
                <div>{user.country || "USA"}</div>
              </div>
            </span>
          </div>
        </div>
        <div className="mt-8 max-w-lg mx-auto">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div className="font-medium">Roles</div>
            <div className="flex space-x-2">
              {(user.roles &&
                user.roles.map((item, index) => (
                  <Chip
                    key={index}
                    label={item}
                    onClick={handleClick}
                    onDelete={handleDelete(item)}
                  />
                ))) || (
                  <Chip
                    label="Default"
                    onClick={handleClick}
                    onDelete={handleDelete(item)}
                  />
                )}
            </div>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Roles</InputLabel>
              <Select
                className="w-full"
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Roles"
                multiple
                renderValue={(selected) => selected.join(", ")}
                value={user.roles}
                onChange={({ target: { value } }) => {
                  setUser({
                    ...user,
                    roles: value,
                  });
                }}
              >
                {roles &&
                  roles.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      <Checkbox checked={user.roles.indexOf(item) > -1} />
                      <ListItemText primary={item} />
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <div>
              <label className="font-medium">Title</label>
              <input
                type="text"
                placeholder="Professional Totle ..."
                value={user.title || ""}
                onChange={(e) => {
                  setUser({ ...user, title: e.target.value });
                }}
                className="w-full mt-2 pl-[1.5rem] pr-3 py-2 text-gray-700 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Bio</label>
              <textarea
                rows={3}
                type="text"
                placeholder="Bio ..."
                value={user.bio || ""}
                onChange={(e) => {
                  setUser({ ...user, title: e.target.value });
                }}
                className="w-full mt-2 pl-[1.5rem] pr-3 py-2 text-gray-700 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
              <div>
                <label className="font-medium">First name</label>
                <input
                  type="text"
                  placeholder="Alex"
                  value={user.firstName || ""}
                  required
                  onChange={(e) => {
                    setUser({ ...user, firstName: e.target.value });
                  }}
                  className="w-full mt-2 pl-[1.5rem] pr-3 py-2 text-gray-700 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">Last name</label>
                <input
                  type="text"
                  value={user.lastName || ""}
                  onChange={(e) => {
                    setUser({ ...user, lastName: e.target.value });
                  }}
                  placeholder="Mask"
                  required
                  className="w-full mt-2 pl-[1.5rem] pr-3 py-2 text-gray-700 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                placeholder="alex@gmail.com"
                value={user.email || ""}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
                required
                className="w-full mt-2 pl-[1.5rem] pr-3 py-2 text-gray-700 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Phone number</label>
              <div className="relative mt-2">
                <input
                  type="text"
                  placeholder="+1 (555) 000-000"
                  value={user.phone || ""}
                  onChange={(e) => {
                    setUser({ ...user, phone: e.target.value });
                  }}
                  required
                  className="w-full pl-[1.5rem] pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="font-medium">Password</label>
              <div className="relative mt-2">
                <input
                  type="password"
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                  placeholder="***********"
                  required
                  className="w-full pl-[1.5rem] pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
            </div>

            <div className="flex flex-col border ">
              <div className="p-4">
                Skills
              </div>
              <div className="divider w-full bg-zinc-600/25 h-[1px]"></div>
              <div className="p-4 flex flex-wrap gap-2 items-center">
                {(user.skills &&
                  user.skills.map((item, index) => (
                    <Chip
                      key={index}
                      label={item.name}
                      onClick={handleClick}
                      onDelete={
                        ((toDelete) => () => {
                          setUser({ ...user, skills: user.skills.filter(item => item != toDelete) })
                        })(item)
                      }
                    />
                  )))}

                <div
                  className="inline self-start px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg "
                  onClick={() => setOpen(true)}
                >
                  Add Skills
                </div>
                <Modal
                  open={open}
                  onClose={() => setOpen(false)}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded shadow-md w-full max-w-sm">
                    <div className="flex flex-col border ">
                      <div className="p-4">
                        Skills
                      </div>
                      <div className="divider w-full bg-zinc-600/25 h-[1px]"></div>
                      <div className="p-4">
                        <Autocomplete
                          multiple
                          id="tags-outlined"
                          options={servicesList}
                          value={user.skills}
                          onChange={(e, newList) => { setUser({ ...user, skills: newList }); }}
                          getOptionLabel={(option) => option.name}
                          filterSelectedOptions
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Search Skills"
                              placeholder="Favorites"
                            />
                          )}
                        />
                      </div>
                      <div className="divider w-full bg-zinc-600/25 h-[1px]"></div>
                      <div className="p-4 flex">
                        <div className="grow"></div>
                        <div className="button p-2 px-4" onClick={(e) => { setOpen(false) }}>Save</div>
                      </div>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>

            <button
              className="todo relative w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
              onClick={updateProfile}
            >
              Update
              {loading && <div className="loading"></div>}
            </button>
          </form>
        </div >
      </div >
    </div >
  );
};
