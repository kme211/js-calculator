(function () {
  'use strict';

  var calculator = require('./calculator.js'),
    view = require('./view.js'),

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
      calculator.delete();
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