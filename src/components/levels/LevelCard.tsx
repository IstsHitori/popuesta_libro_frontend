import useUserProfile from "@/hooks/profile/useUserProfile";
import { useNavigate } from "react-router-dom";

type LevelCardProps = {
  level: number;
  description: string;
  levelName: string;
};

export default function LevelCard({
  level,
  description,
  levelName,
}: LevelCardProps) {
  const { userProfile } = useUserProfile();
  const userLevel = userProfile.level;
  const navigate = useNavigate();

  const getImagePathByLevel = () => {
    const paths = [
      "bosque_de_la_ciencia.webp",
      "centro_de_tecnologia.webp",
      "ciudad-matematica.png",
      "fortaleza-de-la-ingenieria.png",
    ];
    return level > 0 ? paths[level - 1] : "Nothing";
  };

  return (
    <div
      className={`relative w-full sm:w-[220px] h-[220px] sm:h-[280px] rounded-2xl transition-all duration-400 shadow-lg overflow-hidden border-4 border-white/30 bg-transparent group mx-auto ${
        userLevel < level
          ? "cursor-not-allowed brightness-50"
          : "cursor-pointer"
      } ${
        level === 1
          ? "hover:border-green-300"
          : level === 2
          ? "hover:border-blue-400"
          : level === 3
          ? "hover:border-yellow-300"
          : level === 4
          ? "hover:border-gray-300"
          : ""
      }`}
      onClick={() => {
        if (userLevel >= level) navigate(`/app/niveles/${level}`);
      }}
    >
      <div
        className="absolute top-0 left-0 w-full h-full bg-black bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{
          backgroundImage: `url('/tomas/${getImagePathByLevel()}')`,
        }}
      ></div>
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-4 sm:p-8 text-white">
        <div className="text-2xl sm:text-3xl mb-2 sm:mb-4 text-white drop-shadow">
          <i className="fas fa-seedling"></i>
        </div>
        <span className="text-lg sm:text-xl font-extrabold mb-1 sm:mb-2 text-white drop-shadow">
          Nivel {`${level}`}
        </span>
        <div
          className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-yellow-400 drop-shadow"
          data-original-text="Bosque de la Ciencia"
        >
          {description}
        </div>
        <div className="text-sm sm:text-base text-gray-200 drop-shadow font-medium">
          {levelName}
        </div>
      </div>
    </div>
  );
}
