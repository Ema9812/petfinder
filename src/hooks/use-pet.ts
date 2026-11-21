import { useEffect, useState } from "react";
import { Pet } from "./use-nearby-pets";
import { updatePet, markPetFound, deletePet, searchPlace } from "../lib/api";

export type PetDetail = Pet & { lat: number; lng: number };

const MOCK_DETAILS: Record<string, PetDetail> = {
  "1": {
    id: "1",
    name: "Bobby",
    place: "Núñez, Buenos Aires",
    imageUrl: "https://placedog.net/400/300?id=1",
    lat: -34.5445,
    lng: -58.456,
  },
  "2": {
    id: "2",
    name: "Robert",
    place: "Núñez, Buenos Aires",
    imageUrl: "https://placedog.net/400/300?id=2",
    lat: -34.5461,
    lng: -58.4602,
  },
};

// undefined = cargando, null = no existe
export function usePet(id: string | undefined) {
  const [pet, setPet] = useState<PetDetail | null | undefined>(undefined);

  useEffect(() => {
    if (!id) return;
    // Más adelante: pedirle a la API la mascota con este id
    setPet(MOCK_DETAILS[id] ?? null);
  }, [id]);

  return { pet };
}

export function usePetActions() {
  return { updatePet, markPetFound, deletePet, findPlace: searchPlace };
}