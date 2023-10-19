import { createContext, useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : ""
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loginUser = (event) => {
    event.preventDefault();
    const response = axios
      .post("http://127.0.0.1:8000/api/token/", {
        username: event.target.username.value,
        password: event.target.password.value,
      })
      .then((response) => {
        setAuthTokens(response.data);
        setUser(jwtDecode(response.data.access));
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        navigate("/");
      })
      .catch((error) =>
        navigate("/login", {
          state: { message: "Wrong username or password!" },
        })
      );
  };

  const logoutUser = (permission = true) => {
    setAuthTokens("");
    setUser(null);
    localStorage.removeItem("authTokens");
    permission
      ? navigate("/login", {
          state: {
            status: "success",
            message: "You have successfully logged out!",
          },
        })
      : navigate("/login", {
          state: { status: "error", message: "You don't have the permission!" },
        });
  };

  const updateToken = () => {
    const response = axios
      .post(
        "http://127.0.0.1:8000/api/token/refresh/",
        JSON.stringify({
          refresh: JSON.parse(localStorage.getItem("authTokens"))?.refresh,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        setAuthTokens(response.data);
        setUser(jwtDecode(response.data.access));
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    const refresh = 1000 * 60 * 4;
    const interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, refresh);
    return () => clearInterval(interval);
  }, [loading, authTokens]);

  const contextData = {
    user: user,
    authTokens: authTokens ? authTokens : "",
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
