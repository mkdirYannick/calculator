const numberButtons = document.querySelectorAll('.numberBtn');
const operators = document.querySelectorAll('.operator');
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const decimal = document.getElementById('decimal');
const inverseSign = document.getElementById('inverse');
const equal = document.getElementById('equal');
const display = document.getElementById('display');
const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const percentageBtn = document.getElementById('percentage');
let firstOperand = '';
let secondOperand = '';
let operator = '';
let temporaryResult = '';
let result = '';

function clearFunction() {
    line1.textContent = '';
    line2.textContent = '0';
    firstOperand = '';
    secondOperand = '';
    operator = '';
    result = '';
    temporaryResult = '';
}

clearBtn.addEventListener('click', clearFunction);

deleteBtn.addEventListener('click', function() {
    if (line2.textContent && line2.textContent !== '0') {
        let strArray = Array.from(line2.textContent);
        strArray.pop();
        line2.textContent = strArray.join('');
        firstOperand = '';
        result = '';
    }
})

numberButtons.forEach((button) => 
    button.addEventListener('click', function() {
        if (line2.textContent == '0') {
            line2.textContent = '';
        } else if (result && !firstOperand) {
            clearFunction();
            line2.textContent = '';
        } else if (firstOperand && operator) {
            line2.textContent = '';
        }
        line2.textContent += button.textContent;
    })
);

operators.forEach((button) => 
    button.addEventListener('click', function() {
            if (result && firstOperand && result == firstOperand) {
                secondOperand = line2.textContent;
                temporaryResult = operate(firstOperand, operator, secondOperand);
                line2.textContent = temporaryResult;
                operator = button.textContent;
                line1.textContent = `${operator} ${temporaryResult}`;
                firstOperand = temporaryResult;
            } else if (result && !secondOperand) {
                operator = button.textContent;
                line1.textContent = `${operator} ${result}`;
                firstOperand = result;

            } else if (temporaryResult) {
                secondOperand = line2.textContent;
                temporaryResult = operate(firstOperand, operator, secondOperand);
                line2.textContent = temporaryResult;
                operator = button.textContent;
                line1.textContent = `${operator} ${temporaryResult}`;
                firstOperand = temporaryResult; 

            } else if (firstOperand && operator && !secondOperand) {
                secondOperand = line2.textContent;
                temporaryResult = operate(firstOperand, operator, secondOperand);
                line2.textContent = temporaryResult;
                operator = button.textContent;
                line1.textContent = `${operator} ${temporaryResult}`;
                firstOperand = temporaryResult;

            } else if (!secondOperand) {
                operator = button.textContent;
                firstOperand = line2.textContent;
                line1.textContent = `${operator} ${firstOperand}`;
            }
    })
);

equal.addEventListener('click', function() {
        if (!operator) {
            return;
        } else {
            secondOperand = line2.textContent;
            result = operate(firstOperand, operator, secondOperand);
            line2.textContent = result;
            line1.textContent = '';
            secondOperand = '';
            temporaryResult = '';
            firstOperand = '';
        }   
});

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(x, operator, y) {
    x = Number(x);
    y = Number(y);
    switch (operator) {
      case '+':
        return add(x, y);
    case '-':
        return subtract(x, y);
    case '*':
        return multiply(x, y);
    case '/':
        return divide(x, y);
    default:
        return 'oops';   
    }
}