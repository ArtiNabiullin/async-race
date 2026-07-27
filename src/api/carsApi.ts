import type { Car } from "../models/car";

const API_URL = "http://localhost:3000";

export async function getCars(): Promise<Car[]> {
  const response = await fetch(`${API_URL}/garage`);

  return response.json();
}
