import { GarageService } from "./services/garageService";
import { AppState } from "./state/AppState";
import { GarageView } from "./views/GarageView";
import { createRandomCarData } from "./utils/randomCars";
import { EngineService } from "./services/engineService";
import { AnimationService } from "./services/animationService";
import type { CarData } from "./models/car";

const GARAGE_PAGE_SIZE = 7;

export class App {
  private readonly garageService = new GarageService();
  private readonly garageView = new GarageView();
  private readonly state = new AppState();
  private readonly engineService = new EngineService();
  private readonly animationService = new AnimationService();

  private readonly animationStops = new Map<number, () => void>();

  public async init(): Promise<void> {
    const garageData = await this.garageService.getGarage(
      this.state.garagePage,
      GARAGE_PAGE_SIZE,
    );

    this.state.cars = garageData.cars;
    this.state.garageTotal = garageData.totalCount;

    const startCar = async (id: number, element: SVGElement): Promise<void> => {
      this.state.drivingCarIds.add(id);

      try {
        const engineResponse = await this.engineService.startEngine(id);

        const track = element.parentElement;

        if (!track) {
          this.state.drivingCarIds.delete(id);

          return;
        }

        const targetDistance = Math.max(
          track.clientWidth - element.getBoundingClientRect().width,
          0,
        );

        const duration =
          engineResponse.distance / Math.max(engineResponse.velocity, 1);

        const stopAnimation = this.animationService.animate(
          element,
          duration,
          targetDistance,
          () => {
            this.animationStops.delete(id);
          },
        );

        this.animationStops.set(id, stopAnimation);

        await this.engineService.driveEngine(id);
      } catch {
        this.state.drivingCarIds.delete(id);

        const currentStop = this.animationStops.get(id);

        currentStop?.();
        this.animationStops.delete(id);
      }
    };

    const stopCar = async (id: number, element: SVGElement): Promise<void> => {
      await this.engineService.stopEngine(id);

      this.state.drivingCarIds.delete(id);

      const stopAnimation = this.animationStops.get(id);

      stopAnimation?.();

      this.animationStops.delete(id);

      element.style.transform = "translateX(0)";
    };

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
        startCar,
        stopCar,
      );
    };

    this.render(
      removeCar,
      createCar,
      updateCar,
      selectCar,
      changePage,
      generateCars,
      startCar,
      stopCar,
    );
  }

  private render(
    onRemove: (id: number) => void,
    onCreate: (carData: CarData) => void,
    onUpdate: (carData: CarData) => void,
    onSelect: (id: number) => void,
    onPageChange: (page: number) => void,
    onGenerate: () => void,
    onStart: (id: number, element: SVGElement) => void,
    onStop: (id: number, element: SVGElement) => void,
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
      onStart,
      onStop,
      this.state.drivingCarIds,
    );

    const root = document.querySelector("#app");

    if (!root) {
      return;
    }

    root.replaceChildren(view);
  }
}
