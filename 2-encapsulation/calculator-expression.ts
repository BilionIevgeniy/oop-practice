import { injectCss } from "./utils.ts";

export class CalculatorExpression {
  root: HTMLDivElement;

  constructor() {
    this.root = this.createRoot();
    this.initCss();
  }

  public renderTo(container: HTMLElement) {
    container.appendChild(this.root);
  }

  public setText(num: number, operator?: string) {
    if (!operator) {
      this.root.textContent = `${num}`;
      return;
    }
    this.root.textContent = `${num} ${operator}`;
  }

  public clear() {
    this.root.textContent = "";
  }

  private createRoot() {
    const root = document.createElement("div");
    root.classList.add("calculator_expression");
    root.textContent = "";
    return root;
  }

  private initCss() {
    injectCss(
      /*css*/ `
      .calculator_expression {
        font-size: 18px;
        color: #666;
        margin-bottom: 5px;
        min-height: 24px;
        padding: 5px 10px;
      }
    `,
      "calculator_expression",
    );
  }
}
