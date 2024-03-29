const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.buttons button');

let firstValue = null;
let currentOperator = null;
let waitingForSecondValue = false;

const handleKeyboardInput = (event) => {
    const key = event.key;
    const validKeys = /^[0-9/*.=\-+%]|Backspace|Enter|Escape$/;
    if (!validKeys.test(key)) return;

    event.preventDefault();

    const keyMappings = {
        '0': '0',
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '/': '/',
        '*': '*',
        '-': '-',
        '+': '+',
        '.': '.',
        '%': '%',
        'Backspace': 'del',
        'Enter': '=',
        'Escape': 'clear' // Shortcut key for clearing display
    };

    const value = keyMappings[key];

    // Trigger click event for corresponding button
    const button = document.querySelector(`button[data-value="${value}"]`);
    if (button) {
        button.classList.add('active'); // Highlight button when pressed via keyboard
        button.click();
        setTimeout(() => {
            button.classList.remove('active'); // Remove highlight after a short delay
        }, 100);
    }
};

// Event listener for keyboard input
document.addEventListener('keydown', handleKeyboardInput);

// Event listener for removing highlight when key is released
document.addEventListener('keyup', () => {
    buttons.forEach(button => {
        button.classList.remove('active');
    });
});

// Event listeners for calculator buttons
// Event listeners for calculator buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;

        if (!isNaN(value) || value === '.') {
            appendNumber(value);
        } else if (['+', '-', '*', '/', '%'].includes(value)) {
            handleOperator(value);
        } else if (value === 'clear') {
            clearCalculator();
        } else if (value === 'del') {
            deleteLastNumber();
        } else if (value === '=') {
            calculate();
        }

        // Toggle the 'clicked' class to add hover effect when button is clicked
        button.classList.toggle('clicked');
        // Remove the 'clicked' class after a short delay
        setTimeout(() => {
            button.classList.toggle('clicked');
        }, 100);
    });
});


// Function to append number to display
const appendNumber = (number) => {
    if (waitingForSecondValue) {
        display.value = number;
        waitingForSecondValue = false;
    } else {
        display.value += number;
    }
};

// Function to handle operator input
const handleOperator = (operator) => {
    const inputValue = parseFloat(display.value);

    if (currentOperator === null) {
        firstValue = inputValue;
    } else if (waitingForSecondValue) {
        calculate();
    }

    currentOperator = operator;
    display.value = operator;
    waitingForSecondValue = true;
};

// Function to perform calculation
const calculate = () => {
    const secondValue = parseFloat(display.value);
    let result;

    switch (currentOperator) {
        case '+':
            result = firstValue + secondValue;
            break;
        case '-':
            result = firstValue - secondValue;
            break;
        case '*':
            result = firstValue * secondValue;
            break;
        case '/':
            if (secondValue === 0) {
                display.value = 'Error: Division by zero';
                return;
            }
            result = firstValue / secondValue;
            break;
        case '%':
            result = firstValue % secondValue;
            break;
    }

    display.value = result;
    firstValue = null;
    currentOperator = null;
    waitingForSecondValue = false;
};

// Function to clear calculator
const clearCalculator = () => {
    display.value = '';
    firstValue = null;
    currentOperator = null;
    waitingForSecondValue = false;
};

// Function to delete last character from display
const deleteLastNumber = () => {
    display.value = display.value.slice(0, -1);
};
