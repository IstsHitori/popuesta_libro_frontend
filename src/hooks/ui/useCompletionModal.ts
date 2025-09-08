import { useState } from 'react';
import { useEarnedItemsStore } from '../../stores/earned-items.store';

export const useCompletionModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { getEarnedItemsCount, markModalAsShown } = useEarnedItemsStore();

  const showModal = () => {
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
  };

  const hideModalAndMark = (level: number) => {
    setIsVisible(false);
    markModalAsShown(level);
  };

  // Verificar si todos los niveles están completados
  const { garments: garmentCount, crystals: crystalCount } = getEarnedItemsCount();
  const allLevelsComplete = garmentCount === 4 && crystalCount === 4;

  return {
    isVisible,
    showModal,
    hideModal,
    hideModalAndMark,
    allLevelsComplete,
  };
};
