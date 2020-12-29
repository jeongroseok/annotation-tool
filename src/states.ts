import { selector } from "recoil";

type User = {
  username?: string;
};

export const userState = selector<User>({
  key: "userState",
  get: () => {
    try {
      const value = window.localStorage.getItem("user");
      if (value) return JSON.parse(value);
    } catch (error) {
      window.localStorage.removeItem("user");
      return null;
    }
  },
  set: (_, value) => {
    window.localStorage.setItem("user", JSON.stringify(value));
  },
});
