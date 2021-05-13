/* Bugs para corrigir: 

    Segunda soma resulta em cálculo automático

    Cálculos após o primeiro apresentam resultados estranhos

    C e AC não funcionam corretamente
*/

let firstNumber = null;
let secondNumber = null;
let selectedOperation = null;
let lastResult = null;
let operationExecuted = false;
let operationSelected = false;

const Display = {
    writeDigit(digit) {
        if(operationExecuted == true) {
            clearAll();
        }

        if(operationSelected == true) {
            Display.clear();
            operationSelected = false;
        }

        const display = document.querySelector('.number-display');
        if (display.value.length < 8) {
            display.value += digit;
        }
    },

    writeResult(result) {
        const display = document.querySelector('.number-display');
        display.value = result;
    },

    clear() {
        const display = document.querySelector('.number-display');
        display.value = "";
    },

    getNumber() {
        const display = document.querySelector('.number-display');
        return display.value;
    }
}

const Log = {
    followResult(number, operation){
        const display = document.querySelector('.log-display');
        display.value = `${number} ${operation}`;
    },

    finalResult(firstNumber, secondNumber) {
        const display = document.querySelector('.log-display');
        display.value = `${firstNumber} + ${secondNumber} =`;
    },

    clear() {
        const display = document.querySelector('.log-display');
        display.value = "";
    }
}

const Operations = {
    sum(a, b) {
        return a + b;
    },
    subtraction(a, b) {
        return a - b;
    },
    multiplication(a, b) {
        return a * b;
    },
    division(a, b) {
        return a / b;
    }
}

function selectOperation (operation) {
    if (operationSelected != true) {
        if(firstNumber == null) {
            firstNumber = Number(Display.getNumber());
            selectedOperation = operation;
            Log.followResult(firstNumber, selectedOperation);
        } else {
            executeOperation('selectOperation')
            selectedOperation = operation;
            Log.followResult(lastResult, selectedOperation);
        }
        operationSelected = true;
        operationExecuted = false;
    }
}

function equalsTo() {
    if (firstNumber != null) {
        executeOperation('equalsTo')
    }
}

function executeOperation(caller) {
    let result, a, b;

    if(lastResult == null) {
        secondNumber = Number(Display.getNumber());
        a = firstNumber;
        b = secondNumber;
    } else {
        a = lastResult;
        b = secondNumber;
    }

    result = getResult(a, b);

    if (caller == 'equalsTo') {
        Log.finalResult(a, b);
    }

    Display.writeResult(result);

    lastResult = result;

    console.log(lastResult);

    operationExecuted = true;
}

function getResult(a ,b) {
    let result = "ERR"

    switch (selectedOperation) {
        case '+':
            result = Operations.sum(a, b);
            break;    
        case '-':
            result = Operations.subtraction(a, b);
            break;    
        case '*':
            result = Operations.multiplication(a, b);
            break;    
        case '/':
            result = Operations.division(a, b);
            break;    
        default:
            break;
    }

    return result;   
}

function clearAll() {
    firstNumber = null;
    secondNumber = null;
    selectedOperation = null;
    lastResult = null;
    operationExecuted = false;

    Display.clear();
    Log.clear();
}