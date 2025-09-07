import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ message, type, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const typeStyles = {
    success: 'bg-green-500 border-green-400',
    error: 'bg-red-500 border-red-400',
    info: 'bg-blue-500 border-blue-400',
  };

  const typeIcons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
  };

  return (
    <div className={`
      fixed top-4 right-4 z-50
      flex items-center gap-2
      px-3 py-2 rounded-lg
      text-white font-medium text-sm
      border ${typeStyles[type]}
      shadow-lg
      transform transition-all duration-300
      ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      max-w-xs
    `}>
      <span className="text-base">{typeIcons[type]}</span>
      <span className="flex-1">{message}</span>
      <button 
        onClick={onClose}
        className="ml-1 hover:bg-white/20 rounded p-1 text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
}
