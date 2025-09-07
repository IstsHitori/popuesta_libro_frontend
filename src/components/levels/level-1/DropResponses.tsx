import type { MultiplicationProblem } from "../../../types/game.types";

interface MultiplicationProblemProps {
  problem: MultiplicationProblem;
}

export default function MultiplicationProblemComponent({ problem }: MultiplicationProblemProps) {
  return (
    <div className="bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm p-3 min-h-[140px] flex flex-col justify-center">
      {/* Problem title - compact */}
      <h4 className="text-white text-sm font-bold mb-3 text-center">
        {problem.story}
      </h4>
      
      {/* Show the result */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <div className="flex items-center justify-center w-16 h-12 bg-green-500 rounded-lg text-white font-bold text-lg">
          {problem.result}
        </div>
      </div>
      
      {/* Completion status */}
      {problem.isCompleted && (
        <div className="flex items-center justify-center gap-1 text-green-400 font-semibold text-sm">
          <span>✅</span>
          <span>¡Correcto!</span>
        </div>
      )}
    </div>
  );
}
