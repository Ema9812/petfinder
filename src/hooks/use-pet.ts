import { useEffect, useState } from "react";
import { Pet } from "./use-nearby-pets";
import { getPet, updatePet, markPetFound, deletePet, searchPlace } from "../lib/api";

export type PetDetail = Pet & { lat: number; lng: number };

const DEFAULT_COORDS = { lat: -34.6037, lng: -58.3816 };

// undefined = cargando, null = no existe
export function usePet(id: string | undefined) {
  const [pet, setPet] = useState<PetDetail | null | undefined>(undefined);

  useEffect(() => {
    if (!id) return;
    setPet(undefined);
    getPet(id)
      .then((p) =>
        setPet({ ...p, lat: p.lat ?? DEFAULT_COORDS.lat, lng: p.lng ?? DEFAULT_COORDS.lng })
      )
      .catch(() => setPet(null));
  }, [id]);

  return { pet };
}

export function usePetActions() {
  return { updatePet, markPetFound, deletePet, findPlace: searchPlace };
}