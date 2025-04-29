import React from 'react';
import { usePet } from '../context/PetContext';
import { PetStats } from '../types/pet';

const StatBar: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="mb-2">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium">{label}</span>
      <span className="text-sm">{value}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

const Pet: React.FC = () => {
  const { pet, feed: feedPet, play: playWithPet, rest: cleanPet, deletePet } = usePet();

  if (!pet) return null;

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your pet?')) {
      console.log('Deleting pet...');
      deletePet();
      console.log('Pet deleted');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">{pet.name}</h2>
        <p className="text-gray-600">
          {pet.type} - {pet.stage} ({pet.age} days old)
        </p>
      </div>

      <div className="mb-6">
        <StatBar label="Hunger" value={pet.stats.hunger} />
        <StatBar label="Happiness" value={pet.stats.happiness} />
        <StatBar label="Energy" value={pet.stats.energy} />
        <StatBar label="Cleanliness" value={pet.stats.cleanliness} />
      </div>

      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={feedPet}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Feed
        </button>
        <button
          onClick={playWithPet}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Play
        </button>
        <button
          onClick={cleanPet}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Clean
        </button>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete Pet
        </button>
      </div>
    </div>
  );
};

export default Pet;
