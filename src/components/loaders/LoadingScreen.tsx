import bg_image from "/niveles/bg_numerika.webp";

export default function LoadingScreen() {
  return (
    <div
      id="loading-screen"
      className="fixed inset-0 w-screen h-screen bg-cover bg-center flex justify-center items-center z-[9999]"
      style={{ backgroundImage: `url(${bg_image})` }}
    >
      <div className="text-center text-white bg-black/70 p-8 rounded-2xl backdrop-blur-lg">
        <div className="text-[4rem] mb-4 animate-bounce">
          <i className="bg-gradient-to-r from-yellow-400 via-orange-400 to-violet-600 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]"></i>
        </div>
        <h2>Numerika</h2>
        <p>Preparando tu aventura matemática...</p>
        <div className="w-[300px] h-2 bg-white/20 rounded overflow-hidden mx-auto">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded animate-[loading_2s_ease-in-out] [animation-name:loading] [animation-duration:2s] [animation-timing-function:ease-in-out] [animation-fill-mode:forwards]"
            style={{
              animationName: "loading",
              animationDuration: "2s",
              animationTimingFunction: "ease-in-out",
              animationFillMode: "forwards",
            }}
          />
          <style>
            {`
              @keyframes loading {
                0% { width: 0%; }
                50% { width: 70%; }
                100% { width: 100%; }
              }
              `}
          </style>
        </div>
      </div>
    </div>
  );
}
