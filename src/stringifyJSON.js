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
    result = [];

    for (let i = 0; i < obj.length; i++) {
      if (!valueIsValid(obj[i])) {
        result.push('null');
      } else {
        result.push(stringifyJSON(obj[i]));
      }
    }

    return '[' + result + ']';

  } else {
    result = [];
    for (var key in obj) {
      if (!valueIsValid(obj[key])) {
        continue;
      } else {
        result.push(stringifyJSON(key) + ':' + stringifyJSON(obj[key]));
      }
    }
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
  } else if (typeof value === 'undefined') {
    return undefined;
  } else if (!value) {
    return 'null';
  }
};

var valueIsValid = function(value) {
  // var isValid = false;

  var isAFunction = typeof value === 'function';
  var isASymbol = typeof value === 'symbol';
  var isUnd = typeof value === 'undefined';

  return !isAFunction && !isASymbol && !isUnd;
};