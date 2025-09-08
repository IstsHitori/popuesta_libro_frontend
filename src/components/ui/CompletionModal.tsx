import { useEffect, useState } from 'react';
import { useEarnedItemsStore } from '../../stores/earned-items.store';

interface CompletionModalProps {
  isVisible: boolean;
  level?: number; // Nivel completado
  onClose: () => void;
}

export default function CompletionModal({ isVisible, level, onClose }: CompletionModalProps) {
  const { getAllEarnedGarments, getAllEarnedCrystals, getEarnedItemsCount, markModalAsShown } = useEarnedItemsStore();
  const [showFinalReward, setShowFinalReward] = useState(false);
  
  const earnedGarments = getAllEarnedGarments();
  const earnedCrystals = getAllEarnedCrystals();
  const { garments: garmentCount, crystals: crystalCount } = getEarnedItemsCount();
  
  // Verificar si se completaron todos los niveles
  const allLevelsComplete = garmentCount === 4 && crystalCount === 4;

  const handleClose = () => {
    if (level) {
      markModalAsShown(level);
    }
    onClose();
  };

  useEffect(() => {
    if (isVisible && allLevelsComplete) {
      // Mostrar recompensa final después de un breve delay
      const timer = setTimeout(() => {
        setShowFinalReward(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowFinalReward(false);
    }
  }, [isVisible, allLevelsComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 rounded-2xl p-8 max-w-md w-full border-2 border-yellow-500/50 shadow-2xl">
        {!showFinalReward ? (
          // Modal normal de nivel completado
          <>
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-yellow-400 mb-2">
                🎉 ¡Nivel Completado! 🎉
              </h2>
              <p className="text-white/90 text-lg">
                ¡Excelente trabajo, Ari!
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-black/30 rounded-lg p-4">
                <h3 className="text-yellow-300 font-bold mb-2 text-center">🏆 Recompensas Ganadas</h3>
                <div className="flex justify-center gap-4">
                  {earnedGarments.slice(-1).map((garment) => (
                    <div key={garment.id} className="text-center">
                      <div className="w-16 h-16 mx-auto mb-2 rounded-lg border-2 border-yellow-500/50 bg-gradient-to-br from-yellow-500/20 to-amber-600/20 flex items-center justify-center">
                        <img src={garment.image} alt={garment.name} className="w-12 h-12 object-contain" />
                      </div>
                      <p className="text-white/80 text-xs">{garment.name}</p>
                    </div>
                  ))}
                  {earnedCrystals.slice(-1).map((crystal) => (
                    <div key={crystal.id} className="text-center">
                      <div className={`w-16 h-16 mx-auto mb-2 rounded-lg border-2 ${
                        crystal.color === 'red' ? 'border-red-500/50 bg-gradient-to-br from-red-500/20 to-red-600/20' :
                        crystal.color === 'yellow' ? 'border-yellow-500/50 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20' :
                        crystal.color === 'gray' ? 'border-gray-500/50 bg-gradient-to-br from-gray-500/20 to-gray-600/20' :
                        crystal.color === 'green' ? 'border-green-500/50 bg-gradient-to-br from-green-500/20 to-green-600/20' : ''
                      } flex items-center justify-center`}>
                        <img src={crystal.image} alt={crystal.name} className="w-12 h-12 object-contain" />
                      </div>
                      <p className="text-white/80 text-xs">{crystal.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {allLevelsComplete && (
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-4 border border-yellow-500/30">
                  <p className="text-yellow-300 text-center font-bold">
                    ✨ ¡Preparándose para la recompensa final! ✨
                  </p>
                </div>
              )}
            </div>

            {!allLevelsComplete && (
              <button
                onClick={handleClose}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                ¡Continuar Aventura!
              </button>
            )}
          </>
        ) : (
          // Modal de recompensa final - todos los niveles completados
          <>
            <div className="text-center mb-6">
              <h2 className="text-4xl font-bold text-yellow-400 mb-4 animate-pulse">
                🏆 ¡AVENTURA COMPLETADA! 🏆
              </h2>
              <p className="text-white text-lg mb-2">
                ¡Felicidades, Ari!
              </p>
              <p className="text-white/90 text-sm">
                Has completado todos los niveles y reunido el traje completo del aventurero matemático.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg p-6 mb-6 border-2 border-yellow-500/50">
              <h3 className="text-yellow-300 font-bold mb-4 text-center text-xl">
                🎖️ Colección Completa
              </h3>
              
              <div className="grid grid-cols-4 gap-3 mb-4">
                {earnedGarments.map((garment) => (
                  <div key={garment.id} className="text-center">
                    <div className="w-12 h-12 mx-auto mb-1 rounded-lg border border-yellow-500/50 bg-gradient-to-br from-yellow-500/20 to-amber-600/20 flex items-center justify-center">
                      <img src={garment.image} alt={garment.name} className="w-8 h-8 object-contain" />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-4 gap-3">
                {earnedCrystals.map((crystal) => (
                  <div key={crystal.id} className="text-center">
                    <div className={`w-12 h-12 mx-auto mb-1 rounded-lg border ${
                      crystal.color === 'red' ? 'border-red-500/50 bg-gradient-to-br from-red-500/20 to-red-600/20' :
                      crystal.color === 'yellow' ? 'border-yellow-500/50 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20' :
                      crystal.color === 'gray' ? 'border-gray-500/50 bg-gradient-to-br from-gray-500/20 to-gray-600/20' :
                      crystal.color === 'green' ? 'border-green-500/50 bg-gradient-to-br from-green-500/20 to-green-600/20' : ''
                    } flex items-center justify-center`}>
                      <img src={crystal.image} alt={crystal.name} className="w-8 h-8 object-contain" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center space-y-2 mb-6">
              <p className="text-yellow-300 font-bold">
                🌟 ¡Eres oficialmente un Maestro Matemático! 🌟
              </p>
              <p className="text-white/80 text-sm">
                Has demostrado tu destreza en multiplicación, suma repetida, operaciones y resolución de problemas.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl text-lg"
            >
              🎉 ¡Celebrar Victoria! 🎉
            </button>
          </>
        )}
      </div>
    </div>
  );
}
