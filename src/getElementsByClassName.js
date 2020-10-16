// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:

// must use document.body
// element.childNodes
// element.classList

var getElementsByClassName = function(className, node) {
  // your code here
  var result = [];
  var node = node || document.body;

  if (node.classList) {
    if (node.classList.value.indexOf(className) !== -1) {
      result.push(node);
    }
  }

  if (node.childNodes) {
    for (let i = 0; i < node.childNodes.length; i++) {
      result = result.concat(getElementsByClassName(className, node.childNodes[i]));
    }
  }

  return result;
};
