import { atom, selector } from "recoil";
import { IUser } from "common";
import { SnackbarType } from "ui/Snackbar";

export type SnackbarStateType = {
  type: SnackbarType;
  message: string;
  show: boolean;
  transform?: string;
  duration?: number;
};

export const counterState = atom<number>({
  key: "counterState",
  default: 0,
});

export const doubledCounterState = selector({
  key: "doubledCounterState",
  get: ({ get }) => {
    const counter = get(counterState);
    return counter * 2;
  },
});

export const authState = atom<IUser>({
  key: "authState",
  default: { token: localStorage.getItem("token") || "", username: "", firstName: "", lastName: "" },
});

export const SnackbarState = atom<SnackbarStateType>({
  key: "SnackbarState",
  default: {
    type: SnackbarType.INFO,
    message: "",
    show: false,
    duration: 4000,
    transform: "translateX(110%)",
  },
});

export const searchState = atom<string>({
  key: "searchState",
  default: "",
});

// query could be {name="apple", price=100, category="fruit"}
export const queryState = atom<{ [key: string]: string }>({
  key: "queryState",
  default: {},
});