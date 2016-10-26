'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/public-danger', {
    templateUrl: 'view2/public-danger.html',
    controller: 'pDangerCtrl'
  });
}])

.controller('View2Ctrl', [function() {
      $scope.pageClass = 'page-public-danger';
}]);