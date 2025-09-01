import axiosPrivate from "@/helpers/axios.helper";
import type { LoginForm } from "@/types/auth.type";
import { isAxiosError } from "axios";

const authLogin = async (loginData: LoginForm) => {
  try {
    const response = axiosPrivate.post("/auth/login", loginData);
  } catch (error) {
    if (isAxiosError(error)) throw new Error(error.response?.data);
    console.error(error);
  }
};
