import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CoinsState {
  coins: number;
  totalEarned: number;
  totalLost: number;
  addCoins: (amount: number, reason?: string) => void;
  subtractCoins: (amount: number, reason?: string) => void;
  resetCoins: () => void;
  getCoinsHistory: () => CoinTransaction[];
}

interface CoinTransaction {
  id: string;
  amount: number;
  type: 'earned' | 'lost';
  reason: string;
  timestamp: number;
}

const INITIAL_COINS = 10; // El niño empieza con 10 monedas

export const useCoinsStore = create<CoinsState>()(
  persist(
    (set, get) => ({
      coins: INITIAL_COINS,
      totalEarned: 0,
      totalLost: 0,
      
      addCoins: (amount: number, reason = 'Colocación correcta') => {
        const transaction: CoinTransaction = {
          id: `coin-${Date.now()}-${Math.random()}`,
          amount,
          type: 'earned',
          reason,
          timestamp: Date.now(),
        };
        
        set((state) => ({
          coins: state.coins + amount,
          totalEarned: state.totalEarned + amount,
        }));
        
        // Store transaction in localStorage for history
        const history = get().getCoinsHistory();
        history.push(transaction);
        localStorage.setItem('coins-history', JSON.stringify(history.slice(-50))); // Keep last 50 transactions
      },
      
      subtractCoins: (amount: number, reason = 'Colocación incorrecta') => {
        const currentCoins = get().coins;
        const coinsToSubtract = Math.min(amount, currentCoins); // No permitir que las monedas sean negativas
        
        const transaction: CoinTransaction = {
          id: `coin-${Date.now()}-${Math.random()}`,
          amount: coinsToSubtract,
          type: 'lost',
          reason,
          timestamp: Date.now(),
        };
        
        set((state) => ({
          coins: Math.max(0, state.coins - coinsToSubtract),
          totalLost: state.totalLost + coinsToSubtract,
        }));
        
        // Store transaction in localStorage for history
        const history = get().getCoinsHistory();
        history.push(transaction);
        localStorage.setItem('coins-history', JSON.stringify(history.slice(-50))); // Keep last 50 transactions
      },
      
      resetCoins: () => {
        set({
          coins: INITIAL_COINS,
          totalEarned: 0,
          totalLost: 0,
        });
        localStorage.removeItem('coins-history');
      },
      
      getCoinsHistory: (): CoinTransaction[] => {
        try {
          const history = localStorage.getItem('coins-history');
          return history ? JSON.parse(history) : [];
        } catch {
          return [];
        }
      },
    }),
    {
      name: 'coins-storage',
      partialize: (state) => ({
        coins: state.coins,
        totalEarned: state.totalEarned,
        totalLost: state.totalLost,
      }),
    }
  )
);

export type { CoinTransaction };
