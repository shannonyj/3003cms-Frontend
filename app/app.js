
var myApp = angular.module('myApp', [
  'ngRoute',
  'ngAnimate',
  'myApp.view1',
  'myApp.view2',
  'angular.filter',
  //'myApp.version',
  'ngMessages',
]);

myApp.config(function($routeProvider) {

  $routeProvider

    // login page
      .when('/login', {
        templateUrl: 'view1/login.html',
        controller: 'loginController'
      })


    // public page
      .when('/public', {
        templateUrl: 'view1/public.html',
        controller: 'PublicCtrl'
      })

  ;

});

myApp.controller('loginController', function($scope) {
  $scope.pageClass = 'page-login';
});

myApp.controller('publicController', function($scope) {
  $scope.pageClass = 'page-public';
});


/*
myApp.controller('MainCtrl', function($scope, $rootScope, $location, $routeParams, $uibModal, djangoWebsocket, Incident, Agency, User, localStorageService) {
  djangoWebsocket.connect($rootScope, 'pushes', 'pushes', ['subscribe-broadcast']);
  $rootScope.doLogout = function() {
    User.logout($rootScope.userData.token, function() {
      localStorageService.remove("token");
      $rootScope.userData = {};
      $location.path("/login");
      console.log("logout success");
    });
  };
  $scope.isActive = function(viewLocation) {
    return (viewLocation === $location.path()) || (viewLocation.length > 1 && $location.path().indexOf(viewLocation) >= 0);
  };
  $rootScope.isActive = $scope.isActive;
  $rootScope.init = function() {
    var token;
    $rootScope.initialized = false;
    if ($rootScope.userData === void 0) {
      $rootScope.userData = {};
    }
    token = localStorageService.get("token");
    if (token) {
      User.getProfile(token, function(data) {
        $rootScope.userData = data;
        $rootScope.userData.token = token;
        return console.log($rootScope.userData.token);
      });
    }
    Incident.getIncidents($rootScope.userData.token, function(data) {
      $rootScope.pushes.incidents = data;
      initMap($rootScope, resetMarkers);
    });
    Incident.allIncidentUpdates($rootScope.userData.token, function(data) {
      $rootScope.pushes.inciupdates = data;
    });
    Incident.allIncidentDispatches($rootScope.userData.token, function(data) {
      $rootScope.pushes.dispatches = data;
    });
    Agency.getAgencies($rootScope.userData.token, function(data) {
      $rootScope.agencies = data;
    });
    Incident.getIncidentTypes($rootScope.userData.token, function(data) {
      var i;
      $rootScope.incidentTypeDict = {};
      i = 0;
      while (i < data.length) {
        $rootScope.incidentTypeDict[data[i].value] = data[i].title;
        i++;
      }
    });
    $rootScope.initialized = true;
  };
  $scope.compileTodoList = function() {
    var dispatch, incident, todo, update, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
    todo = [];
    console.log("todo init");
    if ($rootScope.pushes.incidents) {
      _ref = $rootScope.pushes.incidents;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        incident = _ref[_i];
        incident.todoType = "incident";
        if (incident.status !== "closed") {
          todo.push(incident);
        }
      }
    }
    if ($rootScope.pushes.inciupdates) {
      _ref1 = $rootScope.pushes.inciupdates;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        update = _ref1[_j];
        update.todoType = "update";
        if (!update.is_approved) {
          todo.push(update);
        }
      }
    }
    if ($rootScope.pushes.dispatches) {
      _ref2 = $rootScope.pushes.dispatches;
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        dispatch = _ref2[_k];
        dispatch.todoType = "dispatch";
        if (!dispatch.is_approved) {
          todo.push(dispatch);
        }
      }
      console.log("todo");
    }
    return todo;
  };
  $scope.currentPage = 0;
  $scope.pageSize = 20;
  $scope.goPage = function(n) {
    return $scope.currentPage = n;
  };
  $scope.$on('$viewContentLoaded', function() {
    initMap($rootScope, resetMarkers);
    $rootScope.isPublic = false;
  });
  initNEAAPI($scope);
  $rootScope.systemLogs = [];
  $rootScope.$watchCollection('pushes', function() {
    if ($rootScope.initialized) {
      $scope.todoList = $scope.compileTodoList();
      resetMarkers($rootScope);
      console.log("change");
    }
    if ($rootScope.pushes.syslog && $rootScope.systemLogs.length < 1 || $rootScope.pushes.syslog && $rootScope.systemLogs.length >= 1 && $rootScope.pushes.syslog.id !== $rootScope.systemLogs[$rootScope.systemLogs.length - 1].id) {
      $rootScope.systemLogs.push($rootScope.pushes.syslog);
      $rootScope.systemLogs[$rootScope.systemLogs.length - 1].formattedTime = moment($rootScope.systemLogs[$rootScope.systemLogs.length - 1].time, "YYYY-MM-DDThh:mm:ssZ").format("DD/MM/YYYY HH:mm:ss");
      return;
    }
  });
  $rootScope.openMapModal = function(id) {
    var incident;
    incident = Incident.getIncident($rootScope.userData.token, id, function(incident) {
      var modalInstance;
      modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'views/mapIncidentModal.html',
        controller: 'mapIncidentModalCtrl',
        resolve: {
          incident: function() {
            return incident;
          }
        }
      });
      modalInstance.result.then((function(selectedItem) {
        $scope.selected = selectedItem;
      }), function() {
        console.log('Modal dismissed at: ' + new Date);
      });
    });
  };
  $scope.open = function(type, inci_id, id, todo) {
    var modalInstance;
    modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'views/incidentModal.html',
      controller: 'incidentModalCtrl',
      resolve: {
        todo: function() {
          return todo;
        },
        inci_id: function() {
          return inci_id;
        },
        type: function() {
          return type;
        },
        id: function() {
          return id;
        }
      }
    });
    modalInstance.result.then((function(selectedItem) {
      $scope.selected = selectedItem;
    }), function() {
      console.log('Modal dismissed at: ' + new Date);
    });
  };
  $scope.toggleAnimation = function() {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };
});
*/