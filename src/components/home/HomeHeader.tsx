import useUserProfile from "@/hooks/profile/useUserProfile";

export default function HomeHeader() {
  const { userProfile } = useUserProfile();
  if (!userProfile) return;
  console.log(userProfile)
  return (
    <>
      {/* Header del juego */}
      <header className="bg-white/25 backdrop-blur-[25px] px-8 py-4 flex justify-between items-center shadow-2xl border-b border-white/20">
        <div className="flex items-center gap-4">
          <div className="w-[50px] h-[50px] rounded-full border-4 border-primary shadow-md flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
            <i className="fas fa-user-astronaut text-white text-[1.5rem]" />
          </div>
          <div>
            <h3 className="text-white text-[1.2rem] mb-1">
              {userProfile.name}
            </h3>
            <p className="text-white text-[0.9rem]">
              {userProfile?.school || "Escuela"}
            </p>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="flex items-center gap-2 text-white font-semibold px-3 py-2 rounded-[15px] bg-white/10 border border-white/20">
            <i className="fas fa-star text-accent text-[1.2rem]" />
            <span>{userProfile?.score ?? 0}</span>
          </div>
          <div className="flex items-center gap-2 text-white font-semibold px-3 py-2 rounded-[15px] bg-white/10 border border-white/20">
            <i className="fas fa-trophy text-accent text-[1.2rem]" />
            <span>Nivel {userProfile?.level ?? 1}</span>
          </div>
        </div>
        <button className="bg-error text-white border-none px-4 py-3 rounded-md cursor-pointer transition shadow-sm flex items-center gap-2 hover:bg-red-700 hover:-translate-y-0.5 hover:shadow-md">
          <i className="fas fa-sign-out-alt" />
          Salir
        </button>
      </header>
    </>
  );
}
