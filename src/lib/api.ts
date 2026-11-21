const USE_MOCK = true; // cuando tengas la API real, cambialo a false
const API_BASE_URL = "https://TU-API.com";

type PetData = {
  name: string;
  imageUrl: string;
  lat: number;
  lng: number;
  place: string;
};

async function request(method: string, path: string, body?: object, token?: string) {
  if (USE_MOCK) return { token: "token-de-prueba" };

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error("La petición falló");
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export function authUser(email: string, password: string) {
  return request("POST", "/auth/token", { email, password });
}

export function registerUser(email: string, password: string) {
  return request("POST", "/auth", { email, password });
}

export function updateProfile(data: { name: string; locality: string }, token: string) {
  return request("PATCH", "/me", data, token);
}

export function updatePassword(password: string, token: string) {
  return request("PATCH", "/me/password", { password }, token);
}

export function reportPetInfo(petId: string, data: { name: string; phone: string; where: string }) {
  return request("POST", `/pets/${petId}/report`, data);
}

export function createPet(data: PetData) {
  return request("POST", "/pets", data);
}

export function updatePet(id: string, data: PetData) {
  return request("PUT", `/pets/${id}`, data);
}

export function markPetFound(id: string) {
  return request("PATCH", `/pets/${id}/found`);
}

export function deletePet(id: string) {
  return request("DELETE", `/pets/${id}`);
}

export async function searchPlace(query: string): Promise<{ lat: number; lng: number } | null> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`
  );
  const results = await res.json();
  if (results.length === 0) return null;
  return { lat: Number(results[0].lat), lng: Number(results[0].lon) };
}

export async function getNearbyPets(lat: number, lng: number) {
  const res = await fetch(`${API_BASE_URL}/pets/around?lat=${lat}&lng=${lng}`);
  return res.json();
}