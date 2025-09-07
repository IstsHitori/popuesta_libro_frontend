
import FortressGame from "@/components/levels/level-4/FortressGame";
import EarnedItems from "@/components/levels/EarnedItems";

export default function LevelFourPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900/30 via-orange-900/30 to-yellow-900/30">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Área de juego principal */}
          <div className="lg:col-span-3">
            <FortressGame />
          </div>
          
          {/* Panel lateral con elementos ganados */}
          <div className="lg:col-span-1">
            <EarnedItems />
          </div>
        </div>
      </div>
    </div>
  );
}
