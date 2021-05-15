const csvOutput = document.querySelector('#csvOutput');

function tryConvert(inputText) {
    content = inputText.trim();
    if(!checkJSON(content)) {
        alert("Erro");
    } else{
        convertJSON(content);
    }
}

function checkJSON(content) {
    try {
        JSON.parse(content);
        return true;
    } catch (error) {
        return false;
    }
}

function convertJSON(content) {
    const parsedJSON = JSON.parse(content);

    const jsonArray = Array.isArray(parsedJSON) ?  parsedJSON : [parsedJSON];

    const header = jsonArray[0];
    
    const keysArray = Object.keys(header);

    let csvValue = "";

    keysArray.forEach((key) => {
        if (keysArray.indexOf(key) === keysArray.length - 1) {
            csvValue += `${key}`
        } else csvValue += `${key}, `
    });

    csvValue += "\n"

    jsonArray.forEach((object) => {
        const valuesArray = Object.values(object);

        valuesArray.forEach((value) => {
            if(valuesArray.indexOf(value) <= keysArray.length - 1){
                if (valuesArray.indexOf(value) === keysArray.length - 1) {
                    csvValue += `${value}`
                } else csvValue += `${value}, `
            }
        })

        csvValue += "\n"
    })

    csvOutput.innerHTML = csvValue;
}