'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Pet, PetStats, PetType } from '../types/pet';

interface PetContextType {
  pet: Pet | null;
  createPet: (name: string, type: string) => void;
  deletePet: () => void;
  feed: () => void;
  play: () => void;
  rest: () => void;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pet, setPet] = useState<Pet | null>(() => {
    const savedPet = localStorage.getItem('pet');
    return savedPet ? JSON.parse(savedPet) : null;
  });

  useEffect(() => {
    if (pet) {
      localStorage.setItem('pet', JSON.stringify(pet));
    } else {
      localStorage.removeItem('pet');
    }
  }, [pet]);

  const deletePet = () => {
    setPet(null);
  };

  const feedPet = () => {
    if (!pet) return;
    setPet({
      ...pet,
      stats: {
        ...pet.stats,
        hunger: Math.min(100, pet.stats.hunger + 20)
      }
    });
  };

  const playWithPet = () => {
    if (!pet) return;
    setPet({
      ...pet,
      stats: {
        ...pet.stats,
        happiness: Math.min(100, pet.stats.happiness + 20),
        energy: Math.max(0, pet.stats.energy - 10)
      }
    });
  };

  const cleanPet = () => {
    if (!pet) return;
    setPet({
      ...pet,
      stats: {
        ...pet.stats,
        cleanliness: Math.min(100, pet.stats.cleanliness + 20)
      }
    });
  };

  return (
    <PetContext.Provider value={{ 
      pet, 
      createPet: (name: string, type: string) => {
        setPet({
          id: Math.random().toString(36).substr(2, 9),
          name,
          type: type as PetType,
          stats: {
            hunger: 100,
            happiness: 100,
            energy: 100,
            cleanliness: 100
          },
          age: 0,
          stage: 'baby',
          lastInteraction: new Date()
        });
      }, 
      deletePet,
      feed: feedPet, 
      play: playWithPet, 
      rest: cleanPet 
    }}>
      {children}
    </PetContext.Provider>
  );
};

export const usePet = () => {
  const context = useContext(PetContext);
  if (context === undefined) {
    throw new Error('usePet must be used within a PetProvider');
  }
  return context;
};
