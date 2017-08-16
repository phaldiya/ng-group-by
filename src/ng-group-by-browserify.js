'use strict';

angular.module('ng-group-by', [])
  .filter('groupBy', [
      function() { return require('./filter'); }
    ]
  );
