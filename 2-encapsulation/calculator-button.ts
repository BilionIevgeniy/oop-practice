import { injectCss } from "./utils.ts";

export class CalculatorButton {
  root: HTMLButtonElement;

  constructor(text: string) {
    this.root = this.createRoot(text);
    this.initCss();
  }

  public renderTo(container: HTMLElement) {
    container.appendChild(this.root);
  }

  public setText(text: string) {
    this.root.textContent = text;
  }

  private createRoot(text: string) {
    const root = document.createElement("button");
    root.classList.add("calculator_button");
    root.textContent = text;
    return root;
  }

  private initCss() {
    injectCss(
      /*css*/ `
      .calculator_button {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 3px;
        background-color: #f5f5f5;
        color: #333;  
        cursor: pointer;
      }
      .calculator_button:hover {
        
        background-color: #3498db;
        color: #fff;
      }
    `,
      "calculator_button",
    );
  }
}
