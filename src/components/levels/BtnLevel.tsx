import { useNavigate } from "react-router-dom";

type BtnLevelProps = {
  level: number;
  isUnlocked?: boolean;
  isCurrent?: boolean;
  backgroundImage?: string;
};

export default function BtnLevel({
  level,
  isUnlocked = false,
  isCurrent = false,
  backgroundImage = "",
}: BtnLevelProps) {
  const navigate = useNavigate();
  const levelNames: Record<number, string> = {
    1: "Bosque",
    2: "Tecnología",
    3: "Ciudad",
    4: "Fortaleza",
  };

  return (
    <button
      className={`
                w-20 h-20 rounded-full flex flex-col items-center justify-center relative m-0 mx-[5px] transition-all duration-300
                ${
                  isCurrent
                    ? "border-[3px] border-[#ffd700] shadow-[0_0_20px_rgba(255,215,0,0.6)] scale-110"
                    : "border-2 border-white/60 shadow-[0_5px_15px_rgba(0,0,0,0.3)] scale-100"
                }
                ${
                  isUnlocked
                    ? "cursor-pointer opacity-100"
                    : "cursor-not-allowed opacity-50"
                }
            `}
      style={{
        background: `url('/tomas${backgroundImage}') center/cover, linear-gradient(135deg, ${
          isUnlocked ? "rgba(0,255,0,0.3)" : "rgba(128,128,128,0.7)"
        }, ${isUnlocked ? "rgba(0,128,0,0.5)" : "rgba(64,64,64,0.8)"})`,
        backgroundBlendMode: "overlay",
        backdropFilter: "blur(5px)",
      }}
      onClick={() => isUnlocked && navigate(`/app/niveles/${level}`)}
      disabled={!isUnlocked}
      title={
        isUnlocked
          ? `Ir a Nivel ${level}: ${levelNames[level]}`
          : `Nivel ${level} bloqueado`
      }
    >
      <div className="text-[#ffd700] text-[18px] font-bold mb-[2px] drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
        {level}
      </div>
      <div className="text-white text-[11px] font-bold mt-[2px] text-center drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
        {levelNames[level]}
      </div>
      {!isUnlocked && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[24px]">
          🔒
        </div>
      )}
    </button>
  );
}
