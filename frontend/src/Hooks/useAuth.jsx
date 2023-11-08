import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser, setNonPersist] = useLocalStorage("user", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data) => {
    setUser(data);
    // navigate("/profile");
  };

  // call this function to sign out logged in user
  const logout = async () => {
    await fetch(import.meta.env.VITE_BASE_URL + "/api/users/logout", {
      method: "GET",
      credentials: "include",
    });
    setUser(null);
    // navigate("/", { replace: true });
  };
  const fetchUser = async (persistInLocalStorage = true) => {
    let res, fetchedUser;
    try {
      res = await fetch(import.meta.env.VITE_BASE_URL + "/api/users/getSelf", {
        method: "GET",
        credentials: "include",
      });
      fetchedUser = await res.json();
      if (res.status != 200) {
        throw new Error(fetchedUser.error);
        return;
      }
      setUser(fetchedUser);
      await new Promise(resolve => setTimeout(resolve, 0));
      return fetchedUser;
    } catch (e) {
      console.log(e);
      await new Promise(resolve => setTimeout(resolve, 0));
      await logout();
      navigate("/login");
      return null;
    }
  };
  const getUser = async () => {
    let res, fetchedUser;
    try {
      res = await fetch(import.meta.env.VITE_BASE_URL + "/api/users/getSelf", {
        method: "GET",
        credentials: "include",
      });
      fetchedUser = await res.json();
      return fetchedUser;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const value = useMemo(
    () => ({
      user,
      getUser,
      setUser,
      fetchUser,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={{
    user,
    setUser,
    getUser,
    fetchUser,
    login,
    logout,
  }}>{children}</AuthContext.Provider>;
};

function useAuth() {
  return useContext(AuthContext);
}
export { useAuth, AuthProvider };
