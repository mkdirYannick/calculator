const numberButtons = document.querySelectorAll('.numberBtn');
const operators = document.querySelectorAll('.operator');
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const operator2 = document.getElementsByClassName('operator2');
const equal = document.getElementById('equal');
const display = document.getElementById('display');
const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');


clear.addEventListener('click', function() {
    line1.innerHTML = '';
    line2.innerHTML = '';
});

// deleteBtn.addEventListener('click', function() {
//     let str = line2.innerHTML;
//     let strArray = Array.from(str);
//     // console.log(strArray);
//     strArray.splice((str.length - 1), 1);
// })

numberButtons.forEach((e) => 
    e.addEventListener('click', function() {
        // line1.innerText += e.innerHTML;
        line2.innerText += e.innerText;
    })
);

operators.forEach((e) => 
    e.addEventListener('click', function() {
        // line1.innerText += e.innerHTML;
        line2.innerText += e.innerText;
    })
);

// operators.forEach((e) => 
//     e.addEventListener('click', test2)
// );



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

function operate(operator, x, y) {
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

// console.log(operate('*', 2, 3));