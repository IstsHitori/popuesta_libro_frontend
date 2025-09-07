import EarnedItems from "@/components/levels/EarnedItems";
import HeaderLevelSection from "@/components/levels/HeaderLevelSection";
import MainSectionLeveOne from "@/components/levels/main/MainSectionLeveOne_v2";

export default function LevelOnePage() {
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
