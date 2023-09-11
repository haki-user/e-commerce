import React, { useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { SnackbarState, SnackbarStateType } from "recoil-state";

export enum SnackbarType {
  SUCCESS,
  ERROR,
  INFO,
}

// export const showSnackbar = (type: SnackbarType, message: string) => {
//   const setSnackbarState = useSetRecoilState(SnackbarState);
//   setSnackbarState((prev) => {
//     return {
//       ...prev,
//       show: true,
//       transform: "translateX(0)",
//       type,
//       message,
//     };
//   });
// };

export const Snackbar: React.FC = () => {
  const [state, setState] = useRecoilState<SnackbarStateType>(SnackbarState);
  const { type, message, duration, show, transform } = state;
  const slideOutTimer = useRef<NodeJS.Timeout | null>(null);
  const hideTimer = useRef<NodeJS.Timeout | null>(null);

  const hideSnackbar = () => {
    setState((prev) => {
      return {
        ...prev,
        show: false,
        message: "",
        transform: "translateX(100%)",
      };
    });
  };

  useEffect(() => {
    console.log(show, state.transform, message);
    if (!duration || !show) {
      return;
    }

    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
    }
    hideTimer.current = setTimeout(() => {
      console.log("hideTimer");
      hideSnackbar();
    }, duration + 1000);

    if (slideOutTimer.current) {
      clearTimeout(slideOutTimer.current);
    }
    slideOutTimer.current = setTimeout(() => {
      console.log("slideOutTimer");
      setState((prev) => {
        return { ...prev, transform: "translateX(100%)" };
      });
    }, duration);

    return () => {
      if (slideOutTimer.current) clearTimeout(slideOutTimer.current);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [show]);

  return show === true ? (
    <div
      className="snackbar"
      style={{
        position: "fixed",
        top: 40,
        right: 3,
        width: "400px",
        backgroundColor:
          type == SnackbarType.SUCCESS
            ? "#06D6A0"
            : type == SnackbarType.ERROR
            ? "#EF476F"
            : "#1B9AAA",
        color: "white",
        fontSize: "16px",
        fontWeight: "bold",
        whiteSpace: "pre-wrap",
        overflowWrap: "break-word",
        padding: 5,
        transition: "all 0.3s ease-in-out",
        zIndex: 5000,
        transform: state.transform,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <div style={{ paddingLeft: 5, paddingRight: 5 }}>
          {/* <img
            src="https://gist.githubusercontent.com/haki-user/756ba0e56cff97689a8ecdbf97e9e02f/raw/10dacaebda3869a650a09a1bbe1b81e3d75924a4/alert-30px.svg"
            alt="alert"
          /> */}
          {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="30.000000pt" height="30.000000pt" viewBox="0 0 30.000000 30.000000" preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,30.000000) scale(0.100000,-0.100000)" fill="#ffffff" stroke="none">
<path d="M105 261 c-45 -20 -70 -60 -70 -112 0 -42 5 -53 33 -81 28 -28 39 -33 82 -33 43 0 54 5 82 33 28 28 33 39 33 82 0 42 -5 54 -31 81 -33 33 -92 46 -129 30z m55 -86 c0 -25 -4 -45 -10 -45 -5 0 -10 20 -10 45 0 25 5 45 10 45 6 0 10 -20 10 -45z m0 -85 c0 -5 -4 -10 -10 -10 -5 0 -10 5 -10 10 0 6 5 10 10 10 6 0 10 -4 10 -10z" fill="#ffffff"/>
</g>
</svg> */}
          {/* <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" fill="#ffffff"/></svg> */}
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            x="0"
            y="0"
            version="1.1"
            viewBox="0 0 122.88 122.88"
            xmlSpace="preserve"
          >
            <path
              fill="#fff"
              fillRule="evenodd"
              d="M61.44 0c33.926 0 61.44 27.514 61.44 61.44s-27.514 61.439-61.44 61.439C27.513 122.88 0 95.366 0 61.44S27.513 0 61.44 0zm-8.753 90.555H69.44v14.81H52.687v-14.81zm16.744-7.595h-16.74c-1.665-20.343-5.159-29.414-5.159-49.729 0-7.492 6.075-13.57 13.567-13.57s13.57 6.078 13.57 13.57c.001 20.304-3.539 29.402-5.238 49.729z"
              clipRule="evenodd"
            ></path>
          </svg> */}
          {type === SnackbarType.ERROR ? (
            <img
              src="https://gist.githubusercontent.com/haki-user/f86f1cf4b7e49e5befff8715a06fa83b/raw/cef8b5833f37cfb5f404f707d399b86ed0e43e95/alert-error-material-google.svg"
              alt="alert"
            />
          ) : type === SnackbarType.INFO ? (
            <img
              src="https://gist.githubusercontent.com/haki-user/2da600a0a7ea0bedd3f479a3c1761fec/raw/cc79214d88819e79ebaff717b42c0fd0b76ab3bc/info-material-google.svg"
              alt="info"
            />
          ) : (
            <img
              src="https://gist.githubusercontent.com/haki-user/e465eb00499f988fe27e4c49b3b53c94/raw/6cb4f3ba6c60915793c0d9d77d1a3b4c6582c09a/success-material-google.svg"
              alt="success"
            />
          )}
        </div>
        <p style={{ marginLeft: 5, marginRight: 5 }}>{message}</p>
        <div
          style={{
            cursor: "pointer",
            paddingRight: 5,
            width: "18px",
            justifySelf: "flex-end",
            marginLeft: "auto",
          }}
          onClick={hideSnackbar}
        >
          <img
            src="https://gist.githubusercontent.com/haki-user/3d52381abb1596692367f7ac507177a1/raw/4c1cc9e0218611d05111793f3ae74aced0f608b4/cross-18px-2x-material-google.svg"
            alt="cross"
          />
        </div>
      </div>
    </div>
  ) : null;
};
