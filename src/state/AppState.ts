import type { Car } from "../models/car";

export class AppState {
  public cars: Car[] = [];

  public garagePage = 1;
  public winnersPage = 1;

  public currentView = "garage";

  public selectedCarId: number | null = null;
}
