import { useState } from 'react';
import { useCoinsStore } from '../../stores/coins.store';

interface CoinsDisplayProps {
  className?: string;
  showHistory?: boolean;
}

export default function CoinsDisplay({ className = '', showHistory = false }: CoinsDisplayProps) {
  const { coins, totalEarned, totalLost, getCoinsHistory } = useCoinsStore();
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  
  const history = getCoinsHistory();
  const recentTransactions = history.slice(-5).reverse(); // Last 5 transactions

  return (
    <>
      <div className={`bg-gradient-to-r from-yellow-500/20 to-amber-500/20 backdrop-blur-sm rounded-xl border border-yellow-500/30 p-3 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl">🪙</div>
            <div>
              <div className="text-yellow-400 font-bold text-lg">{coins}</div>
              <div className="text-yellow-300/80 text-xs">Monedas</div>
            </div>
          </div>
          
          {showHistory && (
            <button
              onClick={() => setShowHistoryModal(true)}
              className="text-yellow-400 hover:text-yellow-300 transition-colors text-sm"
            >
              📊 Historial
            </button>
          )}
        </div>
        
        {/* Quick stats */}
        <div className="mt-2 flex justify-between text-xs">
          <span className="text-green-400">+{totalEarned} ganadas</span>
          <span className="text-red-400">-{totalLost} perdidas</span>
        </div>
        
        {/* Recent transactions preview */}
        {recentTransactions.length > 0 && (
          <div className="mt-2 text-xs space-y-1">
            {recentTransactions.slice(0, 2).map((transaction) => (
              <div
                key={transaction.id}
                className={`flex items-center justify-between ${
                  transaction.type === 'earned' ? 'text-green-400' : 'text-red-400'
                }`}
              >
                <span>{transaction.reason}</span>
                <span>{transaction.type === 'earned' ? '+' : '-'}{transaction.amount}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 max-w-md w-full max-h-96 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-lg font-bold">💰 Historial de Monedas</h3>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="text-center mb-4">
              <div className="text-yellow-400 text-2xl font-bold">{coins} 🪙</div>
              <div className="text-white/80 text-sm">Monedas actuales</div>
            </div>
            
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {history.length === 0 ? (
                <div className="text-center text-white/60 py-4">
                  No hay transacciones aún
                </div>
              ) : (
                history.slice().reverse().map((transaction) => (
                  <div
                    key={transaction.id}
                    className={`flex items-center justify-between p-2 rounded-lg ${
                      transaction.type === 'earned' 
                        ? 'bg-green-500/20 border border-green-500/30' 
                        : 'bg-red-500/20 border border-red-500/30'
                    }`}
                  >
                    <div>
                      <div className={`text-sm font-medium ${
                        transaction.type === 'earned' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {transaction.reason}
                      </div>
                      <div className="text-white/60 text-xs">
                        {new Date(transaction.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                    <div className={`font-bold ${
                      transaction.type === 'earned' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {transaction.type === 'earned' ? '+' : '-'}{transaction.amount} 🪙
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
