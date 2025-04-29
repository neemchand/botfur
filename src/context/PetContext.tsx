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

  const feedPet = () => {
    if (!pet) return;
    setPet(prevPet => {
      if (!prevPet) return null;
      const currentHunger = prevPet.stats.hunger;
      // Happiness increases more when pet is very hungry
      const happinessBoost = currentHunger > 75 ? 20 : 10;
      
      return {
        ...prevPet,
        stats: {
          ...prevPet.stats,
          hunger: Math.max(0, prevPet.stats.hunger - 20),
          happiness: Math.min(100, prevPet.stats.happiness + happinessBoost),
          energy: Math.min(100, prevPet.stats.energy + 5)
        },
        lastInteraction: new Date()
      };
    });
  };

  const playWithPet = () => {
    if (!pet) return;
    setPet(prevPet => {
      if (!prevPet) return null;
      // If pet is too hungry or tired, playing makes them less happy
      const isHungry = prevPet.stats.hunger > 80;
      const isTired = prevPet.stats.energy < 20;
      const happinessChange = (isHungry || isTired) ? -5 : 20;
      
      return {
        ...prevPet,
        stats: {
          ...prevPet.stats,
          hunger: Math.min(100, prevPet.stats.hunger + 15),
          happiness: Math.min(100, Math.max(0, prevPet.stats.happiness + happinessChange)),
          energy: Math.max(0, prevPet.stats.energy - 15),
          cleanliness: Math.max(0, prevPet.stats.cleanliness - 10)
        },
        lastInteraction: new Date()
      };
    });
  };

  const cleanPet = () => {
    if (!pet) return;
    setPet(prevPet => {
      if (!prevPet) return null;
      // Happiness boost is higher when pet is very dirty
      const happinessBoost = prevPet.stats.cleanliness < 20 ? 15 : 5;
      
      return {
        ...prevPet,
        stats: {
          ...prevPet.stats,
          cleanliness: Math.min(100, prevPet.stats.cleanliness + 30),
          happiness: Math.min(100, prevPet.stats.happiness + happinessBoost),
          energy: Math.max(0, prevPet.stats.energy - 5)
        },
        lastInteraction: new Date()
      };
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
            hunger: 30,     // Slightly hungry to encourage immediate interaction
            happiness: 70,  // Happy but room for improvement
            energy: 100,   // Full energy to start with
            cleanliness: 100 // Perfectly clean at start
          },
          age: 0,
          stage: 'baby',
          lastInteraction: new Date()
        });
      }, 
      deletePet: () => setPet(null),
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
