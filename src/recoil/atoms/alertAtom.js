import { atom } from "recoil";

const alertAtom = atom({
  key: "alert",
  default: {
    isOpen: false,
    isSuccess: "",
    message: "",
  },
});

export default alertAtom;
