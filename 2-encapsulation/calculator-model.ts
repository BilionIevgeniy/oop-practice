import { CalculatorDisplay } from "./calculator-display.ts";
import { CalculatorExpression } from "./calculator-expression.ts";
import { CalculatorHistory } from "./calculator-history.ts";

export class CalculatorModel {
  private leftOperand: number | null = null;
  private operator: string | null = null;
  private rightOperand: number | null = null;
  private result: number | null = null;

  constructor(
    private display: CalculatorDisplay,
    private expression: CalculatorExpression,
    private history: CalculatorHistory,
  ) {}

  public addDigitToDisplay(digitText: string) {
    if (this.result !== null) {
      this.result = null;
      this.leftOperand = null;
      this.expression.clear();
    }
    if (this.operator) {
      this.rightOperand = parseInt(`${this.rightOperand ?? ""}${digitText}`);
      this.display.setText(`${this.rightOperand}`);
    } else {
      this.leftOperand = parseInt(`${this.leftOperand ?? ""}${digitText}`);
      this.display.setText(`${this.leftOperand}`);
    }
  }

  public clearDisplay() {
    this.display.clear();
    this.leftOperand = null;
    this.rightOperand = null;
    this.operator = null;
    this.result = null;
    this.expression.clear();
  }

  public addOperator(newOperator: string) {
    const { leftOperand, rightOperand, operator } = this;
    if (this.result !== null) {
      this.result = null;
    }
    if (leftOperand !== null && rightOperand !== null && operator) {
      this.calculate();
      this.addOperator(newOperator);
    }

    if (this.leftOperand) {
      this.operator = newOperator;
      this.expression.setText(this.leftOperand, this.operator);
      this.display.clear();
    }
  }

  public calculate() {
    const { leftOperand, rightOperand, operator } = this;
    if (leftOperand !== null && rightOperand !== null && operator) {
      let result: number = 0;
      switch (operator) {
        case "+":
          result = leftOperand + rightOperand;
          break;
        case "-":
          result = leftOperand - rightOperand;
          break;
        case "*":
          result = leftOperand * rightOperand;
          break;
        case "/":
          if (rightOperand === 0) {
            alert("Warning: cant devide by 0");
            return;
          }
          result = leftOperand / rightOperand;
          break;
        default:
          console.warn("Unknown operator:", operator);
      }
      this.result = result;
      this.expression.setText(this.result);
      this.history.addHistory(leftOperand, operator, rightOperand, result);
      this.display.clear();
      this.leftOperand = this.result;
      this.rightOperand = null;
      this.operator = null;
    }
  }
}
