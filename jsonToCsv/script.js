function tryConvert(inputText) {
    if(!checkJSON(inputText)) {
        alert("Erro");
    } else{
        convertJSON(inputText);
    }
}

function checkJSON(inputText) {
    try {
        JSON.parse(inputText);
        return true;
    } catch (error) {
        return false;
    }
}

function convertJSON(inputText) {
    const csvOutput = document.querySelector('#csvOutput');
    const parsedJSON = JSON.parse(inputText);
    const keysArray = Object.keys(parsedJSON);
    const valuesArray = Object.values(parsedJSON);

    let csvValue = "";

    keysArray.forEach((key) => {
        if (keysArray.indexOf(key) === keysArray.length - 1) {
            csvValue += `${key}`
        } else csvValue += `${key}, `
    });

    csvValue += "\n"

    valuesArray.forEach((value) => {
        if (valuesArray.indexOf(value) === valuesArray.length - 1) {
            csvValue += `${value}`
        } else csvValue += `${value}, `
    })

    csvOutput.innerHTML = csvValue;
}