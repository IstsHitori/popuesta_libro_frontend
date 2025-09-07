import type { MultiplicationProblem } from "../../../types/game.types";
import VisualGroupingZone from "./VisualGroupingZone";

interface VisualMultiplicationProblemProps {
  problem: MultiplicationProblem;
}

export default function VisualMultiplicationProblem({ 
  problem 
}: VisualMultiplicationProblemProps) {
  
  if (problem.isCompleted && problem.selectedGrouping) {
    return <CompletedVisualProblem problem={problem} />;
  }

  const getItemEmoji = () => {
    switch (problem.itemType) {
      case 'apple': return '🍎';
      case 'crystal': return '💎';
      case 'seed': return '🌱';
      default: return '❓';
    }
  };

  const getItemName = () => {
    switch (problem.itemType) {
      case 'apple': return 'manzanas';
      case 'crystal': return 'cristales';
      case 'seed': return 'semillas';
      default: return 'objetos';
    }
  };

  return (
    <div className="bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm p-6 min-h-[300px]">
      {/* Problem header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="text-4xl">{getItemEmoji()}</span>
          <h3 className="text-white text-xl font-bold">
            Total: {problem.result} {getItemName()}
          </h3>
          <span className="text-4xl">{getItemEmoji()}</span>
        </div>
        
        <p className="text-white/90 text-sm mb-4 leading-relaxed">
          {problem.story}
        </p>
        
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3 mb-4">
          <p className="text-blue-300 text-sm font-semibold">
            🎯 Arrastra {getItemName()} para formar grupos iguales y descubrir diferentes formas de organizar {problem.result} {getItemName()}
          </p>
        </div>
      </div>

      {/* Grouping options */}
      <div className="space-y-4">
        <h4 className="text-white text-lg font-semibold text-center mb-4">
          Formas de agrupar {problem.result} {getItemName()}:
        </h4>
        
        {problem.possibleGroupings.map((grouping) => {
          const isCompleted = grouping.placedItems.every(group => group.length === grouping.groupSize);
          
          return (
            <VisualGroupingZone 
              key={grouping.id}
              grouping={grouping}
              problemId={problem.id}
              isCompleted={isCompleted}
            />
          );
        })}
      </div>
    </div>
  );
}

interface CompletedVisualProblemProps {
  problem: MultiplicationProblem;
}

function CompletedVisualProblem({ problem }: CompletedVisualProblemProps) {
  const grouping = problem.selectedGrouping!;
  
  const getItemEmoji = () => {
    switch (problem.itemType) {
      case 'apple': return '🍎';
      case 'crystal': return '💎';
      case 'seed': return '🌱';
      default: return '❓';
    }
  };

  const getItemName = () => {
    switch (problem.itemType) {
      case 'apple': return 'manzanas';
      case 'crystal': return 'cristales';
      case 'seed': return 'semillas';
      default: return 'objetos';
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl border border-green-400/50 backdrop-blur-sm p-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-3xl">✅</span>
          <h3 className="text-green-400 text-xl font-bold">
            ¡Problema Completado!
          </h3>
          <span className="text-3xl">✅</span>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 mb-4">
          <p className="text-white text-lg mb-2">
            <span className="text-2xl mr-2">{getItemEmoji()}</span>
            {grouping.description}
          </p>
          
          <div className="text-green-400 text-xl font-bold">
            {grouping.numberOfGroups} × {grouping.groupSize} = {problem.result}
          </div>
          
          <p className="text-white/80 text-sm mt-2">
            {grouping.numberOfGroups} grupos de {grouping.groupSize} {getItemName()} cada uno = {problem.result} {getItemName()} en total
          </p>
        </div>

        <div className="flex justify-center">
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
            <p className="text-yellow-300 text-sm">
              🌟 Has aprendido que la multiplicación es una forma rápida de sumar grupos iguales
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
