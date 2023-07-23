import axios from "axios";
import type { User } from "../models";
import { tokenStore, userStore } from "../stores/Store";
// TODO: move to constants file
const backendUri: string = import.meta.env.VITE_BACKEND_URI ?? "";

type SignInBody = {
  email: string;
  password: string;
};

export async function signIn(formData: SignInBody): Promise<boolean> {
  return await axios
    .post(`${backendUri}/signin`, {
      email: formData.email,
      password: formData.password,
    })
    .then((res) => {
      const token: string = res.data.token;
      const user: User = {
        name: res.data.user.name,
        email: res.data.user.email,
      };
      userStore.set(user);
      tokenStore.set(token);
      return true;
    })
    .catch(() => {
      return false;
    });
}
