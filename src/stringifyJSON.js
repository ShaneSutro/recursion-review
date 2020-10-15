// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

// input: obj
// output: obj stringed

// rules:
// 1. boolean, number, string to be stringed
// 2. undefined, function , symbol are ommited when found in object
// 3. undefined, function are turned to null
// 4. symbols are always ignored


var stringifyJSON = function(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return stringTheValue(obj);
  }

  let result;

  if (Array.isArray(obj)) {
    // do something
    result = [];
    return '['+ result + ']';

  } else { // may need to add check for object
    // do something
    result = [];

    return '{' + result + '}';
  }

};

var stringTheValue = function(value) {
  if (typeof value === 'string') {
    return '"' + value + '"';
  } else if (typeof value === 'boolean') {
    return value.toString();
  } else if (typeof value === 'number') {
    return value + '';
  } else if (typeof value === 'function') {
    return undefined;
  } else if (typeof valiue === 'undefined') {
    return undefined;
  } else if (typeof value === null) {
    return 'null';
  }
}

var valueIsValid = function(value) {
  // var isValid = false;

  var isAFunction = typeof value === 'function';
  var isASymbol = typeof value === 'symbol';
  var isAnObject = typeof value === 'object';

  return !isAFunction && !isASymbol && !isAnObject
}