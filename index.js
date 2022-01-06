let currentDisplay = document.querySelector(".display > p").textContent;
let readyForNewNumber = true;
let hasOperator = false;
let firstNumber;
let secondNumber;
let operator;
let haveFirstNumber = false;
let lastButtonPressed;
let lastOperatorPressed;
let canAddDecimal = true;

function add(num1, num2) {
    console.log(`Adding ${num1} and ${num2}`)
    firstNumber = +num1 + +num2;
    return round(num1 + num2);
}

function subtract(num1, num2) {
    firstNumber = +num1 - +num2;
    return round(num1 - num2);
}

function multiply(num1, num2) {
    firstNumber = num1 * num2;
    return round(num1 * num2);
}

function divide(num1, num2) {
    if (num2 == 0) {
        alert("Dividing by zero is illegal.");
        return num1;
    }
    firstNumber = num1 / num2;
    return round(num1 / num2);
}

function round(num) {
    return Math.round(num * 1000) / 1000;
}

function operate(operator, num1, num2) {
    readyForNewNumber = true;
    if (lastButtonPressed !== "add" && lastButtonPressed !== "subtract" &&
        lastButtonPressed !== "multiply" && lastButtonPressed !== "divide") {
        hasOperator = false;
    }
    switch (operator) {
        case "add":
            return add(num1, num2);
        case "subtract":
            return subtract(num1, num2);
        case "multiply":
            return multiply(num1, num2);
        case "divide":
            return divide(num1, num2);
        default:
            console.log(operator);
            alert("Invalid operator, try again.");
            break;
    }
}

function updateDisplay(input) {
    const display = document.querySelector(".display > p");
    if (readyForNewNumber) {
        display.textContent = input;
        readyForNewNumber = false;
    } else if (lastButtonPressed === "backspace"){
        display.textContent = input;
    } else {
        display.textContent += input;
    }
    currentDisplay = display.textContent;
}

function storeFirstNumber(num) {
    console.log("calling storeFirstNumber");
    firstNumber = +num;
    haveFirstNumber = true;
    return firstNumber;
}

function storeSecondNumber(num) {
    secondNumber = +num;
    return secondNumber;
}

const numberButtons = document.querySelectorAll(".number-button");
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        updateDisplay(button.textContent);
        lastButtonPressed = button.id;
    });
});

const operatorButtons = document.querySelectorAll(".operator-button");
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if(lastButtonPressed === "comma") {
            return;
        }
        if (lastButtonPressed === "add" || lastButtonPressed === "subtract" ||
            lastButtonPressed === "multiply" || lastButtonPressed === "divide") {
            if (hasOperator) {
                operator = button.id;
                return;
            }
        }
        if (!haveFirstNumber) {
            storeFirstNumber(currentDisplay);
        } else if (lastButtonPressed === "equal") {
            storeFirstNumber(currentDisplay);
        } else {
            storeSecondNumber(currentDisplay);
        }
        if (hasOperator) {
            updateDisplay(operate(operator, firstNumber, secondNumber));
        } else {
            hasOperator = true;
        }
        lastButtonPressed = button.id;
        lastOperatorPressed = button.id;
        hasOperator = true;
        operator = button.id;
        readyForNewNumber = true;
    });
});

const equalButton = document.querySelector("#equal");
equalButton.addEventListener("click", () => {
    if (!hasOperator) {
        readyForNewNumber = true;
        haveFirstNumber = false;
        return;
    }
    if (haveFirstNumber) {
        storeSecondNumber(currentDisplay);
        readyForNewNumber = true;
        updateDisplay(operate(operator, firstNumber, secondNumber));
    } else {
        storeFirstNumber(currentDisplay);
    }
    readyForNewNumber = true;
    hasOperator = false;
    lastButtonPressed = equalButton.id;
});

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
    resetData();
});

function resetData() {
    document.querySelector(".display > p").textContent = "0";
    currentDisplay = document.querySelector(".display > p").textContent;
    readyForNewNumber = true;
    hasOperator = false;
    firstNumber = "";
    secondNumber = "";
    operator = "";
    haveFirstNumber = false;
    lastButtonPressed = "";
    canAddDecimal = true;
}

function addDecimal() {
    updateDisplay(".");
}

function backspace() {
    let displayedText = document.querySelector(".display > p").textContent;
    lastButtonPressed = "backspace";
    if(displayedText !== "") {
        console.log("Backspace pressed");
        displayedText = displayedText.slice(0, displayedText.length - 1);
        if(displayedText === "") displayedText = 0;
        updateDisplay(displayedText);
    } else {
        return;
    }
}

const backspaceButton = document.querySelector("#backspace");
backspaceButton.addEventListener("click", () => {
    backspace();
})

const decimalButton = document.querySelector("#comma");
decimalButton.addEventListener("click", () => {
    if (lastButtonPressed === decimalButton.id) return;
    if (lastButtonPressed === "add" || lastButtonPressed === "subtract" ||
        lastButtonPressed === "multiply" || lastButtonPressed === "divide") {
        if (readyForNewNumber) {
            for (let i = 0; i < currentDisplay.length - 1; i++) {
                if (currentDisplay.charAt(i) === ".") {
                    lastButtonPressed = decimalButton.id;
                    return;
                } else {
                    addDecimal();
                    lastButtonPressed = decimalButton.id;
                    return;
                }
            }
        }
    }
    for (let i = 0; i < currentDisplay.length - 1; i++) {
        if (currentDisplay.charAt(i) === ".") {
            lastButtonPressed = decimalButton.id;
            return;
        }
    }
    lastButtonPressed = decimalButton.id;
    addDecimal();
});

/*const squareButton = document.querySelector("#square");
squareButton.addEventListener("click", () => {
    if(hasOperator && haveFirstNumber && currentDisplay !== firstNumber) {
        updateDisplay(square(operate(operator, firstNumber, currentDisplay)));
    }
    readyForNewNumber = true;
    updateDisplay(square(currentDisplay));
    readyForNewNumber = true;
});*/