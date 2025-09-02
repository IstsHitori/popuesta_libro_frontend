import LevelCard from "@/components/levels/LevelCard";

export default function SelectLevelpage() {
  return (
    <>
      <main>
        <section
          id="level-map"
          className="bg-[#0b1220] rounded-2xl p-4 sm:p-8 text-center shadow-xl border border-white/20 mx-auto w-full max-w-[1200px] overflow-visible mt-8 sm:mt-20"
        >
          <h2 className="text-2xl sm:text-4xl mb-6 sm:mb-12 font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow">
            Selecciona tu nivel
          </h2>
          <div className="p-2 sm:p-4 w-full"></div>
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-12 py-4 sm:py-8 w-full max-w-[1000px] flex-wrap mx-auto justify-center items-start">
            {/* Nivel 1 */}
            <LevelCard
              level={1}
              description="Bosque de la Ciencia"
              levelName="Sumas básicas"
            />

            <LevelCard
              level={2}
              description="Centro de tecnología"
              levelName="Restas básicas"
            />

            <LevelCard
              level={3}
              description="Ciudad Matemática"
              levelName="Multiplicación"
            />

            <LevelCard
              level={4}
              description="Fortaliza de Ingeniería"
              levelName="Geometría"
            />
          </div>
        </section>
      </main>
    </>
  );
}
