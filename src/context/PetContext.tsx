'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Pet, PetStats, PetType } from '../types/pet';

const API_URL = 'http://localhost:3001/api';

const getUserId = () => {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = Math.random().toString(36).substr(2, 9);
    localStorage.setItem('userId', userId);
  }
  return userId;
};

interface PetContextType {
  pet: Pet | null;
  loading: boolean;
  error: string | null;
  createPet: (name: string, type: string) => Promise<void>;
  deletePet: () => Promise<void>;
  feed: () => Promise<void>;
  play: () => Promise<void>;
  rest: () => Promise<void>;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const userId = getUserId();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/pets/${userId}`);
        const data = await response.json();
        setPet(data.pet);
      } catch (err) {
        setError('Failed to fetch pet data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [userId]);

  const createPet = async (name: string, type: string) => {
    try {
      setLoading(true);
      const newPet: Pet = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        type: type as PetType,
        stats: {
          hunger: 30,
          happiness: 70,
          energy: 100,
          cleanliness: 100
        },
        age: 0,
        stage: 'baby',
        lastInteraction: new Date()
      };

      const response = await fetch(`${API_URL}/pets/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPet),
      });

      const data = await response.json();
      if (data.success) {
        setPet(data.pet);
      } else {
        setError('Failed to create pet');
      }
    } catch (err) {
      setError('Failed to create pet');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deletePet = async () => {
    try {
      setLoading(true);
      await fetch(`${API_URL}/pets/${userId}`, {
        method: 'DELETE',
      });
      setPet(null);
    } catch (err) {
      setError('Failed to delete pet');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const feedPet = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/pets/${userId}/feed`, {
        method: 'POST',
      });
      const data = await response.json();
      if (data.success) {
        setPet(data.pet);
      } else {
        setError('Failed to feed pet');
      }
    } catch (err) {
      setError('Failed to feed pet');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const playWithPet = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/pets/${userId}/play`, {
        method: 'POST',
      });
      const data = await response.json();
      if (data.success) {
        setPet(data.pet);
      } else {
        setError('Failed to play with pet');
      }
    } catch (err) {
      setError('Failed to play with pet');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cleanPet = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/pets/${userId}/clean`, {
        method: 'POST',
      });
      const data = await response.json();
      if (data.success) {
        setPet(data.pet);
      } else {
        setError('Failed to clean pet');
      }
    } catch (err) {
      setError('Failed to clean pet');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PetContext.Provider value={{ 
      pet, 
      loading,
      error,
      createPet, 
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
