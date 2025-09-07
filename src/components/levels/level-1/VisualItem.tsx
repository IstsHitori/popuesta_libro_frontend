import type { ItemType } from "../../../types/game.types";

interface VisualItemProps {
  type: ItemType;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function VisualItem({ type, size = 'medium', className = '' }: VisualItemProps) {
  const getItemEmoji = () => {
    switch (type) {
      case 'apple':
        return '🍎';
      case 'crystal':
        return '💎';
      case 'seed':
        return '🌱';
      default:
        return '❓';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'text-lg w-6 h-6';
      case 'medium':
        return 'text-2xl w-8 h-8';
      case 'large':
        return 'text-3xl w-10 h-10';
      default:
        return 'text-2xl w-8 h-8';
    }
  };

  const getItemName = () => {
    switch (type) {
      case 'apple':
        return 'manzana';
      case 'crystal':
        return 'cristal';
      case 'seed':
        return 'semilla';
      default:
        return 'objeto';
    }
  };

  return (
    <div 
      className={`
        ${getSizeClasses()} 
        ${className}
        flex items-center justify-center
        bg-white/10 backdrop-blur-sm rounded-lg border border-white/30
        transition-all duration-200 hover:scale-110 hover:bg-white/20
        shadow-lg cursor-pointer
      `}
      title={getItemName()}
      style={{
        background: type === 'apple' 
          ? 'linear-gradient(135deg, #ef4444, #dc2626)' 
          : type === 'crystal'
          ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
          : 'linear-gradient(135deg, #10b981, #059669)',
        boxShadow: type === 'apple'
          ? '0 4px 15px rgba(239, 68, 68, 0.3)'
          : type === 'crystal'
          ? '0 4px 15px rgba(59, 130, 246, 0.3)'
          : '0 4px 15px rgba(16, 185, 129, 0.3)'
      }}
    >
      <span className="drop-shadow-sm">{getItemEmoji()}</span>
    </div>
  );
}
