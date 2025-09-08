import { useState, useEffect } from 'react';

interface LevelLoadingScreenProps {
  levelNumber: number;
  levelTitle: string;
  backgroundImage: string;
  tip: string;
  onLoadingComplete: () => void;
  duration?: number; // duración en milisegundos
}

export default function LevelLoadingScreen({
  levelNumber,
  levelTitle,
  backgroundImage,
  tip,
  onLoadingComplete,
  duration = 3000
}: LevelLoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [showTip, setShowTip] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Mostrar el tip después de 300ms
    const tipTimer = setTimeout(() => {
      setShowTip(true);
    }, 300);

    // Progreso de carga más suave
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Activar animación de salida
          setIsExiting(true);
          // Completar después de la animación
          setTimeout(onLoadingComplete, 600);
          return 100;
        }
        // Progreso más gradual: 1% cada iteración
        return prev + 1;
      });
    }, duration / 100); // 100 pasos para llegar al 100%

    return () => {
      clearTimeout(tipTimer);
      clearInterval(progressInterval);
    };
  }, [duration, onLoadingComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Efectos de partículas/elementos flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => {
          // Posiciones y animaciones más suaves
          const animationDelay = `${Math.random() * 5}s`;
          
          // Diferentes tipos de movimiento suave
          const getCustomAnimation = () => {
            const animations = [
              'gentle-float',
              'slow-drift', 
              'subtle-sway',
              'soft-pulse'
            ];
            return animations[i % animations.length];
          };
          
          const getIcon = () => {
            if (levelNumber === 1) {
              return ['🍃', '🌿', '🍎', '🌳'][i % 4];
            } else if (levelNumber === 2) {
              return ['⚙️', '🔧', '💡', '⚡'][i % 4];
            } else if (levelNumber === 3) {
              return ['🏗️', '🔮', '🎯', '💎'][i % 4];
            } else {
              return ['🏰', '⚔️', '🛡️', '👑'][i % 4];
            }
          };
          
          return (
            <div
              key={i}
              className={`absolute opacity-20 text-xl transition-all duration-1000 ${getCustomAnimation()}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: animationDelay
              }}
            >
              {getIcon()}
            </div>
          );
        })}
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 text-center p-8 max-w-md mx-4">
        {/* Título del nivel */}
        <div className="mb-6">
          <div 
            className="inline-block px-6 py-2 bg-black/60 rounded-full border-2 border-yellow-400 mb-4"
          >
            <span className="text-yellow-400 font-bold text-lg">
              Nivel {levelNumber}
            </span>
          </div>
          <h1 
            className="text-white text-2xl sm:text-3xl font-bold mb-2"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
          >
            {levelTitle}
          </h1>
        </div>

        {/* Spinner de carga */}
        <div className="relative mb-6">
          <div className="w-20 h-20 mx-auto mb-4">
            <div className="w-full h-full border-4 border-white/30 border-t-4 border-t-yellow-400 rounded-full animate-spin"></div>
          </div>
          <p className="text-white/80 text-sm">
            Cargando experiencia...
          </p>
        </div>

        {/* Barra de progreso */}
        <div className="mb-6">
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-green-400 transition-all duration-100 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/60 text-xs mt-1">
            {Math.round(progress)}%
          </p>
        </div>

        {/* Tip educativo */}
        <div 
          className={`transition-all duration-500 transform ${
            showTip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">💡</span>
              </div>
              <div className="text-left">
                <h3 className="text-yellow-400 font-semibold text-sm mb-1">
                  Consejo del nivel
                </h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  {tip}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Efecto de brillo en los bordes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
      </div>
    </div>
  );
}
