import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
// import { counterState } from 'recoil-state';
import { authState } from "recoil-state";
// import { Appbar } from "./components/Appbar";
import { Landing } from "./components/Landing";
import { Store } from "./components/Store";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { ProductPage } from "./components/ProductPage";
import { Navbar } from "./components/Navbar";
import { Snackbar, SnackbarType } from "ui/Snackbar";
import { useSnackbar } from "ui";
// import ulquiorra from './assets/init_d.jpg';
import axios from "axios";

axios.defaults.baseURL = "http://16.171.93.79:5000/api/";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

const App: React.FC = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const { showSnackbar } = useSnackbar();

  const initUser = async () => {
    if (!auth.token) {
      return;
    }
    axios.defaults.headers["authorization"] = `Bearer ${auth.token}`;
    try {
      const res = await axios.post("/auth/me");
      if (res.status != 200) {
        console.log(res.data?.message);
        showSnackbar(SnackbarType.ERROR, res.data?.message || "Login Failed");
        return;
      }
      console.log("res", res.data);
      setAuth((prev) => {
        return { ...prev, username: res.data.username };
      });
      showSnackbar(SnackbarType.INFO, `Welcome ${res.data.username}`);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          console.log("Unauthorized");
          setAuth((prev) => {
            return { ...prev, token: "", username: "" };
          });
        } else {
          console.log("Login Failed");
        }
        return;
      }
      showSnackbar(SnackbarType.ERROR, String(err));
      console.log(err);
    }
  };

  useEffect(() => {
    if (auth.username && auth.token) return;
    initUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <Router>
      {/* <img src={ulquiorra} style={{ position: "fixed", width: "100%", minWidth: 1500, height: "100%", minHeight: 650, zIndex: -1, opacity: 1, overflow: "scroll"}}/> */}
      <Navbar />
      <Snackbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="store" element={<Store />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="store/:id" element={<ProductPage />} />
      </Routes>
    </Router>
  );
};

export default App;
