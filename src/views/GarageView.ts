import type { Car, CarData } from "../models/car";
import { CarCard } from "../components/CarCard";
import { CarForm } from "../components/CarForm";
import { Pagination } from "../components/Pagination";

export class GarageView {
  private readonly carCard = new CarCard();
  private readonly carForm = new CarForm();
  private readonly pagination = new Pagination();

  private createGarageInfo(
    currentPage: number,
    totalCount: number,
  ): HTMLParagraphElement {
    const info = document.createElement("p");

    info.className = "text-muted mb-3";
    info.textContent = `Page: ${currentPage} | Total cars: ${totalCount}`;

    return info;
  }

  public render(
    cars: Car[],
    onRemove: (id: number) => void,
    onCreate: (carData: CarData) => void,
    onSelect: (id: number) => void,
    selectedCar: Car | null,
    currentPage: number,
    totalCount: number,
    pageSize: number,
    onPageChange: (page: number) => void,
  ): HTMLElement {
    const container = document.createElement("div");

    container.className = "container";

    const title = this.createTitle();

    const garageInfo = this.createGarageInfo(currentPage, totalCount);

    const form = this.carForm.render(onCreate, selectedCar);

    const list = this.createCarsList();

    const pagination = this.pagination.render(
      currentPage,
      totalCount,
      pageSize,
      onPageChange,
    );

    cars.forEach((car) => {
      const column = document.createElement("div");

      column.className = "col-12 col-md-4";

      column.append(this.carCard.render(car, onRemove, onSelect));

      list.append(column);
    });

    container.append(title, garageInfo, form, list, pagination);

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
