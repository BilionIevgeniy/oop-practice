// Procedural Calculator Implementation in TypeScript

let display: HTMLElement | null = null;
let expressionElement: HTMLElement | null = null;
let historyElement: HTMLElement | null = null;
let currentNumber: string = "0";
let firstOperand: number | null = null;
let operator: string | null = null;

// Update display
function updateDisplay() {
  if (display) {
    display.textContent = currentNumber;
  }
}

// Update expression
function updateExpression() {
  if (expressionElement) {
    if (firstOperand !== null && operator !== null) {
      expressionElement.textContent = `${firstOperand} ${operator}`;
    } else {
      expressionElement.textContent = "";
    }
  }
}

// Append number
function appendNumber(num: string) {
  if (currentNumber === "0") {
    currentNumber = num;
  } else {
    currentNumber += num;
  }
  updateDisplay();
}

// Clear calculator
function clear() {
  currentNumber = "0";
  firstOperand = null;
  operator = null;
  updateDisplay();
  updateExpression();
}

// Perform operation
function performOperation(isOperator: boolean = false) {
  if (firstOperand === null || operator === null) return;

  const secondOperand = parseFloat(currentNumber);
  let result: number;
  let historyItemClass: string;
  switch (operator) {
    case "+":
      result = firstOperand + secondOperand;
      historyItemClass = "add";
      break;
    case "-":
      result = firstOperand - secondOperand;
      historyItemClass = "subtract";
      break;
    case "/":
      if (secondOperand === 0) {
        alert("Ошибка: деление на ноль");
        clear();
        return;
      }
      result = firstOperand / secondOperand;
      historyItemClass = "divide";
      break;
    case "*":
      result = firstOperand * secondOperand;
      historyItemClass = "multiply";
      break;
    default:
      return;
  }

  if (historyElement) {
    const historyItem = document.createElement("div");
    historyItem.className = `history-item ${historyItemClass}`;
    historyItem.textContent = `${firstOperand} ${operator} ${secondOperand} = ${result}`;
    historyElement.appendChild(historyItem);
  }

  if (!isOperator) {
    currentNumber = result.toString();
    firstOperand = null;
    operator = null;
    updateDisplay();
    updateExpression();
  } else {
    firstOperand = result;
    currentNumber = "0";
  }
}

// Set operator
function setOperator(op: string) {
  if (firstOperand === null) {
    firstOperand = parseFloat(currentNumber);
    currentNumber = "0";
  } else if (operator !== null && currentNumber !== "0") {
    performOperation(true);
  }
  operator = op;
  updateDisplay();
  updateExpression();
}

// Initialize calculator
function initCalculator() {
  display = document.getElementById("display");
  expressionElement = document.getElementById("expression");
  historyElement = document.getElementById("history");
  clear();

  // Add event listeners for numeric buttons
  for (let i = 0; i <= 9; i++) {
    document
      .getElementById(`num${i}`)
      ?.addEventListener("click", () => appendNumber(i.toString()));
  }

  // Add event listeners for operator buttons
  document
    .getElementById("addButton")
    ?.addEventListener("click", () => setOperator("+"));
  document
    .getElementById("subtractButton")
    ?.addEventListener("click", () => setOperator("-"));
  document
    .getElementById("divideButton")
    ?.addEventListener("click", () => setOperator("/"));
  document
    .getElementById("multiplyButton")
    ?.addEventListener("click", () => setOperator("*"));
  // Add event listeners for special buttons
  document.getElementById("clearButton")?.addEventListener("click", clear);
  document
    .getElementById("equalsButton")
    ?.addEventListener("click", () => performOperation());
}

// Initialize calculator on page load
document.addEventListener("DOMContentLoaded", initCalculator);
