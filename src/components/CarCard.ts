import type { Car } from "../models/car";
import { CarControls } from "./CarControls";

export class CarCard {
  public render(car: Car): HTMLElement {
    const card = document.createElement("div");
    card.className = "card h-100";

    const body = this.createBody(car);

    card.append(body);

    return card;
  }

  private createBody(car: Car): HTMLElement {
    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = car.name;

    const color = document.createElement("p");
    color.className = "card-text";
    color.textContent = `Color: ${car.color}`;

    const controls = new CarControls();

    body.append(title, color, controls.render(car));

    return body;
  }
}
