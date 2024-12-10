export const BASE_URL = "https://rickandmortyapi.com/api";

export async function getCharacters(status: string, gender: string) {
  const params = new URLSearchParams();
  if (status) params.append("status", status);
  if (gender) params.append("gender", gender);

  const res = await fetch(`${BASE_URL}/character?${params.toString()}`);
  if (!res.ok) {
    throw new Error("Failed to fetch characters");
  }
  return res.json();
}

