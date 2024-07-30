let displayValue = '0';
let pendingValue = null;
let operator = null;
let history = [];
let expression = '';

const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');
const historyButton = document.getElementById('historyButton');
const clearHistoryButton = document.getElementById('clearHistoryButton');

document.addEventListener('keydown', handleKeyPress);

function updateDisplay() {
    display.innerText = displayValue;
}

function updateHistory() {
    historyDisplay.innerText = history.join('\n');
}

function clearDisplay() {
    displayValue = '0';
    pendingValue = null;
    operator = null;
    expression = '';
    updateDisplay();
}

function appendNumber(number) {
    if (displayValue === '0') {
        displayValue = number;
    } else {
        displayValue += number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator !== null) {
        calculateIntermediate();
    }
    pendingValue = displayValue;
    displayValue = '0';
    operator = op;
    expression += ` ${pendingValue} ${op}`;
}

function appendDot() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
    updateDisplay();
}

function calculateIntermediate() {
    if (operator === null || pendingValue === null) {
        return;
    }

    let result;
    const currentValue = parseFloat(displayValue);
    const previousValue = parseFloat(pendingValue);

    switch (operator) {
        case '+':
            result = previousValue + currentValue;
            break;
        case '-':
            result = previousValue - currentValue;
            break;
        case '*':
            result = previousValue * currentValue;
            break;
        case '/':
            result = previousValue / currentValue;
            break;
        case '%':
            result = previousValue % currentValue;
            break;
        default:
            return;
    }

    displayValue = result.toString();
    pendingValue = result.toString();
    operator = null;
    updateDisplay();
}

function calculate() {
    if (operator === null || pendingValue === null) {
        return;
    }

    expression += ` ${displayValue}`;
    calculateIntermediate();
    history.push(`${expression} = ${displayValue}`);
    updateHistory();

    expression = '';
    operator = null;
    pendingValue = displayValue;
    updateDisplay();
}

function backspace() {
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = '0';
    }
    updateDisplay();
}

function toggleHistory() {
    if (historyDisplay.style.display === 'none') {
        historyDisplay.style.display = 'block';
        clearHistoryButton.style.display = 'block';
    } else {
        historyDisplay.style.display = 'none';
        clearHistoryButton.style.display = 'none';
    }
}

function clearHistory() {
    history = [];
    updateHistory();
}

function handleKeyPress(event) {
    const key = event.key;

    if (!isNaN(key)) {
        appendNumber(key);
    } else if (key === '.') {
        appendDot();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
        appendOperator(key);
    } else if (key.toLowerCase() === 'c') {
        clearDisplay();
    }
}
