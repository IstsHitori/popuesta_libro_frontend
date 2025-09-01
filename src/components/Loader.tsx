
export default function Loader() {
  return (
    <>
      {/* <!-- Pantalla de verificación de autenticación --> */}
      <div id="auth-check" className="auth-check hidden">
        <div className="auth-check-container">
          <div className="auth-check-icon">
            <i className="fas fa-user-check"></i>
          </div>
          <h2 className="text-white">Verificando sesión...</h2>
          <p>Espera un momento mientras verificamos tu cuenta</p>
        </div>
      </div>
    </>
  );
}
