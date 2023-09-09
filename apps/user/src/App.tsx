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

axios.defaults.baseURL = "http://13.53.175.29/5175/";
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
      console.log("res",res.data);
      setAuth((prev) => {
        return { ...prev, username: res.data.username };
      });
    } catch (e) {
      if(e?.response.status == 401) {
        localStorage.removeItem("token");
        setAuth((prev) => {
          return { ...prev, token: "", username: "" };
        });
      }
      console.log(e);
    }
  };

  useEffect(() => {
    if(auth.username && auth.token) return;
    initUser();
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
        <Route path="store" element={<Store /> } />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="store/:id" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
