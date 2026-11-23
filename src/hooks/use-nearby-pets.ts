import { useState } from "react";
import { getNearbyPets } from "../lib/api";

export type Pet = {
  id: string;
  name: string;
  place: string;
  imageUrl: string;
  status?: string;
  reporterId?: number;
  lat?: number;
  lng?: number;
};

export function useNearbyPets() {
  const [pets, setPets] = useState<Pet[] | null>(null);
  const [error, setError] = useState("");

  function askLocation() {
    setError("");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const found = await getNearbyPets(position.coords.latitude, position.coords.longitude);
          setPets(found);
        } catch {
          setError("No pudimos cargar las mascotas. Probá de nuevo.");
        }
      },
      () => setError("No pudimos obtener tu ubicación. Revisá los permisos del navegador.")
    );
  }

  return { pets, error, askLocation };
}