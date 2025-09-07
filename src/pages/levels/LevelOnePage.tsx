import EarnedItems from "@/components/levels/EarnedItems";
import HeaderLevelSection from "@/components/levels/HeaderLevelSection";
import MainSectionLeveOne from "@/components/levels/main/MainSectionLeveOne_v2";
import LevelLoadingScreen from "@/components/levels/LevelLoadingScreen";
import { useLevelLoading } from "@/hooks/ui/useLevelLoading";
import { LEVEL_LOADING_CONFIG } from "@/constants/level-loading";

export default function LevelOnePage() {
  const { isLoading, completeLoading } = useLevelLoading({ duration: 3500 });

  if (isLoading) {
    return (
      <LevelLoadingScreen
        {...LEVEL_LOADING_CONFIG.level1}
        onLoadingComplete={completeLoading}
      />
    );
  }

  return (
    <div className="min-h-screen">
      <HeaderLevelSection />
      <div className="flex">
        <div className="flex-1">
          <MainSectionLeveOne />
        </div>
        <div className="hidden xl:block w-80">
          <EarnedItems />
        </div>
      </div>
    </div>
  );
}
