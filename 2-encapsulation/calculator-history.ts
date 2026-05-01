import { createElementFromHTML, injectCss } from "./utils.ts";

export class CalculatorHistory {
  root: HTMLDivElement;

  constructor() {
    this.root = this.createRoot();
    this.initCss();
  }

  public renderTo(container: HTMLElement) {
    container.appendChild(this.root);
  }

  public addHistory(
    leftOperand: number,
    operator: string,
    rightOperand: number,
    result: number,
  ) {
    let historyItemClass: string = "";
    switch (operator) {
      case "+":
        historyItemClass = "add";
        break;
      case "-":
        historyItemClass = "subtract";
        break;
      case "/":
        historyItemClass = "divide";
        break;
      case "*":
        historyItemClass = "multiply";
        break;
      default:
        console.warn("Unknown operator:", operator);
    }
    const text = `
      <div class="calculator_history-item ${historyItemClass}">
        <span class="calculator_history-item__left">${leftOperand}</span>
        <span class="calculator_history-item__operator">${operator}</span>
        <span class="calculator_history-item__right">${rightOperand}</span>
        =
        <span class="calculator_history-item__result">${result}</span>
      </div>
    `;
    const Node = createElementFromHTML(text);
    this.root.appendChild(Node);
  }

  private createRoot() {
    const root = document.createElement("div");
    root.classList.add("calculator_history");
    root.textContent = "History";
    return root;
  }

  private initCss() {
    injectCss(
      /*css*/ `
    .calculator_history {
      margin-top: 20px;
      padding: 10px;
      background: #f9f9f9;
      border-radius: 3px;
      min-height: 100px;
    }
    .calculator_history-item {
      padding: 5px;
      margin: 2px 0;
      border-radius: 3px;
    }
    .calculator_history-item.add {
      color: #2ecc71;
    }
    .calculator_history-item.subtract {
      color: #e74c3c;
    }

    .calculator_history-item.multiply {
      color: #3498db;
    }

    .calculator_history-item.divide {
      color: #9b59b6;
    }

    .calculator_history-item.error {
      color: #e74c3c;
      font-weight: bold;
    }
    `,
      "calculator_history",
    );
  }
}
