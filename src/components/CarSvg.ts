import type { Car } from "../models/car";

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

export class CarSvg {
  public render(car: Car): SVGElement {
    const svg = document.createElementNS(SVG_NAMESPACE, "svg");

    svg.setAttribute("viewBox", "0 0 120 60");
    svg.setAttribute("width", "120");
    svg.setAttribute("height", "60");
    svg.classList.add("car-svg");

    const body = this.createBody(car.color);
    const roof = this.createRoof(car.color);
    const windows = this.createWindows();
    const rearWheel = this.createWheel(32);
    const frontWheel = this.createWheel(88);

    svg.append(body, roof, windows, rearWheel, frontWheel);

    return svg;
  }

  private createBody(color: string): SVGRectElement {
    const body = document.createElementNS(SVG_NAMESPACE, "rect");

    body.setAttribute("x", "10");
    body.setAttribute("y", "24");
    body.setAttribute("width", "100");
    body.setAttribute("height", "20");
    body.setAttribute("rx", "6");
    body.setAttribute("fill", color);

    return body;
  }

  private createRoof(color: string): SVGPolygonElement {
    const roof = document.createElementNS(SVG_NAMESPACE, "polygon");

    roof.setAttribute("points", "35,24 48,10 78,10 95,24");
    roof.setAttribute("fill", color);

    return roof;
  }

  private createWindows(): SVGGElement {
    const windows = document.createElementNS(SVG_NAMESPACE, "g");

    const rearWindow = this.createWindow("48,13 61,13 61,22 41,22");
    const frontWindow = this.createWindow("64,13 76,13 88,22 64,22");

    windows.append(rearWindow, frontWindow);

    return windows;
  }

  private createWindow(points: string): SVGPolygonElement {
    const window = document.createElementNS(SVG_NAMESPACE, "polygon");

    window.setAttribute("points", points);
    window.setAttribute("fill", "#343a40");

    return window;
  }

  private createWheel(centerX: number): SVGGElement {
    const wheel = document.createElementNS(SVG_NAMESPACE, "g");

    const tire = document.createElementNS(SVG_NAMESPACE, "circle");
    tire.setAttribute("cx", String(centerX));
    tire.setAttribute("cy", "46");
    tire.setAttribute("r", "9");
    tire.setAttribute("fill", "#212529");

    const disk = document.createElementNS(SVG_NAMESPACE, "circle");
    disk.setAttribute("cx", String(centerX));
    disk.setAttribute("cy", "46");
    disk.setAttribute("r", "4");
    disk.setAttribute("fill", "#adb5bd");

    wheel.append(tire, disk);

    return wheel;
  }
}
