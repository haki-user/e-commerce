import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "recoil-state";
import axios from "axios";
// import { IUser } from "common";
export const Appbar: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);

  const fetchUser = async () => {
    try {
      const res = await axios.get("/auth");
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="appbar" style={{ display: "flex", justifyContent: "flex-start", gap: 10, alignItems: "center"}}>
      Appbar
      {user.token && <div>{user.username}</div> ? (
        <>
        <div>Logout</div>
        <div>Signup</div>
        </>
      ) : (
        <div>Login</div>
      )}
    </div>
  );
};

// export default Appbar;
