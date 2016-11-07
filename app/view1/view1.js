'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when('/create', {
          templateUrl: 'view1/crisis-create.html',
          controller: 'CreateCtrl'
      })
      .when('/operator', {
          templateUrl:'view1/operator.html',
          controller: 'PublicCtrl'
      })

      .when('/kdm',{
          templateUrl:'view1/decision.html',
          controller:'PublicCtrl'
      });
}])

.controller('CreateCtrl', [function() {
      $scope.pageClass = 'page-crisis-create';
}])

.controller('operatorCtrl', [function(){
        $scope.pageClass = 'page-operator';
    }])
;