import { useCallback } from 'react';

// Extender la interfaz Window para incluir webkitAudioContext
declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

export const useSoundEffects = () => {
  const playCorrectSound = useCallback(() => {
    try {
      // Crear un AudioContext para generar sonidos sintéticos
      const audioContext = new (window.AudioContext || window.webkitAudioContext || AudioContext)();
      
      // Sonido de éxito - acordes ascendentes
      const playTone = (frequency: number, startTime: number, duration: number) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      };
      
      const now = audioContext.currentTime;
      // Secuencia de notas para el sonido de éxito
      playTone(523.25, now, 0.2); // C5
      playTone(659.25, now + 0.1, 0.2); // E5
      playTone(783.99, now + 0.2, 0.3); // G5
      
    } catch (error) {
      console.log('Audio no disponible:', error);
    }
  }, []);

  const playIncorrectSound = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext || AudioContext)();
      
      const playTone = (frequency: number, startTime: number, duration: number) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sawtooth';
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      };
      
      const now = audioContext.currentTime;
      // Sonido descendente para error
      playTone(400, now, 0.3);
      playTone(300, now + 0.15, 0.3);
      
    } catch (error) {
      console.log('Audio no disponible:', error);
    }
  }, []);

  const playVictorySound = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext || AudioContext)();
      
      const playTone = (frequency: number, startTime: number, duration: number, volume: number = 0.3) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'triangle';
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      };
      
      const now = audioContext.currentTime;
      // Fanfarria de victoria
      playTone(523.25, now, 0.4); // C5
      playTone(659.25, now + 0.1, 0.4); // E5
      playTone(783.99, now + 0.2, 0.4); // G5
      playTone(1046.50, now + 0.3, 0.6); // C6
      playTone(1318.51, now + 0.4, 0.8); // E6
      
    } catch (error) {
      console.log('Audio no disponible:', error);
    }
  }, []);

  return {
    playCorrectSound,
    playIncorrectSound,
    playVictorySound
  };
};
