export interface MemoryCard {
  id: number;
  imageUrl: string;
  imageName: string;
  isFlipped: boolean;
  isHidden: boolean;
}


export interface MemoryLevel {
  level: number;
  numberOfPairs: number;
  cardsInRow: number;
}


export const MEMORY_LEVELS: MemoryLevel[] = [
  { level: 1, numberOfPairs: 2, cardsInRow: 2},
  { level: 2, numberOfPairs: 4, cardsInRow: 4},
  { level: 3, numberOfPairs: 6, cardsInRow: 4},
];

export enum MemoryType {
  UPPER_CASE = "UPPER_CASE",
  LOWER_CASE = "LOWER_CASE",
  MIX_CASE = "MIX_CASE"
}

