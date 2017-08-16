'use strict';
module.exports = /*@ngInject*/
  function(value, field) {
   if (!field || !value) { return []; }

    const filtered = [];

    try {
      let getValue = function(obj, field) {
        let array = field.split(".");
        let value;
        if (array && array.length > 1) {
          let deepObject = Object.assign({}, obj);
          array.forEach(item => deepObject = deepObject[item]);
          value = deepObject;
        } else {
          value = obj[field];
        }

        return value;
      };
      const groupedObj = value.reduce((prev, cur)=> {
        if (!prev[getValue(cur, field)]) {
          prev[getValue(cur, field)] = [cur];
        } else {
          prev[getValue(cur, field)].push(cur);
        }
        return prev;
      }, {});

      return Object.keys(groupedObj).map(key => ({ key: key, data: groupedObj[key] }));

    } catch (err) {
      console.error(err);
      throw err;
    }

    return filtered;
  };
