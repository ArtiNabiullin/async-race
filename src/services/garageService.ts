import { CarsApi } from "../api/carsApi";
import type { Car, CarData } from "../models/car";

export class GarageService {
  private readonly carsApi = new CarsApi();

  public async getGarage(): Promise<Car[]> {
    return this.carsApi.getCars();
  }

  public async deleteGarageCar(id: number): Promise<void> {
    await this.carsApi.deleteCars(id);
  }

  public async createGarageCar(carData: CarData): Promise<Car> {
    return this.carsApi.createCar(carData);
  }

  public async updateGarageCar(id: number, carData: CarData): Promise<Car> {
    return this.carsApi.updateCar(id, carData);
  }
}
