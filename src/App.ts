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

    const saveCar = async (carData: CarData): Promise<void> => {
      if (this.state.selectedCarId === null) {
        await this.garageService.createGarageCar(carData);
      } else {
        await this.garageService.updateGarageCar(
          this.state.selectedCarId,
          carData,
        );

        this.state.selectedCarId = null;
      }

      await this.init();
    };

    const selectCar = (id: number): void => {
      this.state.selectedCarId = id;

      this.render(removeCar, saveCar, selectCar);
    };

    this.render(removeCar, saveCar, selectCar);
  }

  private render(
    onRemove: (id: number) => void,
    onCreate: (carData: CarData) => void,
    onSelect: (id: number) => void,
  ): void {
    const selectedCar =
      this.state.cars.find((car) => car.id === this.state.selectedCarId) ??
      null;

    const view = this.garageView.render(
      this.state.cars,
      onRemove,
      onCreate,
      onSelect,
      selectedCar,
    );

    const root = document.querySelector("#app");

    if (!root) {
      return;
    }

    root.replaceChildren(view);
  }
}
