(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name tbcCmsFrontApp.controller:AboutCtrl
    * @description
    * # AboutCtrl
    * Controller of the tbcCmsFrontApp
   */
  angular.module('myApp').controller('PublicCtrl', function($scope, $rootScope, CONSTANTS) {
    //temp value
    $scope.timeline = [{"id":243,"inciupdate_set":[98,99],"dispatch_set":[149],"name":"Fire in NTU Chemistry Lab","status":"approved","severity":2,"time":"2015-11-11T12:54:00Z","location":"Nanyang Technological University Singapore","longitude":"103.681697035968","latitude":"1.3435905146060658","contact_name":"Unknown","contact":"+6584393467","type":"fire","description":"The fire is very fierce!","todoType":"incident","timelineType":"incident","date":"11 Nov. 2015","displayTime":"20:54","displayType":"Fire"},{"id":244,"inciupdate_set":[100],"dispatch_set":[150],"name":"zhou","status":"approved","severity":5,"time":"2015-11-11T13:45:00Z","location":"Dhoby Ghaut Singapore","longitude":"103.84603889999994","latitude":"1.298745","contact_name":"Unknown","contact":"da","type":"accident","description":"dd","todoType":"incident","timelineType":"incident","date":"11 Nov. 2015","displayTime":"21:45","displayType":"Accident"},{"id":247,"inciupdate_set":[],"dispatch_set":[],"name":"1234","status":"approved","severity":1,"time":"2016-10-26T05:15:00Z","location":"Nanyang Technological University Singapore","longitude":"103.68313469999998","latitude":"1.3483099","contact_name":"Unknown","contact":"11111111","type":"accident","description":"","todoType":"incident","timelineType":"incident","date":"26 Oct. 2016","displayTime":"13:15","displayType":"Accident"}];
    $scope.approvedIncidents = $scope.timeline.length;
    $scope.token01 = CONSTANTS;

    $rootScope.$watchCollection('pushes', function() {
      if ($rootScope.initialized) {
        $scope.timeline = $scope.compileTimeline();
        console.log("compileTimeline");
      }
    });
    $scope.$on('$viewContentLoaded', function() {
      //initMap($scope, resetMarkers);
      $rootScope.isPublic = true;
    });

    /* timeline
    $scope.compileTimeline = function() {
      var dispatch, incident, timeline, update, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      timeline = [];
      $scope.approvedIncidents = 0;
      if ($rootScope.pushes.incidents) {
        _ref = $rootScope.pushes.incidents;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          incident = _ref[_i];
          incident.timelineType = "incident";
          incident.date = moment(incident.time).format("DD MMM. YYYY");
          incident.displayTime = moment(incident.time).format("HH:mm");
          incident.displayType = $rootScope.incidentTypeDict[incident.type];
          if (incident.status === "approved") {
            timeline.push(incident);
            $scope.approvedIncidents += 1;
          }
        }
      }
      if ($rootScope.pushes.inciupdates) {
        _ref1 = $rootScope.pushes.inciupdates;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          update = _ref1[_j];
          update.timelineType = "update";
          update.date = moment(update.time).format("DD MMM. YYYY");
          update.displayTime = moment(update.time).format("HH:mm");
          if (update.is_approved) {
            timeline.push(update);
          }
        }
      }
      if ($rootScope.pushes.dispatches) {
        _ref2 = $rootScope.pushes.dispatches;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          dispatch = _ref2[_k];
          dispatch.timelineType = "dispatch";
          dispatch.date = moment(dispatch.time).format("DD MMM. YYYY");
          dispatch.displayTime = moment(dispatch.time).format("HH:mm");
          if (dispatch.is_approved) {
            timeline.push(dispatch);
          }
        }
      }
      return timeline;
    };
    */

    initTimeline($scope);
    if (!$scope.NEAAPIInitialized) {
      initNEAAPI($scope);
      $scope.NEAAPIInitialized = true;
    }
  });

}).call(this);

//# sourceMappingURL=public.js.map
