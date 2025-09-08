import { useCoinsStore } from '../../stores/coins.store';
import useUserProfile from '@/hooks/profile/useUserProfile';
import type { UserEarnedItems } from '@/types/user.type';

export default function EarnedItems() {
  const { coins, totalEarned, totalLost } = useCoinsStore();
  const { userProfile } = useUserProfile();

  // Separar items por tipo desde el perfil del usuario
  const userItems = userProfile?.items || [];
  const earnedGarments = userItems.filter((item: UserEarnedItems) => item.item_type === 'garment');
  const earnedCrystals = userItems.filter((item: UserEarnedItems) => item.item_type === 'crystal');
  
  const garmentCount = earnedGarments.length;
  const crystalCount = earnedCrystals.length;

  // Debug logs
  console.log('User Profile:', userProfile);
  console.log('User Items:', userItems);
  console.log('Earned Garments:', earnedGarments);
  console.log('Earned Crystals:', earnedCrystals);

  // Mapear items a imágenes (puedes ajustar estas rutas según tu estructura)
  const getItemImage = (itemName: string, itemType: string) => {
    const name = itemName.toLowerCase();
    
    if (itemType === 'garment') {
      if (name.includes('cinturón') || name.includes('cinturon') || name.includes('belt')) {
        return '/tomas/premios/prendas/cinturon.webp';
      }
      if (name.includes('pechera') || name.includes('chest') || name.includes('protector')) {
        return '/tomas/premios/prendas/pechera.webp';
      }
      if (name.includes('botas') || name.includes('boots')) {
        return '/tomas/premios/prendas/botas.webp';
      }
      if (name.includes('casco') || name.includes('helmet')) {
        return '/tomas/premios/prendas/casco.webp';
      }
      if (name.includes('guantes') || name.includes('gloves')) {
        return '/tomas/premios/prendas/guantes.webp';
      }
      return '/tomas/premios/prendas/cinturon.webp'; // Default
    } else {
      if (name.includes('rojo') || name.includes('red')) {
        return '/tomas/premios/cristales/cristal rojo.webp';
      }
      if (name.includes('amarillo') || name.includes('yellow')) {
        return '/tomas/premios/cristales/cristal amarillo.webp';
      }
      if (name.includes('gris') || name.includes('gray') || name.includes('grey')) {
        return '/tomas/premios/cristales/cristal gris.webp';
      }
      if (name.includes('verde') || name.includes('green')) {
        return '/tomas/premios/cristales/cristal verde.webp';
      }
      if (name.includes('azul') || name.includes('blue')) {
        return '/tomas/premios/cristales/cristal azul.webp';
      }
      return '/tomas/premios/cristales/cristal rojo.webp'; // Default
    }
  };

  // Obtener color del cristal basado en el nombre
  const getCrystalColor = (itemName: string) => {
    const name = itemName.toLowerCase();
    if (name.includes('rojo') || name.includes('red')) return 'red';
    if (name.includes('amarillo') || name.includes('yellow')) return 'yellow';
    if (name.includes('gris') || name.includes('gray') || name.includes('grey')) return 'gray';
    if (name.includes('verde') || name.includes('green')) return 'green';
    if (name.includes('azul') || name.includes('blue')) return 'blue';
    return 'gray';
  };
  return (
    <div
      className="
        relative w-[200px] bg-gradient-to-br from-black/80 to-black/60 rounded-[25px]
        p-[25px_20px] border-[3px] border-white/30 shadow-[0_10px_40px_rgba(0,0,0,0.5)]
        backdrop-blur-[15px] max-h-[600px] overflow-y-auto transition-all duration-300
        flex-shrink-0 ml-0 m-[15px]
        hover:border-white/50 hover:shadow-[0_15px_50px_rgba(0,0,0,0.7)]
      "
      id="premios-sidebar"
    >
      <div
        className="
          text-center mb-[25px] pb-[20px] border-b-[2px] border-white/20
        "
      >
        <h3
          className="
            text-white text-[18px] font-bold mb-[8px]
            shadow-[2px_2px_4px_rgba(0,0,0,0.8)]
          "
        >
          🏆 Premios Ganados
        </h3>
        <p
          className="
            text-[#cccccc] text-[12px] leading-[1.3]
            shadow-[1px_1px_2px_rgba(0,0,0,0.8)]
          "
        >
          ¡Colecciona todo el traje de aventurero!
        </p>
      </div>

      <div className="mb-[25px]">
        <h4
          className="
            text-center mb-[15px] font-bold
            shadow-[1px_1px_2px_rgba(0,0,0,0.8)]
            text-[#ffd700] text-[14px]
          "
        >
          👕 Prendas del Traje
        </h4>
        <div
          className="
            flex flex-col gap-[15px] items-center
          "
          id="premios-prendas-sidebar"
        >
          {earnedGarments.length === 0 ? (
            <div className="text-white/50 text-sm text-center py-4">
              🎯 Completa niveles para ganar prendas
            </div>
          ) : (
            earnedGarments.map((garment) => (
              <div
                key={garment.id}
                className="
                  w-16 h-16 rounded-lg border-2 border-yellow-500/50 
                  bg-gradient-to-br from-yellow-500/20 to-amber-600/20
                  flex items-center justify-center relative overflow-hidden
                  hover:border-yellow-400 transition-all duration-300
                  shadow-lg hover:shadow-yellow-500/25
                "
                title={garment.name}
              >
                <img
                  src={getItemImage(garment.name, garment.item_type)}
                  alt={garment.name}
                  className="w-12 h-12 object-contain"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border border-white flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mb-[25px]">
        <h4
          className="
            text-center mb-[15px] font-bold
            shadow-[1px_1px_2px_rgba(0,0,0,0.8)]
            text-[#00ff88] text-[14px]
          "
        >
          💎 Cristales Mágicos
        </h4>
        <div
          className="
            flex flex-col gap-[15px] items-center
          "
          id="premios-cristales-sidebar"
        >
          {earnedCrystals.length === 0 ? (
            <div className="text-white/50 text-sm text-center py-4">
              💎 Completa niveles para ganar cristales
            </div>
          ) : (
            earnedCrystals.map((crystal) => {
              const crystalColor = getCrystalColor(crystal.name);
              return (
                <div
                  key={crystal.id}
                  className={`
                    w-16 h-16 rounded-lg border-2 
                    ${crystalColor === 'red' ? 'border-red-500/50 bg-gradient-to-br from-red-500/20 to-red-600/20' : ''}
                    ${crystalColor === 'yellow' ? 'border-yellow-500/50 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20' : ''}
                    ${crystalColor === 'gray' ? 'border-gray-500/50 bg-gradient-to-br from-gray-500/20 to-gray-600/20' : ''}
                    ${crystalColor === 'green' ? 'border-green-500/50 bg-gradient-to-br from-green-500/20 to-green-600/20' : ''}
                    ${crystalColor === 'blue' ? 'border-blue-500/50 bg-gradient-to-br from-blue-500/20 to-blue-600/20' : ''}
                    flex items-center justify-center relative overflow-hidden
                    hover:border-opacity-75 transition-all duration-300
                    shadow-lg hover:shadow-lg
                  `}
                  title={crystal.name}
                >
                  <img
                    src={getItemImage(crystal.name, crystal.item_type)}
                    alt={crystal.name}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border border-white flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Sección de Monedas */}
      <div className="mb-[25px]">
        <h4
          className="
            text-center mb-[15px] font-bold
            shadow-[1px_1px_2px_rgba(0,0,0,0.8)]
            text-[#ffd700] text-[14px]
          "
        >
          🪙 Monedas del Tesoro
        </h4>
        <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-lg p-3 border border-yellow-500/30">
          <div className="text-center">
            <div className="text-yellow-400 text-2xl font-bold mb-1">{coins}</div>
            <div className="text-yellow-300/80 text-xs mb-2">Monedas Actuales</div>
            <div className="flex justify-between text-xs">
              <span className="text-green-400">+{totalEarned}</span>
              <span className="text-red-400">-{totalLost}</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="
          flex justify-between pt-[20px] border-t-[2px] border-white/20
        "
      >
        <div className="text-center flex-1">
          <span
            className="
              block text-white text-[20px] font-bold
              shadow-[1px_1px_2px_rgba(0,0,0,0.8)]
            "
            id="prendas-count"
          >
            {garmentCount}
          </span>
          <span
            className="
              block text-[#cccccc] text-[10px] uppercase tracking-[0.5px] mt-[2px]
            "
          >
            Prendas
          </span>
        </div>
        <div className="text-center flex-1">
          <span
            className="
              block text-white text-[20px] font-bold
              shadow-[1px_1px_2px_rgba(0,0,0,0.8)]
            "
            id="cristales-count"
          >
            {crystalCount}
          </span>
          <span
            className="
              block text-[#cccccc] text-[10px] uppercase tracking-[0.5px] mt-[2px]
            "
          >
            Cristales
          </span>
        </div>
        <div className="text-center flex-1">
          <span
            className="
              block text-yellow-400 text-[20px] font-bold
              shadow-[1px_1px_2px_rgba(0,0,0,0.8)]
            "
          >
            {coins}
          </span>
          <span
            className="
              block text-[#cccccc] text-[10px] uppercase tracking-[0.5px] mt-[2px]
            "
          >
            Monedas
          </span>
        </div>
      </div>
    </div>
  );
}
