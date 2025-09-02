import useUserProfile from "@/hooks/profile/useUserProfile";
import { CiLogout } from "react-icons/ci";
import { TfiCup } from "react-icons/tfi";
import { IoIosStar } from "react-icons/io";
import { FaUserAstronaut } from "react-icons/fa";
import useAuth from "@/hooks/auth/useAuth";

export default function HomeHeader() {
  const { userProfile } = useUserProfile();
  const { clearAuthToken } = useAuth();
  if (!userProfile) return null;
  return (
    <header className="px-4 py-3 md:px-8 md:py-4 flex flex-col md:flex-row justify-between items-center shadow-lg border-b border-white/20 bg-white/30 backdrop-blur-xl gap-4 md:gap-0">
      <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
        <div className="w-[48px] h-[48px] md:w-[60px] md:h-[60px] rounded-full border-4 border-indigo-600 shadow-lg flex items-center justify-center bg-gradient-to-br from-[#3a3aeb] to-[#1ec9a7]">
          <FaUserAstronaut className="text-white text-2xl md:text-3xl" />
        </div>
        <div>
          <h3 className="text-white text-[1rem] md:text-[1.2rem] mb-1">
            {userProfile.name || "Usuario"}
          </h3>
          <p className="text-white text-[0.85rem] md:text-[0.9rem]">
            {userProfile?.school || "Escuela"}
          </p>
        </div>
      </div>
      <div className="flex gap-3 md:gap-6 w-full md:w-auto justify-center">
        <div className="flex items-center gap-1 md:gap-2 text-white font-semibold px-2 md:px-3 py-1 md:py-2 rounded-[12px] md:rounded-[15px] bg-white/10 border border-white/20">
          <IoIosStar className="text-xl md:text-2xl text-yellow-400" />
          <span className="text-[0.9rem] md:text-base">{userProfile?.score ?? 0} puntos</span>
        </div>
        <div className="flex items-center gap-1 md:gap-2 text-white font-semibold px-2 md:px-3 py-1 md:py-2 rounded-[12px] md:rounded-[15px] bg-white/10 border border-white/20">
          <TfiCup className="text-xl md:text-2xl text-yellow-400" />
          <span className="text-[0.9rem] md:text-base">Nivel {userProfile?.level ?? 1} actual</span>
        </div>
      </div>
      <button
        onClick={() => clearAuthToken()}
        className="bg-error text-white border-none px-3 md:px-4 py-2 md:py-3 rounded-md cursor-pointer transition shadow-sm flex items-center gap-1 md:gap-2 hover:bg-red-700 hover:-translate-y-0.5 hover:shadow-md w-full md:w-auto justify-center"
      >
        <CiLogout className="text-lg md:text-xl" />
        <span className="hidden sm:inline">Salir</span>
      </button>
    </header>
  );
}
