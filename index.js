const fs = require('fs');
const add = require('./add')
const sub = require('./sub')
const div = require('./div')
const mult = require('./mult')

let arr = process.argv
const operators = ['add', 'sub', 'mult', 'div'];

const validate = (values) => {
  values = values.slice(2);

  const errors = [];

  if (values.length < 3) {
    errors.push('Missing some values');
  }
 
  if (operators.indexOf(values[1]) === -1) {
    errors.push('Unexpected operator');
  }
  if (Number.isNaN(Number(values[0])) || Number.isNaN(Number(values[2]))) {
    errors.push('Number expected');
  }

  return errors;
}

const mathResult = function(numArray, operatorsArray, sumFunc, subFunc, divFunc, multFunc){
  for(let i = 0; i < arr.length; i++){
    if (numArray[3] === operatorsArray[0]){
      return sumFunc(numArray[2], numArray[4]);
    }else if (numArray[3] === operatorsArray[1]){
      return subFunc(numArray[2], numArray[4]);
    }else if (numArray[3] === operatorsArray[2]){
      return multFunc(numArray[2], numArray[4]);
    }else if (numArray[3] === operatorsArray[3]){
      return divFunc(numArray[2], numArray[4]);
    }
  }

  return null;
}

const errors = validate(arr);

if (errors.length) {
  const errorsText = errors.join('\n');

  fs.writeFile("error.txt", errorsText, (error, data) => {
    if (error) {
      console.log(error);
    }
    
    console.log(errorsText);
  })

  return;
}

const result = mathResult(arr, operators, add.add, sub.sub, div.div, mult.mult);

fs.writeFile("result.txt", String(result), (error,data) => {
  if (error) {
    console.log(error);
  }

  console.log(String(result));
})



