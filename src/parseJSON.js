// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:

// input: JSON string
// output: object literal

// hl: iterate through the incoming string- pass each to a helper function- identify each character, and pass each char to related helper func

// --for object edge case: if char is { set result to {}
// --for array edge case: if char is [ set result to []

// characters that will trigger a specific type of parsing:
//  {}
//  []
//  ""
//  : //objects only
//  ,

//Grammar
// object
//     {}
//     { members }
// members
//     pair
//     pair , members
// pair
//     string : value
// array
//     []
//     [ elements ]
// elements
//     value
//     value , elements
// value
//     string ---
//     number ---
//     object
//     array
//     true
//     false
//     null

// if  Number(value).charCode() >= 85 || Number(value).charCode() <=288

var result;

var index = -1;

var parseJSON = function(json) {
  var getNextChar = function(json) {
    index++;

    if (json[index] === ' ') {
      index++;
      getNextChar();
    }

    return json[index];
  };

  //check for types
  var nextChar = getNextChar(json);

  if (nextChar === '"') {
    return parseString(getNextChar(json));
  } else if (nextChar.charCodeAt() >= 48 || nextChar.charCodeAt() <= 57) {
    return parseNumber(nextChar);
  }

  var parseString = function(char) {
    if (char === '"') {
      return '';
    }

    return char + parseString(getNextChar(json));
  };

  var parseNumber = function(char) {
    if (char === ',') {
      return '';
    }

    return Number(char + parseNumber(getNextChar(json)));
  };

};