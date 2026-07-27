import type { Car } from "../models/car";

export class GarageView {
  public render(cars: Car[]): HTMLElement {
    const container = document.createElement("div");
    container.className = "container";

    container.innerHTML = `
          <h1 class="mt-4">
        Async Race Garage
      </h1>
    `;

    return container;
  }
}
