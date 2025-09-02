import { useEffect, useState } from "react";

import useAuth from "../auth/useAuth";
import useUserProfile from "./useUserProfile";
import { getUserProfile } from "@/services/auth.service";
import { toast } from "react-toastify";

export const useQueryUserProfile = () => {
  const { authToken } = useAuth();
  const { setUserProfile } = useUserProfile();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!authToken) {
        setLoading(false);
      }

      try {
        const profile = await getUserProfile();
        setUserProfile(profile);
        setError(null);
      } catch (err) {
        if (err instanceof Error) toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [setUserProfile, authToken]);

  return { loading, error };
};
