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
    onUpdate: (carData: CarData) => void,
    onSelect: (id: number) => void,
    selectedCar: Car | null,
    currentPage: number,
    totalCount: number,
    pageSize: number,
    onPageChange: (page: number) => void,
    onGenerate: () => void,
    onStart: (id: number, element: SVGElement) => void,
    onStop: (id: number, element: SVGElement) => void,
    drivingCarIds: Set<number>,
  ): HTMLElement {
    const container = document.createElement("div");

    container.className = "container";

    const title = this.createTitle();

    const garageInfo = this.createGarageInfo(currentPage, totalCount);

    const createForm = this.carForm.render(onCreate, null, "Create");

    const updateForm = this.carForm.render(
      onUpdate,
      selectedCar,
      "Update",
      selectedCar === null,
    );

    const forms = document.createElement("div");

    forms.className = "row g-3 mb-4";

    const createColumn = document.createElement("div");

    createColumn.className = "col-12 col-md-6";

    createColumn.append(createForm);

    const updateColumn = document.createElement("div");

    updateColumn.className = "col-12 col-md-6";

    updateColumn.append(updateForm);

    forms.append(createColumn, updateColumn);

    const generateButton = this.createGenerateButton(onGenerate);

    const list = this.createCarsList();

    const pagination = this.pagination.render(
      currentPage,
      totalCount,
      pageSize,
      onPageChange,
    );

    cars.forEach((car) => {
      const isDriving = drivingCarIds.has(car.id);

      const column = document.createElement("div");

      column.className = "col-12 col-md-4";

      column.append(
        this.carCard.render(
          car,
          onRemove,
          onSelect,
          onStart,
          onStop,
          isDriving,
        ),
      );

      list.append(column);
    });

    container.append(
      title,
      garageInfo,
      forms,
      generateButton,
      list,
      pagination,
    );

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

  private createGenerateButton(onGenerate: () => void): HTMLButtonElement {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "btn btn-secondary mb-3";
    button.textContent = "Generate 100 cars";

    button.addEventListener("click", () => onGenerate());

    return button;
  }
}
