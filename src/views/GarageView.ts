import type { Car } from "../models/car";
import { CarCard } from "../components/CarCard";

export class GarageView {
  private readonly carCard = new CarCard();

  public render(cars: Car[], onRemove: (id: number) => void): HTMLElement {
    const container = document.createElement("div");

    container.className = "container";

    const title = this.createTitle();

    const list = this.createCarsList();

    cars.forEach((car) => {
      const column = document.createElement("div");

      column.className = "col-12 col-md-4";

      column.append(this.carCard.render(car, onRemove));

      list.append(column);
    });

    container.append(title, list);

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
