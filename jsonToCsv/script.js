const csvOutput = document.querySelector("#csvOutput");
const jsonOutput = document.querySelector("#jsonOutput");

function tryJsonConvert(inputText) {
  const jsonContentString = inputText.trim();
  if (!checkJSON(jsonContentString)) {
    alert("Error");
    return;
  }
  const convertedCsv = convertJsonToCsv(jsonContentString);
  csvOutput.innerHTML = convertedCsv;
}

function tryCsvConvert(inputText) {
  inputText = inputText.trim();
  if (!checkCSV(inputText)) {
    alert("Error");
    return;
  }
  const convertedJson = convertCsvToJson(inputText);
  jsonOutput.innerHTML = convertedJson;
}

function checkJSON(jsonContentString) {
  try {
    JSON.parse(jsonContentString);
    return true;
  } catch (error) {
    return false;
  }
}

function checkCSV(csvContentString) {
  let emptyItem = false;
  let csvElements = []
   
  if (csvContentString == "") return false;

  csvContentString = csvContentString
    .split('\n')
    .map((row) => row.split(','));

  csvContentString.forEach((arr) => {
    csvElements = csvElements.concat(arr);
  })

  csvElements.forEach((element) => {
    const item = String(element).trim();
    
    if(item.length == 0){
      emptyItem = true;
    }
  });

  if(emptyItem == true) return false;

  return true;
}

// Thanks, Marcos, for the help with this one!

function convertJsonToCsv(jsonContentString) {
  const parsedJSON = JSON.parse(jsonContentString);

  const jsonArray = Array.isArray(parsedJSON) ? parsedJSON : [parsedJSON];

  const [firstObject] = jsonArray;

  const csvHeaders = Object.keys(firstObject);

  const csvRows = jsonArray.map((object) =>
    Object.entries(object)
      .filter(([key, value]) => csvHeaders.includes(key))
      .map(([key, value]) => value)
      .join(", ")
  );

  const csvContent = [csvHeaders.join(", "), ...csvRows].join("\n");

  return csvContent;
}

function convertCsvToJson(csvContentString) {
  const rows = csvContentString.split('\n');
  const keys = rows[0].split(',').map(key => key.trim())
  const valueArrays = rows
    .slice(1)
    .map(row => row
      .split(',')
      .filter((element, index) => index < keys.length) // Can be treated as an error
      .map(value => value.trim()));

  const objectsArray = valueArrays.map(value => {
    const obj = {}
    keys.forEach((key, i) => {
        obj[key] = value[i];
    });
    return obj;
});

return JSON.stringify(objectsArray, "", 2);
}

// ----------------- Funções de cópia de texto ------------------- // 

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}