const display = document.getElementById("display");
let currentInput = "";
let resultDisplayed = false;

// Append number or operator to current input
function updateDisplay(value) {
  if (resultDisplayed) {
    if (!isNaN(value) || value === ".") {
      currentInput = "";
    }
    resultDisplayed = false;
  }
  currentInput += value;
  display.textContent = currentInput;
  adjustFontSize();
}

// Evaluate the input string
function calculateResult() {
  try {
    currentInput = eval(currentInput).toString();
    display.textContent = currentInput;
    adjustFontSize();
    resultDisplayed = true;
  } catch {
    display.textContent = "Error";
    currentInput = "";
  }
}

// Clear everything
function clearAll() {
  currentInput = "";
  display.textContent = "0";
}

// Clear entry
function clearEntry() {
  currentInput = currentInput.slice(0, -1);
  display.textContent = currentInput || "0";
}

// Adjust font size based on input length
function adjustFontSize() {
  const length = display.textContent.length;
  if (length > 12) {
    display.style.fontSize = "1.2em";
  } else {
    display.style.fontSize = "2em";
  }
}

// Event Listeners
document.querySelectorAll(".number, .signs").forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.getAttribute("data-value");
    updateDisplay(value);
  });
});

document.getElementById("equals").addEventListener("click", calculateResult);
document.getElementById("clear-all").addEventListener("click", clearAll);
document.getElementById("clear-entry").addEventListener("click", clearEntry);
document.getElementById("percent").addEventListener("click", () => {
  if (currentInput !== "") {
    currentInput = (parseFloat(currentInput) / 100).toString();
    display.textContent = currentInput;
  }
});

// keydown event listeners
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (!isNaN(key) || key === ".") {
    updateDisplay(key);
    adjustFontSize();
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    updateDisplay(key);
    adjustFontSize();
  } else if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculateResult();
  } else if (key === "Backspace") {
    clearEntry();
  } else if (key.toLowerCase() === "c") {
    clearAll();
  } else if (key === "%") {
    if (currentInput !== "") {
      currentInput = (parseFloat(currentInput) / 100).toString();
      display.textContent = currentInput;
      adjustFontSize();
    }
  }
});
