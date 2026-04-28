import { injectCss } from "./utils.ts";

export class CalculatorDisplay {
  root: HTMLDivElement;

  constructor() {
    this.root = this.createRoot();
    this.initCss();
  }

  public renderTo(container: HTMLElement) {
    container.appendChild(this.root);
  }

  public setText(text: string) {
    this.root.textContent = text;
  }

  public clear() {
    this.root.textContent = "0";
  }

  private createRoot() {
    const root = document.createElement("div");
    root.classList.add("calculator_display");
    root.textContent = "0";
    return root;
  }

  private initCss() {
    injectCss(
      /*css*/ `
      .calculator_display {
        font-size: 24px;
        margin-bottom: 10px;
        padding: 10px;
        background: #f5f5f5;
        border-radius: 3px;
      }
    `,
      "calculator_display",
    );
  }
}
