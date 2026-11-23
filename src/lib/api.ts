import type { Pet } from "../hooks/use-nearby-pets";

const API_BASE_URL = "https://pet-finder-api-cal6.onrender.com";
const SEARCH_RADIUS = 10000; // en metros; para probar con más alcance, subí este número

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

// El id del usuario viene dentro del token (JWT)
function getUserId(): number | null {
  try {
    const payload = getSavedToken().split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(payload)).userId ?? null;
  } catch {
    return null;
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

function toNumber(value: any): number | undefined {
  return value == null ? undefined : Number(value);
}

function toPet(p: any): Pet {
  return {
    id: String(p.id ?? p.objectID),
    name: p.name,
    place: p.location ?? "",
    imageUrl: p.imageUrl ?? p.image ?? "",
    status: p.status,
    reporterId: p.reporterId,
    lat: toNumber(p.lat ?? p._geoloc?.lat),
    lng: toNumber(p.lng ?? p._geoloc?.lng),
  };
}

// Distancia en metros entre dos puntos (fórmula de haversine)
function distanceMeters(lat1: number, lng1: number, lat2: number, lng2: number) {
  const rad = (deg: number) => (deg * Math.PI) / 180;
  const a =
    Math.sin(rad(lat2 - lat1) / 2) ** 2 +
    Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(rad(lng2 - lng1) / 2) ** 2;
  return 6371000 * 2 * Math.asin(Math.sqrt(a));
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

async function getAllPets(): Promise<Pet[]> {
  const data = await request("GET", "/pets");
  const list = Array.isArray(data) ? data : data?.pets ?? data?.data ?? [];
  return list.map(toPet);
}

export async function getNearbyPets(lat: number, lng: number): Promise<Pet[]> {
  const all = await getAllPets();
  return all.filter(
    (p) =>
      p.status !== "found" &&
      (p.lat == null || p.lng == null || distanceMeters(lat, lng, p.lat, p.lng) <= SEARCH_RADIUS)
  );
}

export async function getMyPets(): Promise<Pet[]> {
  const userId = getUserId();
  const all = await getAllPets();
  return all.filter((p) => p.reporterId === userId && p.status !== "found");
}

export async function getPet(id: string): Promise<Pet> {
  return toPet(await request("GET", `/pets/${id}`));
}

export function createPet(data: PetData) {
  return request("POST", "/pets", {
    name: data.name,
    status: "lost",
    location: data.place,
    image: data.imageUrl,
    lat: data.lat,
    lng: data.lng,
  });
}

export function updatePet(id: string, data: PetData) {
  return request("PUT", `/pets/${id}`, {
    name: data.name,
    location: data.place,
    // solo mandamos la foto si la cambió (si no, es la URL que ya está guardada)
    image: data.imageUrl.startsWith("data:") ? data.imageUrl : undefined,
    lat: data.lat,
    lng: data.lng,
  });
}

export function markPetFound(id: string) {
  return request("PUT", `/pets/${id}`, { status: "found" });
}

export function deletePet(id: string) {
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