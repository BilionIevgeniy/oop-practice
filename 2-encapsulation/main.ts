import { CalculatorButton } from "./calculator-button.ts";
import { CalculatorDisplay } from "./calculator-display.ts";
import { CalculatorExpression } from "./calculator-expression.ts";
import { CalculatorModel } from "./calculator-model.ts";
import { injectCss } from "./utils.ts";

class Calculator {
  private root: HTMLDivElement;
  private display: CalculatorDisplay;
  private expression: CalculatorExpression;
  private buttons: CalculatorButton[];
  private model: CalculatorModel;

  constructor() {
    this.display = new CalculatorDisplay();
    this.expression = new CalculatorExpression();
    this.model = new CalculatorModel(this.display, this.expression);
    this.buttons = [
      new CalculatorButton("7").onClick(() =>
        this.model.addDigitToDisplay("7"),
      ),
      new CalculatorButton("8").onClick(() =>
        this.model.addDigitToDisplay("8"),
      ),
      new CalculatorButton("9").onClick(() =>
        this.model.addDigitToDisplay("9"),
      ),
      new CalculatorButton("/").onClick(() => {
        this.model.addOperator("/");
      }),
      new CalculatorButton("4").onClick(() =>
        this.model.addDigitToDisplay("4"),
      ),
      new CalculatorButton("5").onClick(() =>
        this.model.addDigitToDisplay("5"),
      ),
      new CalculatorButton("6").onClick(() =>
        this.model.addDigitToDisplay("6"),
      ),
      new CalculatorButton("-").onClick(() => {
        this.model.addOperator("-");
      }),
      new CalculatorButton("1").onClick(() =>
        this.model.addDigitToDisplay("1"),
      ),
      new CalculatorButton("2").onClick(() =>
        this.model.addDigitToDisplay("2"),
      ),
      new CalculatorButton("3").onClick(() =>
        this.model.addDigitToDisplay("3"),
      ),
      new CalculatorButton("+").onClick(() => {
        this.model.addOperator("+");
      }),
      new CalculatorButton("0").onClick(() =>
        this.model.addDigitToDisplay("0"),
      ),
      new CalculatorButton("C").onClick(() => this.model.clearDisplay()),
      new CalculatorButton("=").onClick(() => this.model.calculate()),
      new CalculatorButton("*").onClick(() => {
        this.model.addOperator("*");
      }),
    ];
    this.root = this.createRoot();
    this.initCss();
  }

  public renderTo(container: HTMLElement) {
    container.appendChild(this.root);
  }

  private createRoot() {
    const root = document.createElement("div");
    root.classList.add("calculator");
    this.expression.renderTo(root);
    this.display.renderTo(root);

    const buttonsWrapper = document.createElement("div");
    buttonsWrapper.classList.add("calculator_buttons");
    root.appendChild(buttonsWrapper);

    this.buttons.forEach((button) => {
      button.renderTo(buttonsWrapper);
    });
    return root;
  }

  private initCss() {
    injectCss(
      /*css*/ `
      .calculator {
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 5px;
        margin: 20px 0;
      }
      .calculator_buttons {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        margin: 10px 0;
      }
    `,
      "calculator",
    );
  }
}

const calc = new Calculator();
calc.renderTo(document.body);
