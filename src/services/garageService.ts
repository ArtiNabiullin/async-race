import { getCars } from "../api/carsApi";
import type { Car } from "../models/car";

export class GarageService {
  public async getGarage(): Promise<Car[]> {
    return getCars();
  }
}
