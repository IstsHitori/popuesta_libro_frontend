import { useEffect, useState } from 'react';
import { useCoinsStore } from '../../stores/coins.store';

export default function CoinsFeedback() {
  const coins = useCoinsStore(state => state.coins);
  const [lastCoins, setLastCoins] = useState(coins);
  const [feedback, setFeedback] = useState<{
    show: boolean;
    type: 'gained' | 'lost';
    amount: number;
  }>({ show: false, type: 'gained', amount: 0 });

  useEffect(() => {
    if (coins !== lastCoins) {
      const difference = coins - lastCoins;
      if (difference !== 0) {
        setFeedback({
          show: true,
          type: difference > 0 ? 'gained' : 'lost',
          amount: Math.abs(difference)
        });

        // Hide feedback after 2 seconds
        const timer = setTimeout(() => {
          setFeedback(prev => ({ ...prev, show: false }));
        }, 2000);

        setLastCoins(coins);
        return () => clearTimeout(timer);
      }
    }
  }, [coins, lastCoins]);

  if (!feedback.show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 pointer-events-none">
      <div className={`
        transform transition-all duration-500 ease-out
        ${feedback.show ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-[-20px] opacity-0 scale-95'}
        ${feedback.type === 'gained' 
          ? 'bg-gradient-to-r from-green-500/90 to-emerald-500/90 border-green-400' 
          : 'bg-gradient-to-r from-red-500/90 to-rose-500/90 border-red-400'
        }
        backdrop-blur-md rounded-xl border px-4 py-2 shadow-2xl
      `}>
        <div className="flex items-center gap-2 text-white font-bold">
          <span className="text-xl">
            {feedback.type === 'gained' ? '✨' : '💸'}
          </span>
          <span>
            {feedback.type === 'gained' ? '+' : '-'}{feedback.amount} 🪙
          </span>
          <span className="text-sm opacity-90">
            {feedback.type === 'gained' ? '¡Bien hecho!' : '¡Inténtalo de nuevo!'}
          </span>
        </div>
      </div>
    </div>
  );
}
