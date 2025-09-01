import bg_image from "/niveles/bg_numerika.webp";

export default function LoginPage() {
  return (
    <>
      {/* <!-- Pantalla de carga --> */}
      <div
        id="loading-screen"
        className="fixed inset-0 w-screen h-screen bg-cover bg-center flex justify-center items-center z-[9999]"
        style={{ backgroundImage: `url(${bg_image})` }}
      >
        <div className="text-center text-white bg-black/70 p-8 rounded-2xl backdrop-blur-lg">
          <div className="text-[4rem] mb-4 animate-bounce">
            <i className="bg-gradient-to-r from-yellow-400 via-orange-400 to-violet-600 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]"></i>
          </div>
          <h2>Numerika</h2>
          <p>Preparando tu aventura matemática...</p>
            <div className="w-[300px] h-2 bg-white/20 rounded overflow-hidden mx-auto">
            <div className="w-0 h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded animate-[loading_2s_ease-in-out]"></div>
            </div>
        </div>
      </div>

      {/* <!-- Pantalla de login --> */}
      <div id="login-screen" className="auth-screen">
        <div className="auth-container">
          {/* <!-- Header del formulario --> */}
          <div className="auth-header">
            <div className="logo-container">
              <i className="fas fa-brain logo-icon"></i>
            </div>
            <h1>Numerika</h1>
            <p>Aventura Matemática</p>
          </div>

          {/* <!-- Formulario de login --> */}
          <form id="login-form" className="auth-form active">
            <h2>¡Bienvenido de vuelta!</h2>
            <div className="form-group">
              <div className="input-container">
                <i className="fas fa-id-badge"></i>
                <input
                  type="text"
                  id="login-document"
                  placeholder="Número de documento"
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn-primary">
              <i className="fas fa-sign-in-alt"></i>
              Iniciar Sesión
            </button>
            <div className="auth-switch">
              ¿No tienes cuenta? <a href="register.html">Regístrate aquí</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
