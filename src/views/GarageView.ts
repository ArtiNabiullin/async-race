import type { Car } from "../models/car";
import { CarCard } from "../components/CarCard";

export class GarageView {
  private readonly carCard = new CarCard();

  public render(cars: Car[]): HTMLElement {
    const container = document.createElement("div");
    container.className = "container";

    container.innerHTML = `
      <h1>
        Async Race Garage
      </h1>

      <div class="row g-3" id="cars-list">
      </div>
    `;

    const list = container.querySelector("#cars-list");

    cars.forEach((car) => {
      const column = document.createElement("div");
      column.className = "col-md-4";

      column.append(this.carCard.render(car));

      list?.append(column);
    });

    return container;
  }
}
