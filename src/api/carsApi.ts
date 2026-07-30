import type { Car, CarData, CarsPage } from "../models/car";

const BASE_URL = "http://localhost:3000";
export class CarsApi {
  public async getCars(page: number, limit: number): Promise<CarsPage> {
    const params = new URLSearchParams({
      _page: String(page),
      _limit: String(limit),
    });

    const response = await fetch(`${BASE_URL}/garage?${params.toString()}`);

    if (!response.ok) {
      throw new Error("Failed to get cars");
    }

    const totalCountHeader = response.headers.get("X-Total-Count");

    if (totalCountHeader === null) {
      throw new Error("Total count header is missing");
    }

    const totalCount = Number(totalCountHeader);

    if (!Number.isInteger(totalCount)) {
      throw new Error("Total count is invalid");
    }

    const cars: Car[] = await response.json();

    return { cars, totalCount };
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

  public async updateCar(id: number, carData: CarData): Promise<Car> {
    const response = await fetch(`${BASE_URL}/garage/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    });

    if (!response) {
      throw new Error("Failed to update car");
    }
    const car: Car = await response.json();

    return car;
  }
}
