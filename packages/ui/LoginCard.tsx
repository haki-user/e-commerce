import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import axios, { AxiosResponse, AxiosError } from "axios";
import { authState } from "recoil-state";
import { SnackbarType } from "./Snackbar";
import { useSnackbar } from "./SnackbarService";
import "./loginCard.css";

export const LoginCard: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setAuthState = useSetRecoilState(authState);
  const navigate = useNavigate();

  const { showSnackbar } = useSnackbar();

  const login: React.FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      const res: AxiosResponse<{ message: string; token: string }> =
        await axios.post("/auth/login", {
          username: email,
          password,
        });
      if (res.status != 200) {
        console.log(res.data?.message);
        showSnackbar(SnackbarType.ERROR, res.data?.message || "Login Failed");
        return;
      }

      localStorage.setItem("token", res.data.token);
      setAuthState((prev) => {
        return { ...prev, token: res.data.token };
      });

      showSnackbar(SnackbarType.SUCCESS, "Logged In");
      navigate(-1);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const axiosError = e as AxiosError<{ message: string }>;
        showSnackbar(
          SnackbarType.ERROR,
          axiosError.response?.data.message || axiosError.message
        );
        return;
      }
      console.log(e);
    }
  };

  return (
    <div
      className="loginCard"
      style={{
        width: 350,
        height: 580,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: 380,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid rgb(219, 219, 219)",
          backgroundColor: "#f7f7f7",
          borderBottomColor: "rgb(219, 219, 219)",
          //   marginTop: "5vw",
          marginBottom: 10,
        }}
      >
        {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"></img> */}
        {/* <img src={"https://www.fonts4free.net/includes/preview.php?fid=853&fname=Dragonball%20Z&fsize=50&fcolor=1E1E1E&text=Kame%20Store&fcase=Abc"} /> */}
        {/* <img src={"https://o.remove.bg/downloads/be7cf226-20c8-4c74-af71-6eb7625a281b/Saiyan_Sans-removebg-preview.png"} /> */}
        <img src={"https://static.fontbolt.com/preview/64cef0446f8c6.png"} />
        {/* <img src={"https://o.remove.bg/downloads/284dd0f0-a27e-4073-9e18-9dc38978920f/Saiyan_Sans-removebg-preview.png"} /> */}
        {/* <img src={"https://see.fontimg.com/api/renderfont4/Pv7Z/eyJyIjoiZnMiLCJoIjo2NSwidyI6MTAwMCwiZnMiOjY1LCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/S2FtZSBTdG9yZQ/learningcurve.png"} /> */}
        <form
          onSubmit={login}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 266,
            }}
          >
            <div className="hr" />
            <p className="or">OR</p>
            <div className="hr" />
          </div>
          <div>Login with google</div>
        </div>
      </div>
      <div
        style={{
          boxSizing: "border-box",
          padding: "10px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          border: "1px solid rgb(219, 219, 219)",
          backgroundColor: "#f7f7f7",
          borderBottomColor: "rgb(219, 219, 219)",
        }}
      >
        <span>
          <p>
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{ textDecoration: "none" }}
              replace={true}
            >
              <span className="textSignup">Sign up</span>
            </Link>
          </p>
        </span>
      </div>
    </div>
  );
};
