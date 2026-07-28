import type { Car } from "../models/car";
import { CarControls } from "./CarControls";
import { CarSvg } from "./CarSvg";

export class CarCard {
  public render(car: Car, onRemove: (id: number) => void): HTMLElement {
    const card = document.createElement("div");
    card.className = "card h-100 overflow-hidden";

    const body = this.createBody(car, onRemove);

    card.append(body);

    return card;
  }

  private createBody(car: Car, onRemove: (id: number) => void): HTMLElement {
    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = car.name;

    const color = document.createElement("p");
    color.className = "card-text";
    color.textContent = `Color: ${car.color}`;

    const controls = new CarControls();

    const carSvg = new CarSvg();

    body.append(
      title,
      color,
      carSvg.render(car),
      controls.render(car, onRemove),
    );

    return body;
  }
}
