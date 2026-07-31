import type { Car } from "../models/car";
import { CarControls } from "./CarControls";
import { CarSvg } from "./CarSvg";

export class CarCard {
  public render(
    car: Car,
    onRemove: (id: number) => void,
    onSelect: (id: number) => void,
    onStart: (id: number, element: SVGElement) => void,
    onStop: (id: number, element: SVGElement) => void,
    isDriving = false,
  ): HTMLElement {
    const card = document.createElement("div");
    card.className = "card h-100 overflow-hidden";

    const body = this.createBody(
      car,
      onRemove,
      onSelect,
      onStart,
      onStop,
      isDriving,
    );

    card.append(body);

    return card;
  }

  private createBody(
    car: Car,
    onRemove: (id: number) => void,
    onSelect: (id: number) => void,
    onStart: (id: number, element: SVGElement) => void,
    onStop: (id: number, element: SVGElement) => void,
    isDriving = false,
  ): HTMLElement {
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

    const carElement = carSvg.render(car);
    const carTrack = this.createCarTrack(carElement);

    body.append(
      title,
      color,
      carTrack,
      controls.render(
        car,
        onRemove,
        onSelect,
        (id) => onStart(id, carElement),
        (id) => onStop(id, carElement),
        isDriving,
      ),
    );

    return body;
  }

  private createCarTrack(carElement: SVGElement): HTMLDivElement {
    const track = document.createElement("div");

    track.className = "car-track";
    track.append(carElement);

    return track;
  }
}
