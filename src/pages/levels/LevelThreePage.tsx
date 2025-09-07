
import EarnedItems from "@/components/levels/EarnedItems";
import HeaderLevelSection from "@/components/levels/HeaderLevelSection";
import LevelLoadingScreen from "@/components/levels/LevelLoadingScreen";
import { useLevelLoading } from "@/hooks/ui/useLevelLoading";
import { LEVEL_LOADING_CONFIG } from "@/constants/level-loading";
import MathCityGame from "@/components/levels/level-3/MathCityGame";

export default function LevelThreePage() {
  const { isLoading, completeLoading } = useLevelLoading({ duration: 3500 });
  
  if (isLoading) {
    return (
      <LevelLoadingScreen
        {...LEVEL_LOADING_CONFIG.level3}
        onLoadingComplete={completeLoading}
      />
    );
  }

  return (
    <div className="min-h-screen">
      <HeaderLevelSection />
      <div className="flex">
        <div className="flex-1">
          <MathCityGame />
        </div>
        <div className="hidden xl:block w-80">
          <EarnedItems />
        </div>
      </div>
    </div>
  );
}
