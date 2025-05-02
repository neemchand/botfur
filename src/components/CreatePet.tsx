'use client';
import React, { useState } from 'react';
import { usePet } from '@/context/PetContext';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';

const PetModel = ({ type }: { type: string }) => {
  const modelPaths = {
    cat: '/models/cat.glb',
    dog: '/models/dog.glb',
    rabbit: '/models/rabbit.glb'
  };

  const { scene } = useGLTF(modelPaths[type as keyof typeof modelPaths]);

  return (
    <primitive 
      object={scene} 
      scale={0.5}
      position={[0, -0.5, 0]}
    />
  );
};

const CreatePet: React.FC = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('cat');
  const { createPet, loading, error } = usePet();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      await createPet(name, type);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-center">Create Your Pet</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <div className="w-full h-[500px] mb-8 bg-gray-100 rounded-lg overflow-hidden">
        <Canvas 
          camera={{ 
            position: [0, 0, 8],
            fov: 40
          }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} />
          <PetModel type={type} />
          <OrbitControls 
            enableZoom={false}
            autoRotate
            autoRotateSpeed={2}
          />
        </Canvas>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Pet Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Pet Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
            <option value="rabbit">Rabbit</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Create Pet
        </button>
      </form>
    </div>
  );
};

export default CreatePet;
