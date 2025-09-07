
import EarnedItems from "@/components/levels/EarnedItems";
import HeaderLevelSection from "@/components/levels/HeaderLevelSection";
import LevelLoadingScreen from "@/components/levels/LevelLoadingScreen";
import { useLevelLoading } from "@/hooks/ui/useLevelLoading";
import { LEVEL_LOADING_CONFIG } from "@/constants/level-loading";
import CircuitConstructor from "@/components/levels/level-2/CircuitConstructor";

export default function LevelTwoPage() {
  const { isLoading, completeLoading } = useLevelLoading({ duration: 3500 });
  
  if (isLoading) {
    return (
      <LevelLoadingScreen
        {...LEVEL_LOADING_CONFIG.level2}
        onLoadingComplete={completeLoading}
      />
    );
  }

  return (
    <div className="min-h-screen">
      <HeaderLevelSection />
      <div className="flex">
        <div className="flex-1">
          <CircuitConstructor />
        </div>
        <div className="hidden xl:block w-80">
          <EarnedItems />
        </div>
      </div>
    </div>
  );
}
