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

  window.helpers = api;

}());