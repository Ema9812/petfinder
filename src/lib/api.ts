import type { Pet } from "../hooks/use-nearby-pets";

const API_BASE_URL = "https://pet-finder-api-cal6.onrender.com";
const SEARCH_RADIUS = 10000; // para probar con más alcance, subí este número
const MOCK_PETS = true; // en el paso 2 lo cambiamos a false

type PetData = {
  name: string;
  imageUrl: string;
  lat: number;
  lng: number;
  place: string;
};

function getSavedToken(): string {
  try {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved).token ?? "" : "";
  } catch {
    return "";
  }
}

async function request(method: string, path: string, body?: object) {
  const token = getSavedToken();
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`La petición falló (${res.status})`);
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

// Ajustar los nombres de campos cuando veamos una respuesta real del backend
function toPet(p: any): Pet {
  return {
    id: String(p.id),
    name: p.name,
    place: p.location ?? "",
    imageUrl: p.imageUrl ?? p.image ?? p.photo ?? "",
  };
}

export function authUser(email: string, password: string) {
  return request("POST", "/auth/login", { email, password });
}

export function registerUser(name: string, email: string, location: string, password: string) {
  return request("POST", "/auth/register", { name, email, location, password });
}

export function reportPetInfo(petId: string, data: { name: string; phone: string; where: string }) {
  return request("POST", "/reports", {
    petId: Number(petId),
    reporterPhone: data.phone,
    location: data.where,
  });
}

export async function getNearbyPets(lat: number, lng: number): Promise<Pet[]> {
  const data = await request("GET", `/pets/search?lat=${lat}&lng=${lng}&radius=${SEARCH_RADIUS}`);
  const list = Array.isArray(data) ? data : data?.pets ?? data?.data ?? [];
  return list.map(toPet);
}

export async function createPet(data: PetData) {
  if (MOCK_PETS) return null;
  return request("POST", "/pets", {
    name: data.name,
    status: "lost",
    location: data.place,
    lat: data.lat,
    lng: data.lng,
  });
}

export async function updatePet(id: string, data: PetData) {
  if (MOCK_PETS) return null;
  return request("PUT", `/pets/${id}`, {
    name: data.name,
    location: data.place,
    lat: data.lat,
    lng: data.lng,
  });
}

export async function markPetFound(id: string) {
  if (MOCK_PETS) return null;
  return request("PUT", `/pets/${id}`, { status: "found" });
}

export async function deletePet(id: string) {
  if (MOCK_PETS) return null;
  return request("DELETE", `/pets/${id}`);
}

// El backend todavía no tiene endpoints para estas dos acciones
export async function updateProfile(_data: { name: string; locality: string }, _token: string) {
  return null;
}

export async function updatePassword(_password: string, _token: string) {
  return null;
}

export async function searchPlace(query: string): Promise<{ lat: number; lng: number } | null> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`
  );
  const results = await res.json();
  if (results.length === 0) return null;
  return { lat: Number(results[0].lat), lng: Number(results[0].lon) };
}