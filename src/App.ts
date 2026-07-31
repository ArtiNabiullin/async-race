import { GarageService } from "./services/garageService";
import { AppState } from "./state/AppState";
import { GarageView } from "./views/GarageView";
import { createRandomCarData } from "./utils/randomCars";
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

    const createCar = async (carData: CarData): Promise<void> => {
      await this.garageService.createGarageCar(carData);

      await this.init();
    };

    const updateCar = async (carData: CarData): Promise<void> => {
      const selectedCarId = this.state.selectedCarId;

      if (selectedCarId === null) {
        return;
      }

      await this.garageService.updateGarageCar(selectedCarId, carData);

      this.state.selectedCarId = null;

      await this.init();
    };

    const changePage = async (page: number): Promise<void> => {
      this.state.garagePage = page;

      await this.init();
    };

    const generateCars = async (): Promise<void> => {
      const carsData = Array.from({ length: 100 }, () => createRandomCarData());

      await this.garageService.createGarageCars(carsData);
      await this.init();
    };

    const selectCar = (id: number): void => {
      this.state.selectedCarId = id;

      this.render(
        removeCar,
        createCar,
        updateCar,
        selectCar,
        changePage,
        generateCars,
      );
    };

    this.render(
      removeCar,
      createCar,
      updateCar,
      selectCar,
      changePage,
      generateCars,
    );
  }

  private render(
    onRemove: (id: number) => void,
    onCreate: (carData: CarData) => void,
    onUpdate: (carData: CarData) => void,
    onSelect: (id: number) => void,
    onPageChange: (page: number) => void,
    onGenerate: () => void,
  ): void {
    const selectedCar =
      this.state.cars.find((car) => car.id === this.state.selectedCarId) ??
      null;

    const view = this.garageView.render(
      this.state.cars,
      onRemove,
      onCreate,
      onUpdate,
      onSelect,
      selectedCar,
      this.state.garagePage,
      this.state.garageTotal,
      GARAGE_PAGE_SIZE,
      onPageChange,
      onGenerate,
    );

    const root = document.querySelector("#app");

    if (!root) {
      return;
    }

    root.replaceChildren(view);
  }
}
