import useUserProfile from "@/hooks/profile/useUserProfile";
import { useNavigate } from "react-router-dom";

export default function SelectLevelpage() {
  const { userProfile } = useUserProfile();
  const navigate = useNavigate();

  const userLevel = userProfile.level;
  return (
    <>
      <main>
        <section
          id="level-map"
          className="bg-[#0b1220] rounded-2xl p-4 sm:p-8 text-center shadow-xl border border-white/20 mx-auto w-full max-w-[1200px] overflow-visible mt-8 sm:mt-20"
        >
          <h2 className="text-2xl sm:text-4xl mb-6 sm:mb-12 font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow">
            Selecciona tu nivel
          </h2>
          <div className="p-2 sm:p-4 w-full"></div>
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-12 py-4 sm:py-8 w-full max-w-[1000px] flex-wrap mx-auto justify-center items-start">
            {/* Nivel 1 */}
            <div
              className={`relative w-full sm:w-[220px] h-[220px] sm:h-[280px] rounded-2xl transition-all duration-400 shadow-lg overflow-hidden border-4 border-white/30 bg-transparent group hover:border-green-300 mx-auto ${
                userLevel < 1
                  ? "cursor-not-allowed brightness-50"
                  : "cursor-pointer"
              } `}
              data-level="1"
              onClick={() => {
                navigate("/app/niveles/1");
              }}
            >
              <div
                className="absolute top-0 left-0 w-full h-full bg-black bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: "url('/tomas/bosque_de_la_ciencia.webp')",
                }}
              ></div>
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-4 sm:p-8 text-white">
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-4 text-white drop-shadow">
                  <i className="fas fa-seedling"></i>
                </div>
                <span className="text-lg sm:text-xl font-extrabold mb-1 sm:mb-2 text-white drop-shadow">
                  Nivel 1
                </span>
                <div
                  className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-yellow-400 drop-shadow"
                  data-original-text="Bosque de la Ciencia"
                >
                  Bosque de la Ciencia
                </div>
                <div className="text-sm sm:text-base text-gray-200 drop-shadow font-medium">
                  Sumas Básicas
                </div>
              </div>
            </div>
            {/* Nivel 2 */}
            <div
              className={`relative w-full sm:w-[220px] h-[220px] sm:h-[280px] rounded-2xl transition-all duration-400 shadow-lg overflow-hidden border-4 border-white/30 bg-transparent group hover:border-blue-400 mx-auto
${userLevel < 2 ? "cursor-not-allowed brightness-50" : "cursor-pointer"}
                
              `}
              data-level="2"
              onClick={() => {
                if (userLevel >= 2) navigate("/app/niveles/2");
              }}
            >
              <div
                className="absolute top-0 left-0 w-full h-full bg-black bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: "url('/tomas/centro_de_tecnologia.webp')",
                }}
              ></div>
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-4 sm:p-8 text-white">
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-4 text-white drop-shadow">
                  <i className="fas fa-microchip"></i>
                </div>
                <span className="text-lg sm:text-xl font-extrabold mb-1 sm:mb-2 text-white drop-shadow">
                  Nivel 2
                </span>
                <div
                  className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-yellow-400 drop-shadow"
                  data-original-text="Centro de Tecnología"
                >
                  Centro de Tecnología
                </div>
                <div className="text-sm sm:text-base text-gray-200 drop-shadow font-medium">
                  Restas Básicas
                </div>
              </div>
            </div>
            {/* Nivel 3 */}
            <div
              className={`relative w-full sm:w-[220px] h-[220px] sm:h-[280px] rounded-2xl transition-all duration-400 shadow-lg overflow-hidden border-4 border-white/30 bg-transparent group hover:border-yellow-400 mx-auto
                ${
                  userLevel < 3
                    ? "cursor-not-allowed brightness-50"
                    : "cursor-pointer"
                }
                `}
              data-level="3"
              onClick={() => {
                if (userLevel >= 3) navigate("/app/niveles/3");
              }}
            >
              <div
                className="absolute top-0 left-0 w-full h-full bg-black bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: "url('/tomas/ciudad-matematica.png')",
                }}
              ></div>
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-4 sm:p-8 text-white">
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-4 text-white drop-shadow">
                  <i className="fas fa-city"></i>
                </div>
                <span className="text-lg sm:text-xl font-extrabold mb-1 sm:mb-2 text-white drop-shadow">
                  Nivel 3
                </span>
                <div
                  className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-yellow-400 drop-shadow"
                  data-original-text="Ciudad Matemática"
                >
                  Ciudad Matemática
                </div>
                <div className="text-sm sm:text-base text-gray-200 drop-shadow font-medium">
                  Multiplicación
                </div>
              </div>
            </div>
            {/* Nivel 4 */}
            <div
              className={`relative w-full sm:w-[220px] h-[220px] sm:h-[280px] rounded-2xl transition-all duration-400 shadow-lg overflow-hidden border-4 border-white/30 bg-transparent group hover:border-gray-400 mx-auto
                ${
                  userLevel < 4
                    ? "cursor-not-allowed brightness-50"
                    : "cursor-pointer"
                }
                `}
              data-level="4"
              onClick={() => {
                if (userLevel >= 4) navigate("/app/niveles/4");
              }}
            >
              <div
                className="absolute top-0 left-0 w-full h-full bg-black bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage:
                    "url('/tomas/fortaleza-de-la-ingenieria.png')",
                }}
              ></div>
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-4 sm:p-8 text-white">
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-4 text-white drop-shadow">
                  <i className="fas fa-chess-rook"></i>
                </div>
                <span className="text-lg sm:text-xl font-extrabold mb-1 sm:mb-2 text-white drop-shadow">
                  Nivel 4
                </span>
                <div
                  className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-yellow-400 drop-shadow"
                  data-original-text="Fortaleza de la Ingeniería"
                >
                  Fortaleza de la Ingeniería
                </div>
                <div className="text-sm sm:text-base text-gray-200 drop-shadow font-medium">
                  Geometría
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
