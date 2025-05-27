import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const taskAtom = atom({
  key: "taskAtom",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
