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

  window.view = api;

}());