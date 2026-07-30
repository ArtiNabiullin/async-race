import { GarageService } from "./services/garageService";
import { AppState } from "./state/AppState";
import { GarageView } from "./views/GarageView";
import type { CarData } from "./models/car";

const GARAGE_PAGE_SIZE = 7;

export class App {
  private readonly garageService = new GarageService();
  private readonly garageView = new GarageView();
  private readonly state = new AppState();

  public async init(): Promise<void> {
    const garageData = await this.garageService.getGarage(
      this.state.garagePage,
      GARAGE_PAGE_SIZE,
    );

    this.state.cars = garageData.cars;
    this.state.garageTotal = garageData.totalCount;

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

    const changePage = async (page: number): Promise<void> => {
      this.state.garagePage = page;

      await this.init();
    };

    const selectCar = (id: number): void => {
      this.state.selectedCarId = id;

      this.render(removeCar, saveCar, selectCar, changePage);
    };

    this.render(removeCar, saveCar, selectCar, changePage);
  }

  private render(
    onRemove: (id: number) => void,
    onCreate: (carData: CarData) => void,
    onSelect: (id: number) => void,
    onPageChange: (page: number) => void,
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
      this.state.garagePage,
      this.state.garageTotal,
      GARAGE_PAGE_SIZE,
      onPageChange,
    );

    const root = document.querySelector("#app");

    if (!root) {
      return;
    }

    root.replaceChildren(view);
  }
}
