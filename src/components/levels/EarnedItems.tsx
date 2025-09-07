export default function EarnedItems() {
  return (
    <div
      className="
        relative w-[200px] bg-gradient-to-br from-black/80 to-black/60 rounded-[25px]
        p-[25px_20px] border-[3px] border-white/30 shadow-[0_10px_40px_rgba(0,0,0,0.5)]
        backdrop-blur-[15px] max-h-[600px] overflow-y-auto transition-all duration-300
        flex-shrink-0 ml-0 m-[15px]
        hover:border-white/50 hover:shadow-[0_15px_50px_rgba(0,0,0,0.7)]
      "
      id="premios-sidebar"
    >
      <div
        className="
          text-center mb-[25px] pb-[20px] border-b-[2px] border-white/20
        "
      >
        <h3
          className="
            text-white text-[18px] font-bold mb-[8px]
            shadow-[2px_2px_4px_rgba(0,0,0,0.8)]
          "
        >
          🏆 Premios Ganados
        </h3>
        <p
          className="
            text-[#cccccc] text-[12px] leading-[1.3]
            shadow-[1px_1px_2px_rgba(0,0,0,0.8)]
          "
        >
          ¡Colecciona todo el traje de aventurero!
        </p>
      </div>

      <div className="mb-[25px]">
        <h4
          className="
            text-center mb-[15px] font-bold
            shadow-[1px_1px_2px_rgba(0,0,0,0.8)]
            text-[#ffd700] text-[14px]
          "
        >
          👕 Prendas del Traje
        </h4>
        <div
          className="
            flex flex-col gap-[15px] items-center
          "
          id="premios-prendas-sidebar"
        ></div>
      </div>

      <div className="mb-[25px]">
        <h4
          className="
            text-center mb-[15px] font-bold
            shadow-[1px_1px_2px_rgba(0,0,0,0.8)]
            text-[#00ff88] text-[14px]
          "
        >
          💎 Cristales Mágicos
        </h4>
        <div
          className="
            flex flex-col gap-[15px] items-center
          "
          id="premios-cristales-sidebar"
        ></div>
      </div>

      <div
        className="
          flex justify-between pt-[20px] border-t-[2px] border-white/20
        "
      >
        <div className="text-center flex-1">
          <span
            className="
              block text-white text-[20px] font-bold
              shadow-[1px_1px_2px_rgba(0,0,0,0.8)]
            "
            id="prendas-count"
          >
            0
          </span>
          <span
            className="
              block text-[#cccccc] text-[10px] uppercase tracking-[0.5px] mt-[2px]
            "
          >
            Prendas
          </span>
        </div>
        <div className="text-center flex-1">
          <span
            className="
              block text-white text-[20px] font-bold
              shadow-[1px_1px_2px_rgba(0,0,0,0.8)]
            "
            id="cristales-count"
          >
            0
          </span>
          <span
            className="
              block text-[#cccccc] text-[10px] uppercase tracking-[0.5px] mt-[2px]
            "
          >
            Cristales
          </span>
        </div>
      </div>
    </div>
  );
}
