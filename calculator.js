// Math Operation Functions

const suma = (a, b) => a + b;
const resta = (a, b) => a - b;
const multi = (a, b) => a * b;
function divi (a, b) {
    if (b !== 0) {
        return (a / b);
    } else return "Error";    
}
const perce = a => a / 100;
const sign = a => a * (-1);

//Operation function
let op = 0;
let a = 0;
let b = 0;
let finalResult = 0;
let opCounter = 0;
let tempOp = 0;
function operate (a, op, b) {
    let result = 0;
    switch (op) {
        case "+":
            result = suma (a, b);
        break;
        case "-":
            result = resta (a, b);
        break;
        case "*":
            result = multi (a, b);
        break;
        case "/":
            result = divi (a, b);
        break;
        case "%":
            result = perce (a);
        break;
        case "+/-":
            result = sign (a);
        break;
    }
    return result;
}

const container = document.querySelector('.container');
const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display')
buttons.forEach((button) => {
    button.addEventListener('click', clickEffect);
})

let clicks = [];
function clickEffect (e) {
    switch (e.target.classList[0]) { 
        case "num":
            if (finalResult !== 0 && opCounter >= 2) {
                a = finalResult;
                op = tempOp;
            }
            clicks.push(e.target.textContent);
            display.textContent = Number(clicks.join(''));
            console.log(e.target.classList[0]);
            console.log(clicks);
            console.log(a);
            console.log(b);
            console.log(op);
        break;
        case "ope":
            opCounter++
            if (opCounter < 2) {
                if (finalResult === 0) {
                a = Number(clicks.join(''));
                } else a = finalResult;
                op = e.target.textContent
                clicks = [];
                console.log(e.target.classList[0]);
                console.log(clicks);
                console.log(a);
                console.log(b);
                console.log(op);
                console.log(finalResult);

            } else {
                b = Number(clicks.join(''));
                finalResult = operate (a, op, b);
                tempOp = e.target.textContent;
                clicks = [];
                display.textContent = finalResult;
                console.log(e.target.classList[0]);
                console.log(clicks);
                console.log(a);
                console.log(b);
                console.log(op);
                console.log(finalResult);

            }
        break;
        case "igual":
            b = Number(clicks.join(''));
            finalResult = operate (a, op, b);
            clicks = [];
            display.textContent = finalResult;
            opCounter = 0;
            console.log(e.target.classList[0]);
            console.log(clicks);
            console.log(a);
            console.log(b);
            console.log(op);
            console.log(finalResult);
        break;
        case "AC":
            op = 0;
            a = 0;
            b = 0;
            finalResult = 0;
            opCounter = 0;
            clicks = [];
            display.textContent = finalResult;
        break;
    }
}