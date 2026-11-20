const USE_MOCK = true; // cuando tengas la API real, cambialo a false
const API_BASE_URL = "https://TU-API.com";

async function post(path: string, body: object) {
  if (USE_MOCK) return { token: "token-de-prueba" };

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("La petición falló");
  return res.json();
}

export function authUser(email: string, password: string) {
  return post("/auth/token", { email, password });
}

export function registerUser(email: string, password: string) {
  return post("/auth", { email, password });
}

export function reportPetInfo(petId: string, data: { name: string; phone: string; where: string }) {
  return post(`/pets/${petId}/report`, data);
}

export async function getNearbyPets(lat: number, lng: number) {
  const res = await fetch(`${API_BASE_URL}/pets/around?lat=${lat}&lng=${lng}`);
  return res.json();
}