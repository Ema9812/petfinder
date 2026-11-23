import { useEffect, useState } from "react";
import { Pet } from "./use-nearby-pets";
import { getMyPets } from "../lib/api";

export function useMyPets() {
  const [pets, setPets] = useState<Pet[] | null>(null);

  useEffect(() => {
    getMyPets()
      .then(setPets)
      .catch(() => setPets([]));
  }, []);

  return { pets };
}