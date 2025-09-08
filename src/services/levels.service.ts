import axiosPrivate from "@/helpers/axios.helper";
import { isAxiosError } from "axios";

export const completeLevel = async (coins_earned: number) => {
  try {
    const response = await axiosPrivate.post("/me/complete-level", {
      coins_earned,
    });
    console.log(response);
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.detail);
    }
    throw new Error("Error inesperado al completar el nivel");
  }
};
