import React from "react";
import { Link } from "react-router-dom";
import { authState } from "recoil-state";
import { useRecoilState } from "recoil";
import "./navbar.css";
// import { ReactComponent as NavAppLogo } from "../assets/navAppLogo.svg";
// import { ReactComponent as NavUserIcon } from "../assets/NavUserIcon.svg";
// import { ReactComponent as NavSearchIcon } from "../assets/NavSearchIcon.svg";
// import { ReactComponent as NavCartIcon } from "../assets/NavCartIcon.svg";

export const Navbar: React.FC = () => {
  const [user, setUser] = useRecoilState(authState);
  const logout = () => {
    localStorage.removeItem("token");
    setUser((prev) => {
      return { ...prev, token: "", username: "" };
    });
  };

  return (
    <nav
      className="navbar"
      style={{
        height: 48,
        paddingLeft: 16,
        paddingRight: 16,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f7f7f7",
      }}
    >
      <div className="navAppLogo" style={{ maxWidth: 32, maxHeight: 32 }}>
        <Link to="/">
          <img src="https://gist.githubusercontent.com/haki-user/676598b6d67772d954126ce1217c3fca/raw/69dc6389ca30db819cbf457c40b58c9e7c77b2d6/gojo.svg" alt="gojo" />
        </Link>
      </div>
      <div className="nav_separator" style={{ width: "" }}></div>
      <ul
        className="nav_group nav_shortcuts"
        style={{
          display: "flex",
          alignItems: "center",
          listStyle: "none",
          height: 44,
        }}
      >
        <li
          className="nav_search_icon"
          style={{
            display: "flex",
            width: "",
            alignItems: "center",
            paddingLeft: 8,
            paddingRight: 8,
          }}
        >
          <div
            className="nav_search_input"
            style={{ display: "none", paddingLeft: 8, paddingRight: 8 }}
          >
            <input
              placeholder="search"
              style={{
                border: "none",
                outline: "none",
                width: 200,
                height: 32,
                borderRadius: 20,
                textAlign: "center",
              }}
            ></input>
          </div>
          <div
            className="nav_search_icon"
            style={{ width: 24, paddingLeft: 8, paddingRight: 8 }}
          >
            <img src="https://gist.githubusercontent.com/haki-user/42fe4f45c23717405c379bd4ac38120d/raw/01bcffd864ba95b34a11c08fbae51db4db2964bc/search.svg" alt="search" />
          </div>
        </li>

        <li className="nav-cart" style={{ paddingLeft: 8, paddingRight: 8 }}>
          <Link to="/cart">
            <img src="https://gist.githubusercontent.com/haki-user/2627d0ca08b248a79987cea7239bd79a/raw/45ac7a915fa9277ff0e65a1400460d0bb0cd4d62/cart.svg" alt="cart" />
          </Link>
        </li>
        <li
          style={{
            height: 48,
          }}
        >
          <div
            className="shortcut-item"
            style={{
              height: 48,
              paddingLeft: 8,
              paddingRight: 8,
              display: "flex",
              cursor: "pointer",
              position: "relative",
              width: 24,
            }}
          >
            <div
              style={{
                display: "block",
                position: "relative",
                top: "25%",
              }}
            >
              <Link
                to={user.username ? "dashboard" : ""}
                style={{ marginTop: 10, display: "inline" }}
              >
                <img src="https://gist.githubusercontent.com/haki-user/bd122a075936b2837ef5a4909cda374c/raw/d2ea8a92794396542589c64924c86c50dca3639d/user.svg" alt="user" />
              </Link>
              <div
                className="shortcut-item-dropdown"
                style={{
                  position: "absolute",
                  top: "11px",
                  left: "0%",
                  transform: "translate(-50%, 0)",
                  zIndex: 1,
                  width: 77,
                  minWidth: "max-content",
                  height: 65,
                  backgroundColor: "white",
                  marginTop: 20,
                  border: "1px solid rgb(221, 221, 221)",
                  borderRadius: "5px",
                }}
              >
                <div
                  className="navbar-shortcut-arrow"
                  style={{
                    display: "block-inline",
                    position: "absolute",
                    left: "36px",
                    width: 28.28,
                    height: 28.28,
                    backgroundColor: "white",
                    padding: 0,
                    margin: 0,
                    transform: "rotate(45deg)",
                    WebkitTransform: "rotate(45deg)",
                    border: "1px solid rgb(221, 221, 221)",
                    borderRadius: "1px solid rgb(221, 221, 221)",
                  }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    zIndex: 500,
                    width: 77,
                    height: 65,
                    backgroundColor: "white",
                    borderRadius: 5,
                  }}
                >
                  {user.username && user.token ? (
                    <>
                      <Link to="/profile" className="link">
                        {user.username}
                      </Link>
                      <div
                        style={{
                          boxSizing: "border-box",
                          width: "100%",
                          borderBottom: "1px solid rgb(221, 221, 221)",
                        }}
                      />
                      <Link to="" className="link" onClick={logout}>
                        Logout
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="link">
                        Login
                      </Link>
                      <div
                        style={{
                          boxSizing: "border-box",
                          width: "100%",
                          borderBottom: "1px solid rgb(221, 221, 221)",
                        }}
                      />
                      <Link to="/signup" className="link">
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

// #BCCEFB
