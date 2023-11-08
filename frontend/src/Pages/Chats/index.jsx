import Chip from "@mui/material/Chip";
import * as React from "react";
import { useAuth } from "../../Hooks/useAuth";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  Icon, IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import servicesList from '../../Data/services';
import { useGlobalState } from "../../Hooks/useGlobalState";
import { Link, Outlet } from "react-router-dom";
import CustomModal from "../../Components/CustomModal";
import io from 'socket.io-client';




export default function Page() {
  const [socket, setSocket] = React.useState(null);
  const { getUser, fetchUser } = useAuth();
  const [showConversations, setShowConversations] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [conversations, setConversations] = React.useState([]);
  const { globalState, setGlobalState } = useGlobalState();
  const lastPath = globalState.lastPath?.startsWith("/chats") ? null : globalState.lastPath;
  React.useEffect(() => {
    setSocket(io(import.meta.env.VITE_BASE_URL, {
      autoConnect: false,
      // reconnection: false,
      extraHeaders: {
        Authorization: `Bearer ${localStorage.jwt || ""}`,
      },
    }));
    console.log("init");
    (async () => {
      setUser(await getUser());
      setConversations((await getUser()).conversations);
      console.log("conversations", (await getUser()).conversations)
    })()
  }, [])
  React.useEffect(() => {
    if (!socket) return
    socket?.connect();
    // socket.connect();

    socket.on("connect", () => {
      console.log("connected:", socket.id);
      setGlobalState((p) => ({ ...p, socket }));
    });
    socket.on("disconnect", () => {
      console.log("disconnected:", socket.id);
      setGlobalState((p) => ({ ...p, socket }));
    });
    socket.on("init", (initialMessages) => {
      console.log("room joined");
      setGlobalState((prevState, props) => ({ ...prevState, messages: initialMessages }));
    });
    socket.on("receiveMessage", (data) => {
      let { text, sender } = data;
      console.log("message", sender, text);
      setGlobalState((prevState, props) => ({
        ...prevState,
        messages: [...prevState.messages, data],
      }));
    });

    setGlobalState((prevState, props) => ({
      ...prevState,
      socket: socket,
      messages: [],
    }));

    return () => socket.disconnect()

  }, [socket])
  return (globalState.socket?.connected &&
    <CustomModal
      open={true}
      setOpen={(b) => { }}
      onClose={() => { }}>
      <div className="flex w-full h-full overflow-auto p-6 sm:py-12">
        <div className=" top-0 left-0 flex flex-col items-center w-full h-full overflow-auto grow z-20 bg-white">
          <div className="h-16 flex w-full items-center px-4 space-x-2 justify-between border-b">
            <Link to={lastPath || "/"}>
              <IconButton>
                <Icon fontSize="inherit">arrow_back</Icon>
              </IconButton>
            </Link>
            <Link to={"/chats"}>
              <Typography variant="h5" className="text-gray-700">
                Chats
              </Typography>
            </Link>
            <IconButton>
              <Icon fontSize="inherit">menu</Icon>
            </IconButton>
          </div>
          <div className="w-full p-2 border-b" onClick={() => setShowConversations(!showConversations)}>
            <IconButton>
              <Icon>
                menu
              </Icon>
            </IconButton>
            {globalState.chat?.name}
          </div>
          <div className="flex w-full h-full relative overflow-auto">
            <div className={`w-full sm:w-auto sm:static sm:basis-4/12 absolute flex flex-col border-r h-full bg-white transition-all sm:translate-x-0 ${showConversations && "-translate-x-full"}`}>
              <div className="flex flex-col p-4 ">
                {conversations?.map((item, index) => {
                  return (
                    <Link to={`/chats/${item._id}`} key={index}>
                      <Button className="w-full">
                        <div className="flex h-full w-full space-x-2 items-center" >
                          <img src="/noimage.svg" className="w-8 h-8" />
                          <div className="font-bold">{(item.users.find(usr => usr._id != user._id) || user).firstName}</div>
                        </div>
                      </Button>
                      <div className="divider w-full bg-zinc-600/25 h-[1px]"></div>
                    </Link>
                  )
                })}
              </div>
            </div>
            <div className="basis-full sm:basis-8/12 overflow-auto ">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </CustomModal>

  );
};
