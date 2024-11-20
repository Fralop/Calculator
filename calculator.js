// Math Operation Functions

function suma ((a, b) => a + b);
function resta ((a, b) => a - b);
function multi ((a, b) => a * b);
function divi ((a, b) => a / b);
function perce ((a) => a / 100);
function sign ((a) => a * (-1));

//Operation function

function operate (a, op, b) {
    let result = 0;
    switch op {
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