import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/auth/useAuth";
import LoadingScreen from "@/components/loaders/LoadingScreen";

export default function AuthLayout() {
  const { authToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      setIsLoading(true);
      const timeout = setTimeout(() => {
        navigate("/app");
      }, 2500); 
      return () => clearTimeout(timeout);
    } else {
      setIsLoading(false);
    }
  }, [authToken, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Outlet />
    </div>
  );
}
