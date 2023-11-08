import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { useLocation } from "react-router-dom";
import React from 'react';

const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {
  const navigate = useNavigate();

  const [globalState, setGlobalState] = useLocalStorage("globalState", {});
  const { pathname } = useLocation();
  React.useEffect(() => {
    setGlobalState((prevState, props) => ({
      ...(prevState || {}),
      hideFooter: pathname.startsWith("/chats"),
      lastPath: prevState.current != pathname ? prevState.current : null,
      current: pathname,
      navigate
    }));
    window.globalState = globalState;
  }, [pathname]);

  const [windowSize, setWindowSize] = React.useState(true);
  React.useEffect(() => {
    window.addEventListener('resize', () => { setWindowSize(window.innerWidth) });
    setWindowSize(window.innerWidth);
  }, [])
  const breakpoint = React.useMemo(() => {
    let res = {};
    res["2xl"] = (windowSize >= 1536);
    res.xl = (windowSize >= 1280);
    res.lg = (windowSize >= 1024);
    res.md = (windowSize >= 768);
    res.sm = (windowSize >= 640);
    return res; // or handle differently
  }, [windowSize]);

  return <GlobalStateContext.Provider value={{ globalState, setGlobalState, breakpoint }}>{children}</GlobalStateContext.Provider>;
};

function useGlobalState() {
  return useContext(GlobalStateContext);
}
export { useGlobalState, GlobalStateProvider };
