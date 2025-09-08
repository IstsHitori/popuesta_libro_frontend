import { useLevelAccess } from '@/hooks/levels/useLevelAccess';
import LevelAccessBlocked from './LevelAccessBlocked';

interface LevelProtectorProps {
  children: React.ReactNode;
  levelNumber: number;
}

export default function LevelProtector({ children, levelNumber }: LevelProtectorProps) {
  const { canAccessCurrentLevel } = useLevelAccess();

  // Si no puede acceder, mostrar pantalla de bloqueo
  if (!canAccessCurrentLevel) {
    return <LevelAccessBlocked requiredLevel={levelNumber} />;
  }

  return <>{children}</>;
}
