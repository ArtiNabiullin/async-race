import type { Car, CarData } from "../models/car";

const BASE_URL = "http://localhost:3000";
export class CarsApi {
  public async getCars(): Promise<Car[]> {
    const response = await fetch(`${BASE_URL}/garage`);

    const cars: Car[] = await response.json();

    return cars;
  }

  public async deleteCars(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/garage/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete car");
    }
  }

  public async createCar(carData: CarData): Promise<Car> {
    const response = await fetch(`${BASE_URL}/garage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    });

    if (!response) {
      throw new Error("Failed to create car");
    }
    const car: Car = await response.json();

    return car;
  }
}
