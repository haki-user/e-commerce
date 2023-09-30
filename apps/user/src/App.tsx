import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authState } from "recoil-state";
import { Landing } from "./pages/Landing";
import { Store } from "./pages/Store";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ProductPage } from "./pages/ProductPage";
import { Navbar } from "./components/Navbar";
import { Snackbar, SnackbarType } from "ui/Snackbar";
import { useSnackbar } from "ui";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api/";

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
      const {username, firstName, lastName} = res.data;
      console.log(username, firstName, lastName);
      setAuth((prev) => {
        return { ...prev, username, firstName, lastName};
      });
      showSnackbar(SnackbarType.INFO, `Welcome ${firstName} ${lastName}!`);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          console.log("Unauthorized");
          setAuth((prev) => {
            return { ...prev, token: "", username: "", firstName: "", lastName: "" };
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
