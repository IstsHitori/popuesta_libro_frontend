import EarnedItems from "@/components/levels/EarnedItems";
import HeaderLevelSection from "@/components/levels/HeaderLevelSection";
import MainSectionLeveOne from "@/components/levels/main/MainSectionLeveOne";

export default function LevelOnePage() {
  return (
    <div className="flex items-center flex-col justify-center">
      <HeaderLevelSection />
      <section className="flex items-center justify-center flex-wrap max-2-xl ">
        <MainSectionLeveOne />
        <EarnedItems />
      </section>
    </div>
  );
}
