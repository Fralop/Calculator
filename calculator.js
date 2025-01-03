// Math Operation Functions including protection to change-of-mind operations
const suma = (a, b) => {
    if (clicks.length !== 0) {
        return a + b;
    } else if (finalResult !== 0) {
        return finalResult;
    } else return a;
} 
const resta = (a, b) => {
    if (clicks.length !== 0) {
        return a - b;
    } else if (finalResult !== 0) {
        return finalResult;
    } else return a;
} 
const multi = (a, b) => {
    if (clicks.length !== 0) {
        return a * b;
    } else if (finalResult !== 0) {
        return finalResult;
    } else return a;
}
function divi (a, b) {
    if (clicks.length !== 0) {
        if (b !== 0) {
            return (a / b);
        } else return "Error";
    } else if (finalResult !== 0) {
        return finalResult;
    } else return a;   
}
const perce = a => a / 100;
const sign = a => a * (-1);

//Global variables definition
let op = 0;
let a = 0;
let b = 0;
let finalResult = 0;
let opCounter = 0;
let tempOp = 0;
let percentage = 0;
let igualCounter = 0;
let periodCounter = 0;
let clicks = [];

// Operation function
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
    if (result === "Error") {
        return "Error! x/0"
    } 
    if (result > 99999999999 || result < -9999999999) {
        return "Too long!"
    }
    limitedResult = Math.round(result * 1000) / 1000;
    return limitedResult;
}

// DOM manipulation.
const container = document.querySelector('.container');
const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');
const btnPunto = document.querySelector('.punto');
buttons.forEach((button) => {
    button.addEventListener('click', clickEffect);
    button.addEventListener('mousedown', colorButton);
    button.addEventListener('mouseup', (e) => e.target.id = "");
})

//Coloring functions with buttons
function colorButton (e) {
    switch (e.target.textContent) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":  
      case "7":
      case "8":
      case "9":
      case "0":
      case ".":
            e.target.id = "pressedNum";
      break;
      case "/":
      case "*":
      case "-":
      case "+":
      case "=":
            e.target.id = "pressedOpe";
      break;
      case "AC":
      case "Back":
            e.target.id = "pressedAC";
      break;
      case "%":
      case "±":
              e.target.id = "pressedPerce";
      break;
    }
}

// Function logic with buttons
function clickEffect (e) {
    switch (e.target.classList[0]) { 
        case "num":
            igualCounter = 0;
            if (finalResult !== 0 && opCounter >= 2) {
                a = finalResult;
                op = tempOp;
            }
            if (clicks.length <= 10) {
                clicks.push(e.target.textContent);
            }
            display.textContent = Number(clicks.join(''));
        break;
        case "ope":
            periodCounter = 0;
            btnPunto.addEventListener('click', clickEffect);    
            opCounter++
            igualCounter = 0;
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
            igualCounter++
            if (igualCounter < 2) {
                if (percentage === 0) {
                    b = Number(clicks.join(''));
                } else b = percentage
                finalResult = operate (a, op, b);
                clicks = [];
                percentage = 0;
                display.textContent = finalResult;
                opCounter = 0;
            }
        break;
        case "AC":
            igualCounter = 0;
            op = 0;
            a = 0;
            b = 0;
            finalResult = 0;
            opCounter = 0;
            clicks = [];
            percentage = 0;
            display.textContent = finalResult;
            periodCounter = 0;
            btnPunto.addEventListener('click', clickEffect);
        break;
        case "sign":
            if (percentage === 0) {
                if (clicks.length !==0) {
                    if (clicks[0]=== "-") {
                        clicks.shift()
                        display.textContent = Number(clicks.join(''));
                    } else {
                        clicks.unshift("-");
                        display.textContent = Number(clicks.join(''));
                    }
                } else {
                    finalResult = finalResult * (-1);
                    display.textContent = finalResult;
                }
            } else {
                percentage = percentage * (-1)
                display.textContent = percentage;
            }

        break
        case "perce":
            if (finalResult !== 0 && opCounter === 0) {
                percentage = Math.round(finalResult * 10) / 1000;
            } else {
                percentage = Number(clicks.join('')) / 100;
            }
            finalResult = percentage;
            display.textContent = percentage;
        break
        case "punto":
            periodCounter++
            if (clicks.length === 0) {
                clicks.push('0');
            }
            if (clicks.length <= 10) {
                clicks.push(e.target.textContent);
            }
            display.textContent = clicks.join('');
            btnPunto.removeEventListener('click', clickEffect);
        break
        case "back":
            if (clicks.length > 1) {
                clicks.pop();
                display.textContent = clicks.join('');
            } else {  
                finalResult = 0;
                display.textContent = finalResult;
                clicks = [];
            }
        break
    }
}

//Keyboard support
const body = document.querySelector("body");
body.addEventListener('keydown', key);
body.addEventListener('keydown', colorKey);
body.addEventListener('keyup', uncolorKey);

//Color with Keyboard support
function colorKey (e) {
    console.log(e.key);
    let eKey = e.key;
    if (e.key == "Backspace") {
        eKey = "Back";
    }
    if (e.key == "Escape") {
        eKey = "AC";
    }
    if (e.key == "Enter") {
        eKey = "=";
    }
    console.log(eKey);
    const targetButton = Array.from(buttons).find(button => button.textContent === eKey);
    console.log(targetButton);
    switch (targetButton.textContent) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":  
      case "7":
      case "8":
      case "9":
      case "0":
      case ".":
            targetButton.id = "pressedNum";
      break;
      case "/":
      case "*":
      case "-":
      case "+":
      case "=":  
            targetButton.id = "pressedOpe";
      break;
      case "AC":
      case "Back":
            targetButton.id = "pressedAC";
      break;
      case "%":
      case "±":
              targetButton.id = "pressedPerce";
      break;
    }
}

// Uncolor keyboard support
function uncolorKey (e) {
    let eKey = e.key;
    if (e.key == "Backspace") {
        eKey = "Back";
    }
    if (e.key == "Escape") {
        eKey = "AC";
    }
    if (e.key == "Enter") {
        eKey = "=";
    }
    const targetButton = Array.from(buttons).find(button => button.textContent === eKey);
    targetButton.id = "";
}

//logic for Keyboard support
function key (e) {
    switch (e.key) { 
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":    
            igualCounter = 0;
            if (finalResult !== 0 && opCounter >= 2) {
                a = finalResult;
                op = tempOp;
            }
            if (clicks.length <= 10) {
                clicks.push(e.key);
            }
            display.textContent = Number(clicks.join(''));
        break;
        case "+":
        case "-":
        case "*":
        case "/":
            periodCounter = 0;
            btnPunto.addEventListener('click', clickEffect);    
            opCounter++
            igualCounter = 0;
            if (opCounter < 2) {
                if (percentage === 0) {
                    if (finalResult === 0) {
                        a = Number(clicks.join(''));
                    } else a = finalResult;
                } else a = percentage;
                op = e.key
                clicks = [];
                percentage = 0;
            } else {
                if (percentage === 0) {
                    b = Number(clicks.join(''));
                } else b = percentage
                finalResult = operate (a, op, b);
                tempOp = e.key;
                clicks = [];
                percentage = 0;
                display.textContent = finalResult;
            }
        break;
        case "=":
        case "Enter":
            igualCounter++
            if (igualCounter < 2) {
                if (percentage === 0) {
                    b = Number(clicks.join(''));
                } else b = percentage
                finalResult = operate (a, op, b);
                clicks = [];
                percentage = 0;
                display.textContent = finalResult;
                opCounter = 0;
            }
        break;
        case "Escape":
            igualCounter = 0;
            op = 0;
            a = 0;
            b = 0;
            finalResult = 0;
            opCounter = 0;
            clicks = [];
            percentage = 0;
            display.textContent = finalResult;
            periodCounter = 0;
            btnPunto.addEventListener('click', clickEffect);
        break;
        case "±":
            if (percentage === 0) {
                if (clicks.length !==0) {
                    if (clicks[0]=== "-") {
                        clicks.shift()
                        display.textContent = Number(clicks.join(''));
                    } else {
                        clicks.unshift("-");
                        display.textContent = Number(clicks.join(''));
                    }
                } else {
                    finalResult = finalResult * (-1);
                    display.textContent = finalResult;
                }
            } else {
                percentage = percentage * (-1)
                display.textContent = percentage;
            }

        break
        case "%":
            if (finalResult !== 0 && opCounter === 0) {
                percentage = Math.round(finalResult * 10) / 1000;
            } else {
                percentage = Number(clicks.join('')) / 100;
            }
            finalResult = percentage;
            display.textContent = percentage;
        break
        case ".":
            periodCounter++
            if (periodCounter < 2) {
                if (clicks.length === 0) {
                    clicks.push('0');
                }
                if (clicks.length <= 10) {
                    clicks.push(e.key);
                }
                display.textContent = clicks.join('');
                btnPunto.removeEventListener('click', clickEffect);
            }
        break
        case "Backspace":
            if (clicks.length > 1) {
                clicks.pop();
                display.textContent = clicks.join('');
            } else {  
                finalResult = 0;
                display.textContent = finalResult;
                clicks = [];
            }
        break
    }
    
}