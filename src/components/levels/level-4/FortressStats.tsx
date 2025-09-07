import type { FortressStats } from '../../../types/fortress.types';

export default function FortressStatsComponent(stats: FortressStats) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4">
      <h3 className="text-lg font-bold text-white mb-4 text-center">📊 Estadísticas de Batalla</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-400">{stats.correctAnswers}</div>
          <div className="text-green-300 text-sm">✅ Correctas</div>
        </div>
        
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-red-400">{stats.incorrectAnswers}</div>
          <div className="text-red-300 text-sm">❌ Incorrectas</div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-purple-300 text-sm">🎯 Precisión</span>
            <span className="text-purple-400 font-bold">{stats.accuracy}%</span>
          </div>
          <div className="w-full bg-purple-900/50 rounded-full h-2">
            <div 
              className="bg-purple-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${stats.accuracy}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-orange-300 text-sm">🏰 Progreso del Camino</span>
            <span className="text-orange-400 font-bold">{stats.progressPercentage}%</span>
          </div>
          <div className="w-full bg-orange-900/50 rounded-full h-2">
            <div 
              className="bg-orange-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${stats.progressPercentage}%` }}
            ></div>
          </div>
          <div className="text-orange-300 text-xs mt-1 text-center">
            {stats.completedSteps} / {stats.totalSteps} pasos
          </div>
        </div>

        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="text-yellow-300 text-sm">💡 Pistas</span>
            <span className="text-yellow-400 font-bold">{stats.hintsRemaining}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-2 text-center">
            <div className="text-emerald-400 font-bold">+{stats.coinsEarned}</div>
            <div className="text-emerald-300 text-xs">💰 Ganadas</div>
          </div>
          <div className="bg-rose-500/20 border border-rose-500/30 rounded-lg p-2 text-center">
            <div className="text-rose-400 font-bold">-{stats.coinsLost}</div>
            <div className="text-rose-300 text-xs">💸 Perdidas</div>
          </div>
        </div>
      </div>
    </div>
  );
}
