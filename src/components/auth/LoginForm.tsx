import { Link } from "react-router-dom";
import { MdOutlineDocumentScanner } from "react-icons/md";
import HeaderForm from "./HeaderForm";

export default function LoginForm() {
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
        <form id="login-form" className="block text-left">
          <h2 className="text-white mb-5 text-center text-[1.6rem]">
            ¡Bienvenido de vuelta!
          </h2>
          <div className="mb-5">
            <label className="relative flex items-center bg-white/10 rounded-lg border border-white/20 px-3 py-2">
              <span className="text-primary text-xl flex items-center mr-3">
                <MdOutlineDocumentScanner className="text-indigo-500" />
              </span>
              <input
                type="number"
                id="login-document"
                placeholder="Número de documento"
                required
                className={`
                w-full bg-transparent border-none outline-none
                text-base text-white placeholder:text-white/80
                py-1
                [&::-webkit-outer-spin-button]:appearance-none
                [&::-webkit-inner-spin-button]:appearance-none
                [-moz-appearance:textfield]
              `}
              />
            </label>
          </div>
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
