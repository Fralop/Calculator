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