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
    angular.module('myApp').controller('kdmCtrl', function ($scope, $rootScope) {
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
    });
}).call(this);
