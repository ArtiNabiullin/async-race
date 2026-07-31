import type { Car } from "../models/car";

export class CarSvg {
  public render(car: Car): SVGElement {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    svg.classList.add("car-svg");

    svg.setAttribute("width", "100");
    svg.setAttribute("height", "50");

    const body = this.createBody(car.color);

    svg.append(body);

    return svg;
  }

  private createBody(color: string): SVGRectElement {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

    rect.setAttribute("width", "80");
    rect.setAttribute("height", "30");
    rect.setAttribute("x", "10");
    rect.setAttribute("y", "10");
    rect.setAttribute("fill", color);

    return rect;
  }
}
