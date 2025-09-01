import { Outlet } from "react-router-dom";

import { useEffect, useState } from "react";
import useAuth from "@/hooks/auth/useAuth";
import Loader from "@/components/Loader";

export default function AuhtLayout() {
  const { authToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authToken) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [authToken]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Outlet />
    </div>
  );
}
