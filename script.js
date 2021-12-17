const numberButtons = document.querySelectorAll('.numberBtn');
const operators = document.querySelectorAll('.operator');
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const operator2 = document.getElementsByClassName('operator2');
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
    line2.textContent = '';
    firstOperand = '';
    secondOperand = '';
    operator = '';
    result = '';
    temporaryResult = '';
}

clearBtn.addEventListener('click', clearFunction);

numberButtons.forEach((button) => 
    button.addEventListener('click', function() {
        if (result && !firstOperand) {
            clearFunction();
        }
        if (firstOperand && operator) {
            line2.textContent = '';
        }
        line2.textContent += button.textContent;
    })
);

operators.forEach((button) => 
    button.addEventListener('click', function() {
            if (result && !secondOperand) {
                operator = button.textContent;
                line1.textContent = `${operator} ${result}`;
                firstOperand = result;
                // secondOperand = line2.textContent;
                // temporaryResult = operate(firstOperand, operator, secondOperand);
                // line1.textContent = `${operator} ${temporaryResult}`;

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

//test 2*2 = puis appuyer sur = = = = = devrais toujours multiplier par deux, ce n'est pas le cas actuellement.

equal.addEventListener('click', function() {
    // if (result && !firstOperand) {
    //     console.log('BG ajd');
    //     secondOperand = result;
    //     result = operate(firstOperand, operator, secondOperand);
    //     line1.textContent = `${operator} ${result}`;
    //     line2.textContent = `${result}`;
    // } else {
        secondOperand = line2.textContent;
        result = operate(firstOperand, operator, secondOperand);
        line2.textContent = result;
        line1.textContent = '';
        // firstOperand = '';
        secondOperand = '';
        // operator = '';
        temporaryResult = '';   
    // }
    
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