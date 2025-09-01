import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import image_kid from "/personajes/personaje_niño.webp";

interface User {
  name: string;
  school: string;
  level: number;
  score: number;
}

export default function GameScreen() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      const tempUser = {
        name: "Explorador",
        school: "Escuela",
        level: 1,
        score: 0,
      };
      localStorage.setItem("currentUser", JSON.stringify(tempUser));
      setUser(tempUser);
    }
  }, []);


  const goToLevels = () => {
    setTimeout(() => {
      navigate("/niveles");
    }, 1500);
  };

  return (
    <div
      id="game-screen"
      className="min-h-screen bg-[url('/niveles/bg_numerika.webp')] bg-no-repeat bg-center bg-cover"
    >
 
      {/* Contenido principal */}
      <main className="p-8">
        {/* Sección de introducción */}
        <section
          id="intro-section"
          className="bg-white/25 backdrop-blur-md rounded-xl p-8 mb-8 shadow-2xl border border-white/20"
        >
          <div className="flex gap-8 items-center">
            <div className="intro-image">
              <img
                src={image_kid}
                alt="Tomás"
                className="w-[300px] rounded-lg shadow-lg transition-transform duration-200 hover:scale-105 animate__animated animate__fadeInLeft"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-white text-2xl mb-4 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
                ¡Bienvenido a la Aventura Matemática!
              </h2>
              <p className="text-white mb-4 text-[1.1rem] drop-shadow-[1px_1px_3px_rgba(0,0,0,0.8)]">
                En lo profundo del universo matemático existe{" "}
                <strong
                  className="text-yellow-400 drop-shadow-[1px_1px_3px_rgba(0,0,0,0.8)]"
                  id="user-name-intro"
                >
                  Numerika
                </strong>
                , un mundo brillante donde todo se mantiene en equilibrio
                gracias a los Cinco Cristales de la Multiplicación.
              </p>
              <p className="text-white mb-4 text-[1.1rem] drop-shadow-[1px_1px_3px_rgba(0,0,0,0.8)]">
                Pero un día apareció{" "}
                <strong
                  className="text-yellow-400 drop-shadow-[1px_1px_3px_rgba(0,0,0,0.8)]"
                  id="user-name-intro"
                >
                  Caós
                </strong>
                , un villano oscuro que odia el orden y la lógica. Con sus
                sombras confunde a los niños, haciéndoles creer que multiplicar
                es demasiado difícil.
              </p>
              <p className="text-white mb-4 text-[1.1rem] drop-shadow-[1px_1px_3px_rgba(0,0,0,0.8)]">
                Los cristales han sido robados y escondidos en distintos
                lugares. Solo un niño o niña valiente podrá recuperarlos.
              </p>
              <p className="text-white mb-4 text-[1.1rem] drop-shadow-[1px_1px_3px_rgba(0,0,0,0.8)]">
                —“Ari, eres el elegido”, dice la voz del maestro guardián.
                —“¿Yo? ¿Y cómo puedo lograrlo?” —“Debes aprender a multiplicar…
                porque la multiplicación es la clave para vencer a Caós”.
              </p>
              <h3 className="text-[#90EE90] text-[1.5rem] my-6 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
                ¿Qué aprenderás?
              </h3>
              <p className="text-white mb-4 text-[1.1rem] drop-shadow-[1px_1px_3px_rgba(0,0,0,0.8)]">
                •{" "}
                <strong className="text-yellow-400 drop-shadow-[1px_1px_3px_rgba(0,0,0,0.8)]">
                  Multiplicación
                </strong>{" "}
                a través de juegos interactivos
              </p>
              <button
                className="bg-gradient-to-br from-secondary to-secondary-dark text-white border-none px-8 py-4 rounded-lg text-[1.2rem] font-semibold cursor-pointer transition flex items-center gap-2 shadow-md mt-6 hover:-translate-y-1 hover:shadow-lg"
                onClick={goToLevels}
              >
                <i className="fas fa-play text-[1.3rem]" />
                ¡Comenzar Aventura!
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
