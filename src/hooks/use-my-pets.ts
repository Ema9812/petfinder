import { useEffect, useState } from "react";
import { Pet } from "./use-nearby-pets";

const MOCK_MY_PETS: Pet[] = [
  { id: "1", name: "Bobby", place: "Núñez, Buenos Aires", imageUrl: "https://placedog.net/400/300?id=1" },
  { id: "2", name: "Robert", place: "Núñez, Buenos Aires", imageUrl: "https://placedog.net/400/300?id=2" },
];

export function useMyPets() {
  const [pets, setPets] = useState<Pet[] | null>(null);

  useEffect(() => {
    // Más adelante: pedirle a la API las mascotas del usuario logueado
    setPets(MOCK_MY_PETS);
  }, []);

  return { pets };
}