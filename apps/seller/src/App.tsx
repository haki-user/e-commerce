import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
// import { counterState } from 'recoil-state';
import { authState } from "recoil-state";
// import { Appbar } from "./components/Appbar";
import { Landing } from "./components/Landing";
import { Store } from "./components/Store";
import { Navbar } from "ui";
// import ulquiorra from './assets/init_d.jpg';
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/seller/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

function App() {
  // const [count, setCount] = useState(0)
  // const [count, setCount] = useRecoilState(counterState);
  // const [user, setUser] = useRecoilState(userState);

  return (
    <Router>
      {/* <Appbar /> */}
      {/* <img src={ulquiorra} style={{ position: "fixed", width: "100%", minWidth: 1500, height: "100%", minHeight: 650, zIndex: -1, opacity: 1, overflow: "scroll"}}/> */}
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Appbar />} /> */}
        <Route path="/" element={<Landing />} />
        <Route path="store" element={<Store />} />
      </Routes>
    </Router>
  );
}

export default App;
