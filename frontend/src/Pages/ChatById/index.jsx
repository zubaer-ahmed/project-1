import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import * as React from "react";
import { useParams } from "react-router-dom";
import { useLocalStorage } from "../../Hooks/useLocalStorage";
import services from "../../Data/services";
import { Select, MenuItem, FormControl, FormHelperText, TextField, Button, InputBase, IconButton, Divider, Container, Modal, LinearProgress } from "@mui/material";
import { DatePicker, LocalizationProvider, StaticDatePicker, StaticTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, CircularProgress, Icon } from "@mui/material";
import { useAuth } from "@/Hooks/useAuth";
import LoginOverlay from "@/Components/LoginOverlay";
import { useGlobalState } from '../../Hooks/useGlobalState';
import { useHelpers } from '../../Hooks/useHelpers';

function ChatById() {
  const { user, setUser } = useAuth();
  const { globalState, setGlobalState } = useGlobalState();
  const { slug: conversationId } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("");
  const rows = React.useMemo(() => Math.min(3, text.split("\n").length), [text]);
  const [conversation, setConversation] = React.useState(null);
  const navigate = useNavigate();
  React.useEffect(() => {

    if (!globalState.socket?.connected) return;
    (async () => {
      let res = await (await fetch(import.meta.env.VITE_BASE_URL + `/api/chats/getChat/${conversationId}`, { credentials: "include" })).json();
      console.log("setConversation", res);
      globalState.socket.emit("joinRoom", conversationId);
      setConversation(res);
      setGlobalState((prevState, props) => ({ ...prevState, chat: res }));
    })()
    return () => { };
  }, [globalState.socket?.connected])


  async function postMessage() {
    // setLoading(true);
    await new Promise((resolve, reject) => {
      globalState.socket.emit("sendMessage", { chatRoomId: conversationId, text }, (response) => {
        console.log("response", response);
        if (response.error) {
          console.log(response.error);
        } else {
        }
        resolve();
      });
    });
    setText("");
    setLoading(false);
  }

  return (
    <div className="flex flex-col w-full h-full overflow-auto ">
      <div className="flex flex-col relative h-full">
        <div className="flex flex-col w-full p-4 overflow-auto grow flex-col-reverse">
          {globalState.messages?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((item, index) => {
            return (
              <div key={index} className="flex items-center space-x-2 border-b rounded p-4">
                <img src="/noimage.svg" className="w-8 h-8" />
                <div className="flex flex-col">
                  <div className="text-sm text-gray-500 font-bold">{item.sender?.firstName}</div>
                  <div className="">{item.text}</div>
                </div>
              </div>
            )
          })}
        </div>
        {loading && <LinearProgress />}
        <div className="flex w-full p-2 space-x-2 items-center text-blue-500 h-16">
          <TextField disabled={loading} multiline rows={rows} fullWidth variant="outlined" value={text} onChange={(event) => setText(event.target.value)}
            onKeyDown={(e) => {
              // enter without shift 
              if (!e.shiftKey && e.key === 'Enter') {
                e.preventDefault(); postMessage()
              }
            }}
          />
          <IconButton variant="contained" color="inherit" onClick={postMessage}>
            <Icon>send</Icon>
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default ChatById;
