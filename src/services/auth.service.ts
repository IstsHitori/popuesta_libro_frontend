import axiosPrivate from "@/helpers/axios.helper";
import { loginResponseSchema, userProfileSchema } from "@/schemas";
import type { LoginForm } from "@/types/auth.type";
import { isAxiosError } from "axios";

export const authLogin = async (loginData: LoginForm) => {
  try {
    const response = await axiosPrivate.post("/auth/login", loginData);

    const result = loginResponseSchema.safeParse(response.data);
    if (!result.success) {
      console.error(result.error);
      throw new Error("Error al parsear los datos");
    }
    return result.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.detail);
    }
    throw new Error("Error inesperado al iniciar sesión");
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axiosPrivate.get("/me");

    const result = userProfileSchema.safeParse(response.data);
    if (!result.success) {
      console.error(result.error);
      throw new Error("Error al parsear los datos");
    }
    console.log(result.data);

    return result.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.detail);
    }
    throw new Error("Error inesperado al obtener el perfil");
  }
};
