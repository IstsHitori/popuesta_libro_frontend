import { useEffect, useState } from "react";

import useAuth from "../auth/useAuth";
import useUserProfile from "./useUserProfile";

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
        // const profile = await getUserProfile();
        // setUser(profile);
        // setError(null);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("No se pudo cargar el perfil.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [setUserProfile, authToken]);

  return { loading, error };
};
