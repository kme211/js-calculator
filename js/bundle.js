/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	(function () {
	  'use strict';

	  var calculator = __webpack_require__(1),
	    view = __webpack_require__(3),

	    init = function init() {
	      view.init(this);
	    },

	    addNum = function addNum(e) {
	      var num = typeof e === "string" ? e : this.innerHTML;
	      calculator.addNum(num);
	      view.render(calculator.display());
	    },

	    addOperator = function addOperator(e) {
	      var operator = typeof e === "string" ? e : this.innerHTML;
	      calculator.addOperator(operator);
	      view.render(calculator.display());
	    },

	    addDot = function octopusAddDot() {
	      calculator.addDot();
	      view.render(calculator.display());
	    },

	    computeTotal = function computeTotal() {
	      calculator.computeTotal();
	      view.render(calculator.display());
	    },

	    clear = function clear() {
	      calculator.clear();
	      view.render(calculator.display());
	    },

	    deleteLastChar = function deleteLastChar() {
	      calculator.deleteLastChar();
	      view.render(calculator.display());
	    },

	    // TODO: Add keyhandler functionality for backspace
	    keyHandler = function keyHandler(e) {
	      var keyPressed = String.fromCharCode(e.keyCode),
	        enterKeyCode = 13,
	        dotKeyCode = 46;
	      if (calculator.isValidNumber(keyPressed)) {
	        this.addNum(keyPressed);
	      } else if (calculator.isValidOperator(keyPressed)) {
	        this.addOperator(keyPressed);
	      } else if (e.keyCode === enterKeyCode) {
	        this.computeTotal();
	      } else if (e.keyCode === dotKeyCode) {
	        this.addDot();
	      }
	    },

	    app = {
	      init: init,
	      addNum: addNum,
	      addOperator: addOperator,
	      addDot: addDot,
	      computeTotal: computeTotal,
	      clear: clear,
	      deleteLastChar: deleteLastChar,
	      keyHandler: keyHandler
	    };

	  app.init();

	}());

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	(function () {
	  'use strict';

	  var helpers = __webpack_require__(2),
	    api,
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
	    var num1 = containsDot(arr[0]) ? parseFloat(arr[0]) : parseInt(arr[0]),
	      operator = arr[1],
	      num2 = containsDot(arr[2]) ? parseFloat(arr[2]) : parseInt(arr[2]);
	    return mathFunctions[operator](num1, num2);
	  }

	  function addOperator(op) {
	    var lastItem = helpers.getLastItemInArray(c);
	    if (!lastItem) {
	      return;
	    }
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
	  }

	  api = {
	    isValidOperator: isValidOperator,
	    isValidNumber: isValidNumber,
	    display: display,
	    addOperator: addOperator,
	    addDot: addDot,
	    addNum: addNum,
	    deleteLastChar: deleteLastChar,
	    computeTotal: computeTotal,
	    clear: clear
	  };

	  module.exports = api;

	}());

/***/ },
/* 2 */
/***/ function(module, exports) {

	(function () {
	  'use strict';

	  var api = {
	    getLastItemInArray: function getLastItemInArray(arr) {
	      return arr.length > 0 ? arr[arr.length - 1] : null;
	    },
	    hasChars: function hasChars(chars, str) {
	      var myChars = chars;
	      return function (str) {
	        if (typeof chars === "string" && myChars.length === 1) {
	          return str.indexOf(myChars) !== -1;
	        } else {
	          for (var i = 0; i < myChars.length; i++) {
	            if (myChars[i] === str) {
	              return true;
	            }
	          }
	          return false;
	        }
	      }

	    }
	  }

	  module.exports = api;

	}());

/***/ },
/* 3 */
/***/ function(module, exports) {

	(function () {
	  'use strict';

	  var api = {
	    init: function init(app) {
	      var numberElements = document.getElementsByClassName('num');
	      numberElements = [].slice.call(numberElements);
	      numberElements.forEach(function addNumHandler(elem) {
	        elem.addEventListener("click", app.addNum);
	      });

	      var operatorElements = document.getElementsByClassName('operator');
	      operatorElements = [].slice.call(operatorElements);
	      operatorElements.forEach(function addOpHandler(elem) {
	        elem.addEventListener("click", app.addOperator);
	      });

	      document.getElementById("equal").addEventListener("click", app.computeTotal);

	      document.getElementById("dot").addEventListener("click", app.addDot);

	      document.getElementById("clear").addEventListener("click", app.clear);

	      document.getElementById("delete").addEventListener("click", app.deleteLastChar);

	      window.addEventListener("keypress", app.keyHandler.bind(app));

	      this.display = document.getElementById("display");

	    },
	    render: function render(display) {
	      this.display.innerHTML = display;
	    }
	  };

	  module.exports = api;

	}());

/***/ }
/******/ ]);