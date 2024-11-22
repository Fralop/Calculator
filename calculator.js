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
let percentage = 0;
function operate (a, op, b) {
    let result = 0;
    let limitedResult = 0;
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
    limitedResult = Math.round(result * 100) / 100;
    return limitedResult;
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
        break;
        case "ope":
            opCounter++
            if (opCounter < 2) {
                if (percentage === 0) {
                    if (finalResult === 0) {
                        a = Number(clicks.join(''));
                    } else a = finalResult;
                } else a = percentage;
                op = e.target.textContent
                clicks = [];
                percentage = 0;
            } else {
                if (percentage === 0) {
                    b = Number(clicks.join(''));
                } else b = percentage
                finalResult = operate (a, op, b);
                tempOp = e.target.textContent;
                clicks = [];
                percentage = 0;
                display.textContent = finalResult;
            }
        break;
        case "igual":
            if (percentage === 0) {
                b = Number(clicks.join(''));
            } else b = percentage
            finalResult = operate (a, op, b);
            clicks = [];
            percentage = 0;
            display.textContent = finalResult;
            opCounter = 0;
        break;
        case "AC":
            op = 0;
            a = 0;
            b = 0;
            finalResult = 0;
            opCounter = 0;
            clicks = [];
            percentage = 0;
            display.textContent = finalResult;
        break;
        case "sign":
            if (clicks[0]=== "-") {
                clicks.shift()
                display.textContent = Number(clicks.join(''));
            } else {
                clicks.unshift("-");
                display.textContent = Number(clicks.join(''));
            }
        break
        case "perce":
            if (finalResult !== 0 && opCounter === 0) {
                percentage = Math.round(finalResult) / 100;
                finalResult = percentage;
            } else {
                percentage = Number(clicks.join('')) / 100;
            }
            display.textContent = percentage;
        break
    }
}

//multiple =s
//one operator, then changed my mine
//multiple percentage with first number
//signed mixed with percentaes.
//change the +- sign in a finalresult !!