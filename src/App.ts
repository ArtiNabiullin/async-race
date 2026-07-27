import { GarageService } from "./services/garageService";
import { GarageView } from "./views/GarageView";

export class App {
  private readonly garageService = new GarageService();
  private readonly garageView = new GarageView();

  public async init(): Promise<void> {
    const cars = await this.garageService.getGarage();

    const view = this.garageView.render(cars);

    document.body.append(view);
  }
}
