import { useEffect } from "react";
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
// import ulquiorra from './assets/init_d.jpg';
import axios from "axios";

axios.defaults.baseURL = "http://16.171.93.79:5000/api/";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

function App() {
  const [auth, setAuth] = useRecoilState(authState);
  const initUser = async () => {
    if (!auth.token) {
      return;
    }
    axios.defaults.headers["authorization"] = `Bearer ${auth.token}`;
    try {
      const res = await axios.post("/auth/me");
      if (res.status != 200) {
        console.log(res.data?.message);
        return;
      }
      console.log("res", res.data);
      setAuth((prev) => {
        return { ...prev, username: res.data.username };
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // console.log(err.response?.data)
        if (!err?.response) {
          console.log("No Server Response");
        } else if (err.response?.status === 400) {
          console.log("Missing Username or Password");
        } else if (err.response?.status === 401) {
          localStorage.removeItem("token");
          console.log("Unauthorized");
          setAuth((prev) => {
            return { ...prev, token: "", username: "" };
          });
        } else {
          console.log("Login Failed");
        }
      }
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
      {/* <Appbar /> */}
      {/* <img src={ulquiorra} style={{ position: "fixed", width: "100%", minWidth: 1500, height: "100%", minHeight: 650, zIndex: -1, opacity: 1, overflow: "scroll"}}/> */}
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Appbar />} /> */}
        <Route path="/" element={<Landing />} />
        {/* <Route path="store" element={auth.token && auth.username ? <Store /> : <Login />} /> */}
        <Route path="store" element={<Store />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="store/:id" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
