const API_BASE_URL = "https://TU-API.com";

export async function authUser(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function getNearbyPets(lat: number, lng: number) {
  const res = await fetch(`${API_BASE_URL}/pets/around?lat=${lat}&lng=${lng}`);
  return res.json();
}