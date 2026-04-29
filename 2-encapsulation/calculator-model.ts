import { CalculatorDisplay } from "./calculator-display.ts";

export class CalculatorModel {
  private num: number | null = null;
  private leftOperand: number | null = null;
  private operator: string | null = null;
  private rightOperand: number | null = null;
  private display: CalculatorDisplay;

  constructor(display: CalculatorDisplay) {
    this.display = display;
  }

  public addDigitToDisplay(digitText: string) {
    this.leftOperand = parseInt(`${this.num ?? ""}${digitText}`);
    this.display.setText(`${this.num}`);
  }

  public clearDisplay() {
    this.num = null;
    this.display.clear();
  }

  public addOperator(operator: string) {
    this.operator = operator;
    this.display.setText(`${operator}`);
  }
}
