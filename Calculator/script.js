/* Bugs para corrigir: 

*/

const numberDisplay = document.querySelector('.number-display');
const logDisplay = document.querySelector('.log-display');

let firstNumber = null;
let secondNumber = null;
let selectedOperation = null;
let lastResult = null;
let logNumber = null
let operationExecuted = false;
let operationSelected = false;
let numberSelected = false;

const Display = {
    writeDigit(digit) {
        if(operationExecuted == true) {
            clearAll();
        }

        if(operationSelected == true) {
            Display.clear();
            operationSelected = false;
        }

        if (numberDisplay.value.length < 8) {
            numberDisplay.value += digit;
        }

        numberSelected = true;
    },

    writeResult(result) {
        numberDisplay.value = result;
    },

    writeError() {
        numberDisplay.value = "ERR";
    },

    clear() {
        numberDisplay.value = "";
    },

    getNumber() {
        return numberDisplay.value;
    }
}

const Log = {
    followResult(number, operation){
        logDisplay.value = `${number} ${operation}`;
    },

    finalResult(firstNumber, secondNumber) {
        logDisplay.value = `${firstNumber} ${selectedOperation} ${secondNumber} =`;
    },

    singleResult(firstNumber) {
        logDisplay.value = `${firstNumber} =`;
    },

    clear() {
        logDisplay.value = "";
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
        if(b === 0){
            return "ERR"
        } else {
            return a / b;
        }
    }
}

function selectOperation (operation) {

    if (operationSelected != true) {
        if(firstNumber == null) {
            firstNumber = Number(Display.getNumber());
            logNumber = firstNumber;
        } else {
            if(operationExecuted != true && numberSelected == true) {
                executeOperation('selectOperation')
            }
            logNumber = lastResult;
            operationExecuted = false;
        }
    }

    selectedOperation = operation;
    Log.followResult(logNumber, selectedOperation);
    operationSelected = true;
    numberSelected = false;
}

function equalsTo() {
    if (firstNumber != null) {
        executeOperation('equalsTo')
    } else {
        logNumber = Number(Display.getNumber());
        Log.singleResult(logNumber);
    }
}

function executeOperation(caller) {
    let result, a, b;

    a = lastResult == null ? firstNumber : lastResult;

    if (operationExecuted == false){
        secondNumber = Number(Display.getNumber());
    }

    b = secondNumber;

    result = getResult(a, b);

    if (caller == 'equalsTo') {
        Log.finalResult(a, b);
    }

    if (checkSize(result)) {
        Display.writeResult(result);
    } else Display.writeError();

    lastResult = result;

    operationExecuted = true;
    numberSelected = false;
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

function checkSize(result) {
    return String(result).length <= 8
}

function inputClear() {
    if (operationExecuted == true) {
        clearAll();
    } else {
        Display.clear();
    }
}

function clearAll() {
    firstNumber = null;
    secondNumber = null;
    selectedOperation = null;
    lastResult = null;
    logNumber = null
    operationExecuted = false;

    Display.clear();
    Log.clear();
}