const numberButtons = document.querySelectorAll('.numberBtn');
const operators = document.querySelectorAll('.operator');
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
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
let shouldReset = true;

function clearFunction() {
    line1.textContent = '';
    line2.textContent = '0';
    firstOperand = '';
    secondOperand = '';
    operator = '';
    result = '';
    temporaryResult = '';
    shouldReset = true;
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

inverseSign.addEventListener('click', function () {
    if (line2.textContent != '0' && line2.textContent) {
        let num = Number(line2.textContent);
        num = -num;
        line2.textContent = num;
    }
})

percentageBtn.addEventListener('click', function() {
    if (line2.textContent && line2.textContent !== '0') {
        let num = Number(line2.textContent);
        num = (num/100);
            if (num.toString().length >= 10) {
                num = num.toFixed(6);
            }
        line2.textContent = num.toString();
    }
})

numberButtons.forEach((button) => 
    button.addEventListener('click', function() {
        if (button.textContent == '.' && line2.textContent.includes('.')) {
            return;
        } else if (line2.textContent == '0' && button.textContent != '.') {
            line2.textContent = '';
        } else if (result && !firstOperand) {
            clearFunction();
            line2.textContent = '';
        } else if (firstOperand && operator && (shouldReset || temporaryResult)) {
            line2.textContent = '';
            shouldReset = false;
        } if (line2.textContent.length >= 16) {
            return;
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
            shouldReset = true;
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
    let operateResult = 0;
    if (operator == '+') {
        operateResult = add(x, y);
    } else if (operator == '-') {
        operateResult = subtract(x, y);
    } else if (operator == '*') {
        operateResult = multiply(x, y);
    } else if (operator == '÷') {
        if (secondOperand == '0') {
            return "LOL";
        } else {
          operateResult = divide(x, y);  
        }
    } else {
        return 'Oops';
    } if (operateResult >= 10**12) {
       operateResult = operateResult.toExponential(); 
    } else if (operateResult.toString().length >= 10) {
        operateResult = operateResult.toFixed(6);
    }
    return operateResult;
}