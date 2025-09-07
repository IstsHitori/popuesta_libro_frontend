
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function LevelTwoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20 flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto p-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8">
          <h1 className="text-white text-4xl font-bold mb-6">
            🎉 ¡Nivel 2! 🎉
          </h1>
          
          <div className="text-6xl mb-6">🏗️</div>
          
          <h2 className="text-white text-2xl font-bold mb-4">
            ¡Próximamente!
          </h2>
          
          <p className="text-white/90 text-lg mb-8 leading-relaxed">
            Has completado exitosamente el Nivel 1 donde aprendiste sobre multiplicación 
            como suma repetida y formación de grupos iguales. 
          </p>
          
          <p className="text-green-400 text-base mb-8">
            El Nivel 2 estará disponible pronto con nuevos desafíos matemáticos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/app/niveles/nivel-1" 
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-semibold"
            >
              <IoIosArrowRoundBack className="text-xl" />
              Volver al Nivel 1
            </Link>
            
            <Link 
              to="/app/niveles" 
              className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-semibold"
            >
              Ver Todos los Niveles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
