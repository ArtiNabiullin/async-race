import { Header } from "./components/Header";

export class App {
  public init(): void {
    this.render();
  }

  private render(): void {
    const app = document.querySelector("#app");

    if (!app) {
      return;
    }

    const header = new Header();

    app.append(header.render());
  }
}
