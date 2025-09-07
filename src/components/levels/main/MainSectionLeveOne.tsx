import DropResponses from "../level-1/DropResponses";
import Response from "../level-1/Response";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import tomas_1 from "/tomas/nivel_1.webp";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

export default function MainSectionLeveOne() {
  const handleDragEnd = (e: DragEndEvent) => {
    const { over, active } = e;

    if (over && over.id) {
      console.log("valido", active.id);
    } else {
      console.log("No valido");
    }
  };


  return (
    <article
      className="
        flex flex-col gap-4 sm:gap-6 lg:gap-8 
        p-3 sm:p-6 lg:p-8 
        m-1 sm:m-2 lg:m-4
        bg-transparent
        rounded-[15px] sm:rounded-[20px] lg:rounded-[25px]
        shadow-[0_0_20px_rgba(255,255,255,0.15)] sm:shadow-[0_0_25px_rgba(255,255,255,0.2)] lg:shadow-[0_0_30px_rgba(255,255,255,0.2)]
        items-start
        w-full max-w-[95vw] sm:max-w-[90vw] lg:max-w-[1000px]
      "
    >
      {/* Main level container */}
      <div
        className="
        flex flex-col xl:flex-row gap-3 sm:gap-4 lg:gap-6 xl:gap-8 
        items-start w-full 
        bg-transparent 
        border border-white/40 sm:border-2 sm:border-white/60 
        rounded-[15px] sm:rounded-[20px] lg:rounded-[25px] 
        p-3 sm:p-4 lg:p-6 xl:p-8 
        m-1 sm:m-2 lg:m-4 
        shadow-[0_0_20px_rgba(255,255,255,0.15)] sm:shadow-[0_0_25px_rgba(255,255,255,0.2)] lg:shadow-[0_0_30px_rgba(255,255,255,0.2)]
      "
      >
        {/* Level image */}
        <div className="flex-shrink-0 w-full lg:w-2/5 mb-4 lg:mb-0">
          <img
            src={tomas_1}
            alt={`Nivel 1`}
            className="w-full rounded-[15px] shadow-[0_10px_25px_rgba(0,0,0,0.3)]"
          />
        </div>

        {/* Level content */}
        <div className="flex-1 bg-transparent border-none rounded-none p-3 sm:p-5">
          <div className="mb-4 sm:mb-6 border-b-1 pb-4">
            <h2
              className="text-white text-[22px] sm:text-[28px] mb-4 sm:mb-6"
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
            >
              El reto del mercado de café
            </h2>
            <div
              className="inline-block font-bold ml-2 px-3 sm:px-4 py-1 sm:py-2 rounded-[25px] bg-black/60 text-[#ffd700]"
              style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
            >
              Nivel 1
            </div>
          </div>

          <div className="mb-4 sm:mb-5">
            <p
              className="text-white text-[15px] sm:text-[16px] leading-relaxed mb-4 sm:mb-5"
              style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.8)" }}
            >
              Ari entra a un bosque mágico donde los árboles guardan frutas
              iguales. Pero Caós aparece:—“¡Nunca entenderás esto! Las sumas te
              confundirán y jamás obtendrás el cristal”.Tika explica:—Mira Ari,
              la multiplicación comienza con sumar lo mismo varias veces. Por
              ejemplo, si tienes 2 manzanas en cada árbol y hay 4 árboles, en
              vez de sumar 2+2+2+2, puedes multiplicar 2×4”.
            </p>
          </div>

          <div className="mb-4 sm:mb-6">
            <h3
              className="text-[#90EE90] text-[18px] sm:text-[22px] mb-4 sm:mb-6"
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
            >
              🧩 ¿Cuántos kilos hay en total?
            </h3>
          </div>

          {/* Options container */}
          <div className="flex justify-center items-center gap-2 sm:gap-3 flex-wrap min-h-[80px] sm:min-h-[100px] p-2 sm:p-3 relative mb-4 sm:mb-6">
            <DndContext onDragEnd={handleDragEnd}>
              <div className="w-full lg:w-auto mt-4 lg:mt-0">
                <DropResponses status="3x3" />
                <Response />
              </div>
            </DndContext>
          </div>

          <div className="flex justify-center gap-3 sm:gap-5 mt-6 sm:mt-8">
            <Link to={"/app/niveles"} className=" flex items-center p-2 cursor-pointer hover:bg-blue-500/90 transition-all bg-blue-500  text-white text-sm rounded-xl">
              <IoIosArrowRoundBack className="text-xl" />
              Volver al mapa
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
