import { GarageService } from "./services/garageService";
import { AppState } from "./state/AppState";
import { GarageView } from "./views/GarageView";
import type { CarData } from "./models/car";

export class App {
  private readonly garageService = new GarageService();
  private readonly garageView = new GarageView();
  private readonly state = new AppState();

  public async init(): Promise<void> {
    const cars = await this.garageService.getGarage();

    this.state.cars = cars;

    const removeCar = async (id: number): Promise<void> => {
      await this.garageService.deleteGarageCar(id);
      await this.init();
    };

    const createCar = async (carData: CarData): Promise<void> => {
      await this.garageService.createGarageCar(carData);
      await this.init();
    };

    this.render(removeCar, createCar);
  }

  private render(
    onRemove: (id: number) => void,
    onCreate: (carData: CarData) => void,
  ): void {
    const view = this.garageView.render(this.state.cars, onRemove, onCreate);

    const root = document.querySelector("#app");

    if (!root) {
      return;
    }

    root.replaceChildren(view);
  }
}
