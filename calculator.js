let currentNum = "";
let previousNum = "";
let operator = "";

const wrapper = document.querySelector(".wrapper");
const numberButtons = document.querySelectorAll(".operand");
const operatorButtons = document.querySelectorAll(".operator");
const currentDisplayNumber = document.querySelector(".current-number");
const previousDisplayNumber = document.querySelector(".previous-number");

//to listen keyboard clicks
window.addEventListener("keydown", (e) => {
  handleKeyPress(e);
});

const equal = document.querySelector(".equal");
equal.addEventListener("click", () => {
  if (currentNum != "" && previousNum != "") {
    calculate();
  }
});

const clear = document.querySelector(".clear");
clear.addEventListener("click", clearDisplay);

//listening decimal button click and firing the fn
const decimal = document.querySelector("#decimal");
decimal.addEventListener("click", () => {
  addDecimal();
});

//invert signs
const invertSign = document.querySelector(".invert-sign");
invertSign.addEventListener("click", () => {
  handleInvertSign();
});

//added eventLintener to each operand button click
numberButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
  });
});

//displaying numbers on the display after every button click
function handleNumber(number) {
  if (previousNum !== "" && currentNum !== "" && operator === "") {
    previousNum = "";
    currentDisplayNumber.textContent = currentNum;
  }
  if (currentNum.length < 8) {
    currentNum += number;
    //currentNum and number are string
    //we are concatintating string
    currentDisplayNumber.textContent = currentNum;
  }
}

operatorButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleOperator(e.target.textContent);
  });
});

function handleOperator(op) {
  if (previousNum === "") {
    previousNum = currentNum;
    operatorCheck(op);
  } else if (currentNum === "") {
    operatorCheck(op);
  } else if (op === "%") {
    //do nothing
  } else {
    calculate();
    operator = op;

    currentDisplayNumber.textContent = "0";
    previousDisplayNumber.textContent = previousNum + " " + operator;
  }
}

function operatorCheck(val) {
  if (val === "%") {
    percentOperator();
  } else {
    operator = val;
    previousDisplayNumber.textContent = previousNum + " " + operator;
    currentDisplayNumber.textContent = "0";
    currentNum = "";
  }
}

function percentOperator() {
  currentNum = Number(currentNum);
  currentNum = (currentNum / 100).toString();
  previousNum = currentNum;
  currentDisplayNumber.textContent = currentNum;
  previousDisplayNumber.textContent = "";
  console.log(currentNum);
}

function calculate() {
  previousNum = Number(previousNum);
  currentNum = Number(currentNum);
  console.log(currentNum);

  if (operator === "+") {
    previousNum = previousNum + currentNum;
  } else if (operator === "-") {
    previousNum = previousNum - currentNum;
  } else if (operator === "/") {
    if (currentNum <= 0) {
      previousNum = "error";
      displayResults();
      return;
    }
    previousNum = previousNum / currentNum;
  } else if (operator === "x" || operator === "*") {
    previousNum = previousNum * currentNum;
  }

  previousNum = previousNum.toString();
  displayResults();
  operator = "";
}

function displayResults() {
  if (previousNum.length < 8) {
    currentDisplayNumber.textContent = previousNum;
  } else {
    currentDisplayNumber.textContent = previousNum.slice(0, 8);
  }

  previousDisplayNumber.textContent = ""; //clearing prev number

  operator = "";
  currentNum = "";
}

function roundNumber(num) {
  return Math.round(num * 100000) / 10000;
}

function clearDisplay() {
  previousNum = "";
  currentNum = "";
  operator = "";
  previousDisplayNumber.textContent = "";
  currentDisplayNumber.textContent = "0";
}

function addDecimal() {
  if (!currentNum.includes(".")) {
    currentNum += ".";
    currentDisplayNumber.textContent = currentNum;
  }
}

//this function controls keyboard click
function handleKeyPress(e) {
  console.log(e.key);
  if (e.key >= 0 || e.key <= 9) {
    handleNumber(e.key);
  }

  if (
    e.key === "+" ||
    e.key === "-" ||
    e.key === "%" ||
    e.key === "/" ||
    e.key === "x"
  ) {
    handleOperator(e.key);
  }

  if (e.key === "*") {
    handleOperator("x");
  }

  if (
    e.key === "=" ||
    (e.key === "Enter" && (previousNum !== "") & (currentNum !== ""))
  ) {
    calculate();
  }

  if (e.key === ".") {
    addDecimal();
  }

  if (e.key === "Backspace") {
    handleDelete();
  }
}

function handleDelete() {
  if (currentNum !== "") {
    currentNum = currentNum.slice(0, -1);
    currentDisplayNumber.textContent = currentNum;
  }
  if (currentNum === "") {
    currentDisplayNumber.textContent = "0";
  }
}

function handleInvertSign() {
  if (currentNum !== "" || currentNum !== "0") {
    currentNum = currentNum * -1;
    currentDisplayNumber.textContent = currentNum;
  }
}
