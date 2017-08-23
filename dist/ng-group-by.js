/**
 * ng-group-by
 * an angularJS group-by filter, that supports deep document grouping
 * @author Pradeep K Haldiya <pradeep.haldiya@gmail.com>
 * @version v0.0.2
 * @license MIT
 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = /*@ngInject*/
function (value, field) {
  if (!field || !value) {
    return [];
  }

  var filtered = [];

  try {
    var getValue = function getValue(obj, field) {
      var array = field.split(".");
      var value = void 0;
      if (array && array.length > 1) {
        var deepObject = Object.assign({}, obj);
        array.forEach(function (item) {
          return deepObject = deepObject[item];
        });
        value = deepObject;
      } else {
        value = obj[field];
      }

      return value;
    };
    var groupedObj = value.reduce(function (prev, cur) {
      if (!prev[getValue(cur, field)]) {
        prev[getValue(cur, field)] = [cur];
      } else {
        prev[getValue(cur, field)].push(cur);
      }
      return prev;
    }, {});

    return Object.keys(groupedObj).map(function (key) {
      return { key: key, data: groupedObj[key] };
    });
  } catch (err) {
    console.error(err);
    throw err;
  }

  return filtered;
};

},{}],2:[function(require,module,exports){
'use strict';

angular.module('ng-group-by', []).filter('groupBy', [function () {
  return require('./filter');
}]);

},{"./filter":1}]},{},[2]);
