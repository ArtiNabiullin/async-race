import type { Car } from "../models/car";

export class CarControls {
  public render(
    car: Car,
    onRemove: (id: number) => void,
    onSelect: (id: number) => void,
    onStart: (id: number) => void,
    onStop: (id: number) => void,
    isDriving = false,
  ): HTMLElement {
    const container = document.createElement("div");
    container.className = "d-flex flex-wrap gap-2";

    const selectButton = this.createButton("Select", "btn-primary");
    selectButton.dataset.id = String(car.id);
    selectButton.addEventListener("click", () => onSelect(car.id));

    const removeButton = this.createButton("Remove", "btn-danger");
    removeButton.dataset.id = String(car.id);
    removeButton.addEventListener("click", () => onRemove(car.id));

    const startButton = this.createButton("Start", "btn-success");
    startButton.dataset.id = String(car.id);
    startButton.disabled = isDriving;
    startButton.addEventListener("click", () => {
      startButton.disabled = true;
      stopButton.disabled = false;

      onStart(car.id);
    });

    const stopButton = this.createButton("Stop", "btn-warning");
    stopButton.dataset.id = String(car.id);
    stopButton.disabled = !isDriving;
    stopButton.addEventListener("click", () => {
      stopButton.disabled = true;
      startButton.disabled = false;

      onStop(car.id);
    });

    container.append(selectButton, removeButton, startButton, stopButton);

    return container;
  }

  private createButton(text: string, className: string): HTMLButtonElement {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = `btn ${className}`;

    return button;
  }
}
