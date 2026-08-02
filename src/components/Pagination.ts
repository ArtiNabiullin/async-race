export class Pagination {
  public render(
    currentPage: number,
    totalCount: number,
    pageSize: number,
    onPageChance: (page: number) => void,
  ): HTMLElement {
    const container = document.createElement("div");
    container.className = "d-flex justify-content-center gap-2 mt-4";

    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

    const previousButton = this.createButton("Previous");
    previousButton.disabled = currentPage <= 1;
    previousButton.addEventListener("click", () =>
      onPageChance(currentPage - 1),
    );

    const pageInfo = document.createElement("span");
    pageInfo.className = "align-self-center";
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

    const nextButton = this.createButton("Next");
    nextButton.disabled = currentPage >= totalPages;
    nextButton.addEventListener("click", () => onPageChance(currentPage + 1));

    container.append(previousButton, pageInfo, nextButton);

    return container;
  }

  private createButton(text: string): HTMLButtonElement {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "btn btn-outline-primary";
    button.textContent = text;

    return button;
  }
}
