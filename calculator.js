let currentNum = "";
let previousNum = "";
let operator = "";
const wrapper = document.querySelector(".wrapper");
const numberButtons = document.querySelectorAll(".operand");
const operatorButtons = document.querySelectorAll(".operator");
const currentDisplayNumber = document.querySelector(".current-number");
const previousDisplayNumber = document.querySelector(".previous-number");

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

// window.addEventListener("keydown", function (e) {
//   const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
//   key.click();
// });

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
  // if (currentNum.includes(".")) {
  // }
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
  } else {
    calculate();
    operator = op;
    currentDisplayNumber.textContent = "0";
    previousDisplayNumber.textContent = previousNum + " " + operator;
  }
}

function operatorCheck(val) {
  operator = val;
  previousDisplayNumber.textContent = previousNum + " " + operator;
  currentDisplayNumber.textContent = "0";
  currentNum = "";
}

function calculate() {
  previousNum = Number(previousNum);
  currentNum = Number(currentNum);

  if (operator === "+") {
    previousNum += currentNum;
  } else if (operator === "-") {
    previousNum = previousNum - currentNum;
  } else if (operator === "/") {
    if (currentNum <= 0) {
      previousNum = "error";
      displayResults();
      return;
    }
    previousNum = previousNum / currentNum;
  } else if (operator === "x") {
    previousNum = previousNum * currentNum;
  } else if (operator === "%") {
    previousNum = 100 / currentNum;
  }

  previousNum = previousNum.toString();
  displayResults();
  operator = "";
}

function displayResults() {
  //currentDisplayNumber.textContent = previousNum;
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
