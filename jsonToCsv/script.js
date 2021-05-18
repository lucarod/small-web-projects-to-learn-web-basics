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
  if (!checkCSV(inputText)) {
    alert("Error");
    return;
  }
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
   
  if (csvContentString == "") return false;

  csvContentString = csvContentString
    .split('\n')
    .map((row) => row.split(','));

  let csvElements = []

  csvContentString.forEach((arr) => {
    csvElements = csvElements.concat(arr);
  })

  csvElements.forEach((element) => {
    const item = String(element).trim();
    
    if(item.length == 0){
      emptyItem = true;
    }
  });
  console.log(csvElements)

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

}