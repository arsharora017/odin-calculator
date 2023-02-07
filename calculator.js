let currentNum = "";
let previousNum = "";
let operator = "";
const wrapper = document.querySelector(".wrapper");
const numberButtons = document.querySelectorAll(".operand");
const operatorButtons = document.querySelectorAll(".operator");
const currentDisplayNumber = document.querySelector(".current-number");
const previousDisplayNumber = document.querySelector(".previous-number");

const equal = document.querySelector(".equal");
equal.addEventListener("click", calculate);

const clear = document.querySelector(".clear");

// window.addEventListener("keydown", function (e) {
//   const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
//   key.click();
// });

// function updateDisplay() {
//   const display = document.querySelector(".display");
//   display.innerText = "0";
// }

//updateDisplay();

//added eventLintener to each operand button click
numberButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
  });
});

//displaying numbers on the display after every button click
function handleNumber(number) {
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
  operator = op;
  previousNum = currentNum;
  previousDisplayNumber.textContent = previousNum + op;
  currentNum = "";
  currentDisplayNumber.textContent = "";
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
  }
  previousNum = previousNum.toString();
  displayResults();
  operator = "";
}

function displayResults() {
  previousDisplayNumber.textContent = ""; //clearing prev number
  currentDisplayNumber.textContent = previousNum;
}
