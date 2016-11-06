/**
 * Created by shannon_z on 1/11/16.
 */
(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name tbcCmsFrontApp.controller:AboutCtrl
     * @description
     * # AboutCtrl
     * Controller of the tbcCmsFrontApp
     */
    angular.module('myApp').controller('kdmCtrl', function ($scope, $rootScope, $uibModal, $mdDialog) {
        $scope.currentPage = 0;
        $scope.pageSize = 20;
        $scope.goPage = function (n) {
            return $scope.currentPage = n;
        };
        $scope.todoList = [{
            "id": 243,
            "inciupdate_set": [98, 99],
            "dispatch_set": [149],
            "name": "Fire in NTU Chemistry Lab",
            "status": "approved",
            "severity": 2,
            "time": "2015-11-11T12:54:00Z",
            "location": "Nanyang Technological University Singapore",
            "longitude": "103.681697035968",
            "latitude": "1.3435905146060658",
            "contact_name": "Unknown",
            "contact": "+6584393467",
            "type": "fire",
            "description": "The fire is very fierce!",
            "todoType": "incident"
        },
            {
                "id": 244,
                "inciupdate_set": [100],
                "dispatch_set": [150],
                "name": "zhou",
                "status": "approved",
                "severity": 5,
                "time": "2015-11-11T13:45:00Z",
                "location": "Dhoby Ghaut Singapore",
                "longitude": "103.84603889999994",
                "latitude": "1.298745",
                "contact_name": "Unknown",
                "contact": "da",
                "type": "accident",
                "description": "dd",
                "todoType": "incident"
            },
            {
                "id":247,
                "inciupdate_set":[],
                "dispatch_set":[],
                "name":"1234",
                "status":"approved",
                "severity":1,
                "time":"2016-10-26T05:15:00Z",
                "location":"Nanyang Technological University Singapore",
                "longitude":"103.68313469999998",
                "latitude":"1.3483099",
                "contact_name":"Unknown",
                "contact":"11111111",
                "type":"accident",
                "description":"",
                "todoType": "dispatch"
            }];

        $scope.data = {
            cb1: true
        };
        $scope.message = 'false';
        $scope.onChange = function(cbState) {
            $scope.message = cbState;
        };

        $scope.status = '  ';
        $scope.showConfirm = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            console.log('hi');
            var confirm = $mdDialog.confirm()
                .title('Confirmation of crisis mode')
                .textContent('Do you want to confirm to raise in crisis mode? A message will be sent to relevant parties.')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Yes, in danger!')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function() {
                $scope.status = 'On';
            }, function() {
                $scope.status = 'Off';
            });
        };


        $scope.timeline = [{"id":243,"inciupdate_set":[98,99],"dispatch_set":[149],"name":"Fire in NTU Chemistry Lab","status":"approved","severity":2,"time":"2015-11-11T12:54:00Z","location":"Nanyang Technological University Singapore","longitude":"103.681697035968","latitude":"1.3435905146060658","contact_name":"Unknown","contact":"+6584393467","type":"fire","description":"The fire is very fierce!","todoType":"incident","timelineType":"incident","date":"11 Nov. 2015","displayTime":"20:54","displayType":"Fire"},{"id":244,"inciupdate_set":[100],"dispatch_set":[150],"name":"zhou","status":"approved","severity":5,"time":"2015-11-11T13:45:00Z","location":"Dhoby Ghaut Singapore","longitude":"103.84603889999994","latitude":"1.298745","contact_name":"Unknown","contact":"da","type":"accident","description":"dd","todoType":"incident","timelineType":"incident","date":"11 Nov. 2015","displayTime":"21:45","displayType":"Accident"},{"id":247,"inciupdate_set":[],"dispatch_set":[],"name":"1234","status":"approved","severity":1,"time":"2016-10-26T05:15:00Z","location":"Nanyang Technological University Singapore","longitude":"103.68313469999998","latitude":"1.3483099","contact_name":"Unknown","contact":"11111111","type":"accident","description":"","todoType":"incident","timelineType":"incident","date":"26 Oct. 2016","displayTime":"13:15","displayType":"Accident"}];
        $scope.approvedIncidents = $scope.timeline.length;
        initTimeline($scope);
        if (!$scope.NEAAPIInitialized) {
            initNEAAPI($scope);
            $scope.NEAAPIInitialized = true;
        };

/*
        $scope.init = function(){
            var token;
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
        }


        /*
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
        */

        $scope.open= function(type, inci_id, id, todo) {
            var modalInstance;

            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'view2/incidentModal.html',
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
    });
}).call(this);
