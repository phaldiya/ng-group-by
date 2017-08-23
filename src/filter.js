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
