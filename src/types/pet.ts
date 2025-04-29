export type PetType = 'dog' | 'cat' | 'dragon' | 'alien';

export interface PetStats {
  hunger: number;
  happiness: number;
  energy: number;
  cleanliness: number;
}

export interface Pet {
  id: string;
  name: string;
  type: PetType;
  stats: PetStats;
  age: number; // in days
  stage: 'baby' | 'adult';
  lastInteraction: Date;
}