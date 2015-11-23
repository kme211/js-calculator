(function () {
  'use strict';

  var api,
    c = [],
    mathFunctions = {
      '+': function (a, b) {
        return (a + b).toString();
      },
      '-': function (a, b) {
        return (a - b).toString();
      },
      '*': function (a, b) {
        return (a * b).toString();
      },
      '/': function (a, b) {
        return (a / b).toString();
      }
    },
    validNumbers = "1234567890",

    validOperators = Object.keys(mathFunctions),

    containsDot = helpers.hasChars('.'),
    containsNumber = helpers.hasChars(validNumbers),
    containsOperator = helpers.hasChars(validOperators);

  function calculate(arr) {
    console.log(arr);
    var num1 = containsDot(arr[0]) ? parseFloat(arr[0]) : parseInt(arr[0]),
      operator = arr[1],
      num2 = containsDot(arr[2]) ? parseFloat(arr[2]) : parseInt(arr[2]);
    console.log("num1: " + num1);
    console.log("num2: " + num2);
    return mathFunctions[operator](num1, num2);
  }

  function addOperator(op) {
    var lastItem = helpers.getLastItemInArray(c);
    if (!lastItem) return;
    if (lastItem && containsOperator(lastItem)) {
      c.pop();
    }
    c.push(op);
    return c;
  }

  function computeTotal() {
    var len;
    if (containsOperator(helpers.getLastItemInArray(c))) {
      c.pop();
    }
    len = c.length;
    while (c.length > 1) {
      c = [calculate(c.slice(0, 3))].concat(c.slice(3, len));
    }
    return c[0];
  }

  function addDot() {
    var lastItem = helpers.getLastItemInArray(c);
    if (lastItem && containsDot(lastItem)) {
      return;
    }
    if (lastItem && !containsDot(lastItem) && !containsOperator(lastItem)) {
      c.pop();
      c.push(lastItem.concat("."));
    } else {
      c.push(".");
    }
  }

  function addNum(num) {
    var lastItem = helpers.getLastItemInArray(c);
    console.log("lastItem: " + lastItem)
    if (lastItem && !containsOperator(lastItem)) {
      c.pop();
      c.push(lastItem.concat(num));
    } else {
      c.push(num);
    }
    return c;
  }

  function clear() {
    c = [];
  }

  function deleteLastChar() {
    var lastItem = helpers.getLastItemInArray(c);
    if (lastItem) {
      c.pop();
      if (lastItem.length > 1) {
        c.push(lastItem.slice(0, lastItem.length - 1));
      }
    }
  }

  function display() {
    return c.length > 0 ? c.join(" ") : "0";
  }

  function isValidOperator(char) {
    return containsOperator(char);
  }

  function isValidNumber(char) {
    return containsNumber(char);
  };

  api = {
    isValidOperator: isValidOperator,
    isValidNumber: isValidNumber,
    display: display,
    addOperator: addOperator,
    addDot: addDot,
    addNum: addNum,
    delete: deleteLastChar,
    computeTotal: computeTotal,
    clear: clear
  };

  window.calculator = api;

}());