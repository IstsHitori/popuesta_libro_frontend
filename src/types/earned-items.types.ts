export interface EarnedGarment {
  id: string;
  name: string;
  image: string;
  level: number;
  isEarned: boolean;
}

export interface EarnedCrystal {
  id: string;
  name: string;
  image: string;
  level: number;
  color: string;
  isEarned: boolean;
}

export interface LevelReward {
  level: number;
  garment: EarnedGarment;
  crystal: EarnedCrystal;
}
