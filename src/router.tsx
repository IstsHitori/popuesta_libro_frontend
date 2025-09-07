import { createBrowserRouter, Navigate } from "react-router-dom";
import PrivateLayout from "./layaouts/PrivateLayout";
import LoginPage from "./pages/LoginPage";
import AuthLayout from "./layaouts/AuthLayout";
import Home from "./pages/Home";
import RegisterForm from "./components/auth/RegisterForm";
import SelectLevelpage from "./pages/SelectLevelPage";
import LevelOnePage from "./pages/levels/LevelOnePage";
import LevelTwoPage from "./pages/levels/LevelTwoPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterForm />,
      },
    ],
  },
  {
    path: "/app",
    element: <PrivateLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "niveles",
        element: <SelectLevelpage />,
      },
      {
        path: "niveles/1",
        element: <LevelOnePage />,
      },
      {
        path: "niveles/2",
        element: <LevelTwoPage />,
      },
      {
        path: "*",
        element: <div>Page not found</div>,
      },
    ],
  },
]);
