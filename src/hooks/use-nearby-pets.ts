import { useState } from "react";

export type Pet = {
  id: string;
  name: string;
  place: string;
  imageUrl: string;
};

const MOCK_PETS: Pet[] = [
  { id: "1", name: "Bobby", place: "Núñez, Buenos Aires", imageUrl: "https://placedog.net/400/300?id=1" },
  { id: "2", name: "Robert", place: "Núñez, Buenos Aires", imageUrl: "https://placedog.net/400/300?id=2" },
  { id: "3", name: "Luna", place: "Palermo, Buenos Aires", imageUrl: "https://placedog.net/400/300?id=3" },
];

export function useNearbyPets() {
  const [pets, setPets] = useState<Pet[] | null>(null);
  const [error, setError] = useState("");

  function askLocation() {
    setError("");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Más adelante: getNearbyPets(position.coords.latitude, position.coords.longitude)
        setPets(MOCK_PETS);
      },
      () => setError("No pudimos obtener tu ubicación. Revisá los permisos del navegador.")
    );
  }

  return { pets, error, askLocation };
}