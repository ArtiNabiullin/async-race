import { Header } from "./components/Header";
import { getCars } from "./api/carsApi";

export class App {
  public async init(): Promise<void> {
    const cars = await getCars();

    console.log(cars);
  }
}
