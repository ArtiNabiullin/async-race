import type { Car, CarData } from "../models/car";

export class CarForm {
  public render(
    onSave: (carData: CarData) => void,
    selectedCar: Car | null = null,
    buttonText = selectedCar === null ? "Create" : "Update",
    isDisabled = false,
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

    const formButton = document.createElement("button");

    formButton.type = "submit";
    formButton.className = "btn btn-success";
    formButton.textContent = buttonText;
    formButton.disabled = isDisabled;

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const carData: CarData = {
        name: nameInput.value.trim(),
        color: colorInput.value,
      };

      onSave(carData);
    });

    form.append(nameInput, colorInput, formButton);

    return form;
  }
}
