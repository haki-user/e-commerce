import { useSetRecoilState } from "recoil";
import { SnackbarState } from "recoil-state";
import { SnackbarType } from "./Snackbar";

export const useSnackbar = () => {
  const setSnackbarState = useSetRecoilState(SnackbarState);

  const showSnackbar = (type: SnackbarType, message: string) => {
    setSnackbarState((prev) => {
      return {
        ...prev,
        show: true,
        transform: "translateX(0)",
        type,
        message,
      };
    });
  };

  //   const hideSnackbar = () => {
  //     setSnackbarState((prev) => ({
  //       ...prev,
  //       show: false,
  //       transform: "translateX(100%)",
  //     }));
  //   };

  return {
    showSnackbar,
  };
};
