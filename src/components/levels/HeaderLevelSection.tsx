import { BG_IMAGES } from "@/constants/bg-images";
import { useLevelAccess } from "@/hooks/levels/useLevelAccess";
import BtnLevel from "./BtnLevel";

export default function HeaderLevelSection() {
  const { levelAccess } = useLevelAccess();

  return (
    <section className="flex justify-center items-center gap-5 my-5 mx-auto p-5 bg-transparent rounded-full border-2 border-white/60 shadow-[0_0_30px_rgba(255,255,255,0.2)] w-[86%] max-w-[1400px] backdrop-filter-none">
      {levelAccess.map((level) => (
        <BtnLevel
          key={level.level}
          level={level.level}
          backgroundImage={
            level.level === 1 ? BG_IMAGES.FOREST :
            level.level === 2 ? BG_IMAGES.TECH :
            level.level === 3 ? BG_IMAGES.CITY :
            BG_IMAGES.FORTRESS
          }
          isUnlocked={level.isUnlocked}
          isCurrent={level.isCurrent}
        />
      ))}
    </section>
  );
}
