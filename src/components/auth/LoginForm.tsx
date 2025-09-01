import { Link } from "react-router-dom";
// Asegúrate de importar los estilos de Font Awesome en tu proyecto
// Si usas CRA o Vite, puedes importar el CSS globalmente en tu index.tsx o App.tsx así:
// import '@fortawesome/fontawesome-free/css/all.min.css';

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
        {/* Header */}
        <div className="mb-6">
          <div
            className={`
              w-[70px] h-[70px]
              bg-gradient-to-br from-primary to-secondary
              rounded-full flex items-center justify-center mx-auto mb-4
              shadow-lg
            `}
          >
            <i className="fas fa-brain text-white text-[1.8rem]" />
          </div>
          <h1
            className={`
              text-[2.2rem] text-white mb-2
              drop-shadow-[2px_2px_4px_rgba(0,0,0,0.3)]
            `}
          >
            Numerika
          </h1>
          <p className="text-white/80 text-base">Aventura Matemática</p>
        </div>

        {/* Formulario */}
        <form id="login-form" className="block text-left">
          <h2 className="text-white mb-5 text-center text-[1.6rem]">
            ¡Bienvenido de vuelta!
          </h2>
          <div className="mb-5">
            <div className="relative flex items-center">
              <i
                className={`
                  fas fa-id-badge absolute left-4 text-[1rem] z-10
                  bg-gradient-to-br from-violet-500 to-violet-700
                  bg-clip-text text-transparent
                  drop-shadow-[0_0_5px_rgba(139,92,246,0.3)]
                  transition-transform
                `}
              />
              <input
                type="text"
                id="login-document"
                placeholder="Número de documento"
                required
                className={`
                  w-full pl-11 pr-4 py-3
                  border-2 border-white/20 rounded
                  text-base transition
                  bg-white/15 backdrop-blur-2xl text-white
                  placeholder:text-white/80
                  focus:outline-none focus:border-primary
                  focus:shadow-[0_0_0_3px_rgba(79,70,229,0.3)]
                  focus:-translate-y-0.5
                  focus:bg-white/25
                `}
              />
            </div>
          </div>
          <button
            type="submit"
            className={`
              w-full py-3 px-8
              bg-primary/80 text-white border-none rounded
              text-base font-semibold cursor-pointer transition
              flex items-center justify-center gap-2
              shadow-md backdrop-blur-xl
              hover:-translate-y-1 hover:shadow-lg hover:bg-primary/90
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
