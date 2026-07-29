import type { Car, CarData } from "../models/car";
import { CarCard } from "../components/CarCard";
import { CarForm } from "../components/CarForm";

export class GarageView {
  private readonly carCard = new CarCard();
  private readonly carForm = new CarForm();

  public render(
    cars: Car[],
    onRemove: (id: number) => void,
    onCreate: (carData: CarData) => void,
    onSelect: (id: number) => void,
    selectedCar: Car | null = null,
  ): HTMLElement {
    const container = document.createElement("div");

    container.className = "container";

    const title = this.createTitle();

    const form = this.carForm.render(onCreate, selectedCar);

    const list = this.createCarsList();

    cars.forEach((car) => {
      const column = document.createElement("div");

      column.className = "col-12 col-md-4";

      column.append(this.carCard.render(car, onRemove, onSelect));

      list.append(column);
    });

    container.append(title, form, list);

    return container;
  }

  private createTitle(): HTMLHeadingElement {
    const title = document.createElement("h1");

    title.textContent = "Async Race Garage";

    return title;
  }

  private createCarsList(): HTMLDivElement {
    const list = document.createElement("div");

    list.className = "row g-3";

    return list;
  }
}
