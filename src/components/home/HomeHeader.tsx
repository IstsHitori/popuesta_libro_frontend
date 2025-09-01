import useUserProfile from "@/hooks/profile/useUserProfile";
import { CiLogout } from "react-icons/ci";
import { TfiCup } from "react-icons/tfi";
import { IoIosStar } from "react-icons/io";
import { FaUserAstronaut } from "react-icons/fa";

export default function HomeHeader() {
  const { userProfile } = useUserProfile();
  if (!userProfile) return;
  return (
    <>
      {/* Header del juego */}
      <header className="px-8 py-4 flex justify-between items-center shadow-lg border-b border-white/20 bg-white/30  backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-[60px] h-[60px] rounded-full border-4 border-indigo-600 shadow-lg flex items-center justify-center bg-gradient-to-br from-[#3a3aeb] to-[#1ec9a7]">
            <FaUserAstronaut className="text-white text-3xl" />
          </div>
          <div>
            <h3 className="text-white text-[1.2rem] mb-1">
              {userProfile.name || "Usuario"}
            </h3>
            <p className="text-white text-[0.9rem]">
              {userProfile?.school || "Escuela"}
            </p>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="flex items-center gap-2 text-white font-semibold px-3 py-2 rounded-[15px] bg-white/10 border border-white/20">
            <IoIosStar className="text-2xl text-yellow-400" />
            <span>{userProfile?.score ?? 0} puntos</span>
          </div>
          <div className="flex items-center gap-2 text-white font-semibold px-3 py-2 rounded-[15px] bg-white/10 border border-white/20">
            <TfiCup className="text-2xl text-yellow-400" />
            <span>Nivel {userProfile?.level ?? 1} actual</span>
          </div>
        </div>
        <button className="bg-error text-white border-none px-4 py-3 rounded-md cursor-pointer transition shadow-sm flex items-center gap-2 hover:bg-red-700 hover:-translate-y-0.5 hover:shadow-md">
          <CiLogout className="text-xl" />
          Salir
        </button>
      </header>
    </>
  );
}
