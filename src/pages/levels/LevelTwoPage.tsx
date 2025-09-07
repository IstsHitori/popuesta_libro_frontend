
import HeaderLevelSection from "@/components/levels/HeaderLevelSection";
import LevelLoadingScreen from "@/components/levels/LevelLoadingScreen";
import { useLevelLoading } from "@/hooks/ui/useLevelLoading";
import { LEVEL_LOADING_CONFIG } from "@/constants/level-loading";
import RepeatedAdditionGame from "@/components/levels/level-2/RepeatedAdditionGame";

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
      <RepeatedAdditionGame />
    </div>
  );
}
