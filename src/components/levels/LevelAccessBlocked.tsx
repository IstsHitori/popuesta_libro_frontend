import { Link } from 'react-router-dom';
import { useLevelAccess } from '@/hooks/levels/useLevelAccess';

interface LevelAccessBlockedProps {
  requiredLevel: number;
}

export default function LevelAccessBlocked({ requiredLevel }: LevelAccessBlockedProps) {
  const { maxUnlockedLevel } = useLevelAccess();

  const levelNames: Record<number, string> = {
    1: "Bosque de la Ciencia",
    2: "Centro de Tecnología", 
    3: "Ciudad Matemática",
    4: "Fortaleza de la Ingeniería"
  };

  const previousLevelName = levelNames[requiredLevel - 1];
  const currentLevelName = levelNames[requiredLevel];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="text-center text-white max-w-md mx-auto p-8 bg-black/30 rounded-xl backdrop-blur-sm border border-white/20">
        {/* Icono de candado */}
        <div className="text-8xl mb-6">🔒</div>
        
        {/* Título */}
        <h1 className="text-3xl font-bold mb-4 text-yellow-300">
          Nivel Bloqueado
        </h1>
        
        {/* Mensaje principal */}
        <p className="text-xl mb-6 leading-relaxed">
          Para acceder al <span className="font-bold text-blue-300">{currentLevelName}</span>, 
          primero debes completar el <span className="font-bold text-green-300">{previousLevelName}</span>.
        </p>
        
        {/* Información del progreso */}
        <div className="bg-white/10 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-200 mb-2">Tu progreso actual:</p>
          <p className="text-lg font-bold text-yellow-300">
            Nivel {maxUnlockedLevel} desbloqueado
          </p>
        </div>
        
        {/* Botones de navegación */}
        <div className="flex flex-col gap-3">
          <Link
            to={`/app/niveles/${maxUnlockedLevel}`}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Ir al Nivel {maxUnlockedLevel}
          </Link>
          
          <Link
            to="/app/niveles"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Seleccionar Nivel
          </Link>
        </div>
        
        {/* Motivación */}
        <p className="text-sm text-gray-300 mt-6 italic">
          ¡Sigue adelante en tu aventura matemática con Ari!
        </p>
      </div>
    </div>
  );
}
