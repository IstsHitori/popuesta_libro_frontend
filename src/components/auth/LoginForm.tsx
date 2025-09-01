import { Link } from "react-router-dom";
import { MdOutlineDocumentScanner } from "react-icons/md";
import HeaderForm from "./HeaderForm";
import InputField from "./InputField";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { LoginForm } from "@/types";
import { loginFormSchema } from "@/schemas";
import { authLogin } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import useAuth from "@/hooks/auth/useAuth";
import useUserProfile from "@/hooks/profile/useUserProfile";

export default function LoginAuthForm() {
  const { setAuthToken } = useAuth();
  const { setUserProfile } = useUserProfile();
  const defaultLogin: LoginForm = {
    document: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: defaultLogin,
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginForm> = async (loginData) => {
    try {
      const response = await authLogin(loginData);
      setAuthToken(response.token);
      setUserProfile(response.user);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };
  const { ref, ...rest } = register("document");

  return (
    <div
      id="login-screen"
      className={`
        fixed top-0 left-0 w-screen h-screen
        bg-[url('/niveles/templo-de-la-integracion-_2_.png')] bg-no-repeat bg-center bg-cover
        flex justify-center items-center z-[1000]
      `}
    >
      <div
        className={`
          bg-black/70 backdrop-blur-lg rounded-2xl
          p-10 shadow-2xl max-w-[450px] w-[90%] text-center
          border border-white/20 max-h-[90vh] overflow-y-auto
        `}
      >
        <HeaderForm />
        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="block text-left">
          <h2 className="text-white mb-5 text-center text-[1.6rem]">
            ¡Bienvenido de vuelta!
          </h2>
          <InputField
            type="text"
            label="Número de documento"
            Icon={<MdOutlineDocumentScanner className="text-indigo-500" />}
            inputRest={ref}
            {...rest}
            error={errors.document}
          />
          <button
            type="submit"
            className={`
              w-full py-3 px-8
              bg-indigo-700/80 text-white border-none rounded-xl
              text-base font-semibold cursor-pointer transition
              flex items-center justify-center gap-2
              shadow-md backdrop-blur-xl 
              hover:-translate-y-1 hover:shadow-lg hover:bg-indigo-700
              active:-translate-y-0.5
            `}
          >
            <i className="fas fa-sign-in-alt text-[1.1rem]" />
            Iniciar Sesión
          </button>
          <div className="text-center mt-5 text-white text-sm">
            ¿No tienes cuenta?{" "}
            <Link
              to="/auth/register"
              className="font-semibold transition hover:text-primary-light hover:underline"
            >
              Regístrate aquí
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
