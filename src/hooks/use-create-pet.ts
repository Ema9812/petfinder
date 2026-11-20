import { createPet, searchPlace } from "../lib/api";

export function useCreatePet() {
  return { createPet, findPlace: searchPlace };
}