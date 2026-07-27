export class Header {
  public render(): HTMLElement {
    const header = document.createElement("header");
    header.className = "container py-3";
    header.textContent = "Async-race";

    return header;
  }
}
