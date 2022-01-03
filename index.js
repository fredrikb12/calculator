let currentDisplay;
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    return operator(num1, num2);
}

function updateDisplay(text) {
    const display = document.querySelector(".display > p");
    display.textContent = text;
    currentDisplay = display.textContent;
}

const numberButtons = document.querySelectorAll(".number-button");
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        updateDisplay(button.textContent);
    });
});