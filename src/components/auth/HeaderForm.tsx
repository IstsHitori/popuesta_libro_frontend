import { FaBrain } from "react-icons/fa";

export default function HeaderForm() {
  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <div
          className="
              w-[70px] h-[70px]
              bg-gradient-to-br from-[#4f5bd5] to-[#43e97b]
              rounded-full flex items-center justify-center mx-auto mb-4
              shadow-lg
            "
        >
          <FaBrain className="text-white text-4xl" />
        </div>
        <h1
          className={`
              text-[1.8rem] text-white mb-2
              drop-shadow-[2px_2px_4px_rgba(0,0,0,0.3)]
              
            `}
        >
          Numerika
        </h1>
        <p className="text-white/80">Aventura Matemática</p>
      </div>
    </>
  );
}
