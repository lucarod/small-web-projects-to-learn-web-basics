const binary = document.querySelector("input#binary")
const decimal = document.querySelector("input#decimal")

binary.addEventListener('keydown', (event) => {
  if(
    event.keyCode != 48 && 
    event.keyCode != 49 && 
    event.keyCode != 96 &&
    event.keyCode != 97 &&
    event.keyCode != 37 &&
    event.keyCode != 39 &&
    event.keyCode != 46 &&
    event.keyCode != 8
    ) {
      event.preventDefault();
    }
})

const Form = {
  submitBinary(event) {
    event.preventDefault()

    const binaryValue = binary.value

    const conversionResult = binaryToDecimal(binaryValue)

    DOM.writeBinaryResult(conversionResult)
  },

  submitDecimal(event) {
    event.preventDefault()

    const decimalValue = decimal.value

    const conversionResult = decimalToBinary(decimalValue)

    DOM.writeDecimalResult(conversionResult)
  }
}

const DOM = {

  writeBinaryResult(decimal) {
    document.querySelector("#binary-result").innerHTML = decimal
  },
  writeDecimalResult(binary) {
    document.querySelector("#decimal-result").innerHTML = binary
  }
}

function binaryToDecimal(binary) {
  const binaryArray = Array.from(binary).reverse();
  let decimal = 0;

  binaryArray.forEach((bit, index) => {
    if (bit == 1) {
      decimal += 2 ** index;
    }
  });

  return decimal
}

function decimalToBinary(decimal) {
  const binaryArray = []
  console.log(decimal)

  while (decimal >= 1) {
    binaryArray.push(decimal % 2)
    decimal = Math.floor(decimal / 2)
  }

  binaryArray.reverse()
  const binary = Number(binaryArray.join(""))
  
  return binary
}