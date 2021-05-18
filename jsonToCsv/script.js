// Thanks, Marcos, for the help with this one!

const csvOutput = document.querySelector("#csvOutput");

function tryConvert(inputText) {
  const jsonContentString = inputText.trim();
  if (!checkJSON(jsonContentString)) {
    alert("Error");
    return;
  }
  const convertedCsv = convertJsonToCsv(jsonContentString);
  csvOutput.innerHTML = convertedCsv;
}

function checkJSON(jsonContentString) {
  try {
    JSON.parse(jsonContentString);
    return true;
  } catch (error) {
    return false;
  }
}

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
