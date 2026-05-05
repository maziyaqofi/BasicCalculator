// Basic Calculator Script
const buttons = document.querySelectorAll('.btn');
const expressionEl = document.getElementById('expression');
const resultEl = document.getElementById('result');
const historyEl = document.getElementById('history');

// Theme Toggle - Dark Mode
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    // update icon
    themeToggle.textContent = isDark ? "🌙" : "☀️";

    // simpan ke localStorage
    localStorage.setItem("theme", isDark ? "dark" : "light");
});

let historyList = [];
let currentInput = "";
let expression = "";
let result = 0;

// Click all buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        handleInput(value);
    });
});

// Handle input
function handleInput(value) {
    if (value === 'C') {
        clearAll();
    }

    else if (value === '=') {
        calculate();
    }

    else if (isOperator(value)) {
        handleOperator(value);
    }

    else {
        handlenumber(value);
    }

    updateDisplay();
}

// Cek Operator
function isOperator(value) {
    return ['+', '-', '*', '/'].includes(value);
}

// Handle Number
function handlenumber(value) {
    currentInput += value;
}

// Handle Operator
function handleOperator(operator) {

    if (currentInput === "" && expression === "") return;

    // kalau terakhir operator → replace
    if (isOperator(expression.slice(-1))) {
        expression = expression.slice(0, -1);
    }

    expression += currentInput;

    currentInput = "";

    if (operator === "÷") operator = "/";
    
    expression += operator;
}

// Calculate
function calculate() {

    if (currentInput === "" && expression === "") return;

    try {
        expression += currentInput;
        result = eval(expression);

        // simpan history
        const historyItem = `${expression} = ${formatNumber(result)}`;
        historyList.unshift(historyItem); // terbaru di atas

        updateHistory();

        currentInput = result.toString();
        expression = '';

    } catch {
        currentInput = "Error";
        expression = '';
    }
}

// Clear All
function clearAll() {
    currentInput = '';
    expression = '';
    result = 0;
}

// Update Display
function updateDisplay() {
    expressionEl.textContent = expression;
    resultEl.textContent = formatNumber(currentInput);
}

// Format Number with Comma
function formatNumber(num) {
    if (num === "")
        return "0";

    return Number(num).toLocaleString("en-US");
}

// Update History
function updateHistory() {
    historyEl.innerHTML = "";

    historyList.slice(0, 5).forEach(item => { // max 5 history
        const div = document.createElement("div");
        div.classList.add("history-item");
        div.textContent = item;

        historyEl.appendChild(div);
    });
}

// Load Theme from localStorage
window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        themeToggle.textContent = "🌙";
    }
});