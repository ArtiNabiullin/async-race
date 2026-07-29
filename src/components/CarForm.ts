import type { Car, CarData } from "../models/car";

export class CarForm {
  public render(
    onCreate: (carData: CarData) => void,
    selectedCar: Car | null = null,
  ): HTMLFormElement {
    const form = document.createElement("form");
    form.className = "d-flex gap-2 mb-4";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Car name";
    nameInput.required = true;
    nameInput.className = "form-control";
    nameInput.value = selectedCar?.name ?? "";

    const colorInput = document.createElement("input");
    colorInput.type = "color";
    colorInput.value = selectedCar?.color ?? "#000000";
    colorInput.className = "form-control form-control-color";

    const createButton = document.createElement("button");
    createButton.type = "submit";
    createButton.className = "btn btn-success";
    createButton.textContent = selectedCar ? "Update" : "Create";

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const carData: CarData = {
        name: nameInput.value.trim(),
        color: colorInput.value,
      };

      onCreate(carData);
    });

    form.append(nameInput, colorInput, createButton);

    return form;
  }
}
