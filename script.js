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
let lastButtonOperator = false;

function clearFunction() {
    line1.textContent = '';
    line2.textContent = '0';
    firstOperand = '';
    secondOperand = '';
    operator = '';
    result = '';
    shouldReset = true;
    lastButtonOperator = false;
}

clearBtn.addEventListener('click', clearFunction);

deleteBtn.addEventListener('click', function() {
    if (line2.textContent && line2.textContent !== '0') {
        let strArray = Array.from(line2.textContent);
        strArray.pop();
        line2.textContent = strArray.join('');
    }
    lastButtonOperator = false;
})

inverseSign.addEventListener('click', function () {
    if (line2.textContent != '0' && line2.textContent) {
        let num = Number(line2.textContent);
        num = -num;
        line2.textContent = num;
    }
    lastButtonOperator = false;
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
    lastButtonOperator = false;
})

numberButtons.forEach((e) => e.addEventListener('click', function() {
        if (e.textContent == '.' && line2.textContent.includes('.')) {
            return;
        } else if (line2.textContent == '0' && e.textContent != '.') {
            line2.textContent = '';
        } else if (result && !firstOperand) {
            clearFunction();
            line2.textContent = '';
            // Essayer avec should reset tout seul
        } else if (firstOperand && operator && shouldReset) {
            line2.textContent = '';
            shouldReset = false;
        } if (line2.textContent.length >= 16) {
            return;
        }
        line2.textContent += e.textContent;
        lastButtonOperator = false;
    })
);

operators.forEach((button) => button.addEventListener('click', function() {
        // Allows the user to change the operator.
        if (lastButtonOperator) {
            operator = button.textContent;
            line1.textContent = `${firstOperand} ${operator}`;
        
        // Handles the basic case.
        } else if (!firstOperand) {
        operator = button.textContent;
        firstOperand = line2.textContent;
        line1.textContent = `${firstOperand} ${operator}`;
        lastButtonOperator = true;

        // Allows to chain multiple operations in a row.
        } else if (firstOperand) {
            secondOperand = line2.textContent;
            firstOperand = operate(firstOperand, operator, secondOperand);
            line2.textContent = firstOperand;
            operator = button.textContent;
            line1.textContent = `${firstOperand} ${operator}`;
            shouldReset = true;
            lastButtonOperator = true;

        // Automatically uses the result as a first operand if the user press an operator
        // button after using the equal button. 
        } else if (result && !secondOperand) {
            operator = button.textContent;
            line1.textContent = `${result} ${operator}`;
            firstOperand = result;
            lastButtonOperator = true;
        } else {
            return;
        }
    })
);

equal.addEventListener('click', function() {
        if (!operator || !firstOperand) {
            return;
        } else {
            secondOperand = line2.textContent;
            result = operate(firstOperand, operator, secondOperand);
            if (result) {
                line2.textContent = result;
                line1.textContent = `${firstOperand} ${operator} ${secondOperand} =`;
                secondOperand = '';
                temporaryResult = '';
                firstOperand = '';
                shouldReset = true;
                lastButtonOperator = false;
        }    
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
    } else if (operator == 'x') {
        operateResult = multiply(x, y);
    } else if (operator == '÷') {
        if (secondOperand == '0' || secondOperand == '0.') {
            alert('LOL');
            clearFunction();
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


///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
// This part is for the keyboard input.

window.addEventListener("keydown", function (e) {
    if (e.defaultPrevented) {
        return;
    }
    switch (e.key) {
        case '0':
            document.getElementById("0").click();
            break;
        case '1':
            document.getElementById("1").click();
            break;
        case '2':
            document.getElementById("2").click();
            break;
        case '3':
            document.getElementById("3").click();
            break;
        case '4':
            document.getElementById("4").click();
            break;
        case '5':
            document.getElementById("5").click();
            break;
        case '6':
            document.getElementById("6").click();
            break;
        case '7':
            document.getElementById("7").click();
            break;
        case '8':
            document.getElementById("8").click();
            break;
        case '9':
            document.getElementById("9").click();
            break;
        case '.':
            document.getElementById(".").click();
            break;
        case ',':
            document.getElementById(".").click();
            break;
        case 'Delete':
            document.getElementById("clear").click();
            break;
        case 'Backspace':
            document.getElementById("delete").click();
            break;
        case '%':
            document.getElementById("percentage").click();
            break;
        case 'Enter':
            document.getElementById("equal").click();
            break;
        case '+':
            document.getElementById("+").click();
            break;
        case '-':
            document.getElementById("-").click();
            break;
        case '*':
            document.getElementById("*").click();
            break;
        case '/':
            document.getElementById("/").click();
            break;
        
    }
})