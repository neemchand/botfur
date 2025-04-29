'use client'

import { usePet } from '@/context/PetContext'
import CreatePet from '@/components/CreatePet'
import Pet from '@/components/Pet'
import PetChat from '../components/PetChat'

export default function Home() {
  const { pet } = usePet()

  return (
    <main className="min-h-screen p-8">
      {!pet ? <CreatePet /> : (
        <>
          <Pet />
          <PetChat />
        </>
      )}
    </main>
  )
}
