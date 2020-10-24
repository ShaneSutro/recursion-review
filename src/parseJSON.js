// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:

// input: JSON string
// output: object literal

// hl: iterate through the incoming string- pass each to a helper function- identify each character, and pass each char to related helper func

// --for object edge case: if char is { set returnArray to {}
// --for array edge case: if char is [ set returnArray to []

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
//     object {
//     array
//     true ---
//     false ---
//     null ---

// if  Number(value).charCode() >= 85 || Number(value).charCode() <=288

// var returnArray;

var index = -1;

var parseJSON = function(json, nthCall) {
  if (!arguments[1]) {
    index = -1;
  }
  var getNextChar = function(json, withinString) {
    index++;

    if (index > json.length) {
      throw new SyntaxError;
    }
    if (json[index] === ' ' && !withinString) {
      return getNextChar(json);
    }

    return json[index];
  };

  // helper functions for types -----------------------------

  var parseString = function(char) {
    if (char === '"' && json[index - 1] !== '\\') {
      return '';
    }

    return char + parseString(getNextChar(json, true));
  };

  var parseNumber = function(char) {
    if (char === ',' || char === '}' || char === ']') {
      index--;
      return '';
    }

    return char + parseNumber(getNextChar(json));
  };

  var parseBoolean = function(char) {
    var endIndex;
    if (char === 't') {
      endIndex = index + 4;
    } else {
      endIndex = index + 5;
    }

    let boolean = json.slice(index, endIndex);
    if (boolean === 'true') {
      index += 3;
      return true;
    } else if (boolean === 'false') {
      index += 4;
      return false;
    }
  };

  var parseNull = function() {
    if (json.slice(index, index + 4) === 'null') {
      index += 3;
      return null;
    }
  };

  var parseArray = function (char) {

    if (char === ']') {
      return [];
    } else if (char === '[' && json[index + 1] === ']') { //empty array
      index++;
      return [];
    }

    // var element = parseJSON(json, true);
    var element = parseJSON(json, true);
    returnArray = parseArray(getNextChar(json));

    returnArray.unshift(element);

    // if (json[index + 1] === ',') {
    //   index++;
    //   parseArray(getNextChar(json));
    // }

    return returnArray;
  };

  var parseObject = function(char) {
    if (char === '}') {
      return {};
    } else if (char === '{' && json[index + 1] === '}') { //empty object
      index++;
      return {};
    }

    var key = parseJSON(json, true);
    var colon = getNextChar(json);
    var value = parseJSON(json, true);

    var returnObject = parseObject(getNextChar(json));
    returnObject[key] = value;

    // if (json[index + 1] === ',') {
    //   index++; //increments once to skip the comma
    //   parseObject(getNextChar(json)); // increments again to start on the character after the comma
    // }

    return returnObject;

  };

  // check for types ----------------------------------------
  var nextChar = getNextChar(json);

  if (nextChar === '"') {
    return parseString(getNextChar(json));
  } else if (nextChar.charCodeAt() >= 48 && nextChar.charCodeAt() <= 57) {
    return Number(parseNumber(nextChar));
  } else if (nextChar === '-') {
    return Number(parseNumber(nextChar));
  } else if ((nextChar === 't' && json.slice(index, index + 4) === 'true') || (nextChar === 'f' && json.slice(index, index + 5) === 'false')) {
    return parseBoolean(nextChar);
  } else if (nextChar === 'n' && json.slice(index, index + 4) === 'null') {
    index += 3;
    return null;
  } else if (nextChar === '[') {
    return parseArray(nextChar);
  } else if (nextChar === '{') {
    return parseObject(nextChar);
  } else if (nextChar === ':' || nextChar === ',') {
    return nextChar;
  } else if (nextChar === '\\') {
    return parseJSON(nextChar, true);
  } else {
    return parseJSON(nextChar, true);
  }

};