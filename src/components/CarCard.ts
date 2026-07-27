import type { Car } from "../models/car";

export class CarCard {
  public render(car: Car): HTMLElement {
    const element = document.createElement("div");
    element.className = "card h-100";

    element.innerHTML = `
      <div class="card-body">

      <h5 class="card-title">
        ${car.name}
      </h5>

      <p class="card-text">
        Color: ${car.color}
      </p>

      <button class="btn btn-success">
        Start
      </button>

      </div>
    `;

    return element;
  }
}
