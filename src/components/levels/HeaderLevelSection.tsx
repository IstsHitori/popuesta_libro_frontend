import { BG_IMAGES } from "@/constants/bg-images";
import BtnLevel from "./BtnLevel";

export default function HeaderLevelSection() {
  return (
    <section className="flex justify-center items-center gap-5 my-5 mx-auto p-5 bg-transparent rounded-full border-2 border-white/60 shadow-[0_0_30px_rgba(255,255,255,0.2)] w-[86%] max-w-[1400px] backdrop-filter-none">
      <BtnLevel
        level={1}
        backgroundImage={BG_IMAGES.FOREST}
        isUnlocked={true}
      />

      <BtnLevel
        level={2}
        backgroundImage={BG_IMAGES.TECH}
        isUnlocked={true}
      />

      <BtnLevel 
        level={3} 
        backgroundImage={BG_IMAGES.CITY} 
        isUnlocked={true}
      />

      <BtnLevel 
        level={4} 
        backgroundImage={BG_IMAGES.FORTRESS} 
        isCurrent={true}
        isUnlocked={true}
      />
    </section>
  );
}
