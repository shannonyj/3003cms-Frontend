/**
 * Created by shannon_z on 2/11/16.
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
    angular.module('myApp').controller('loginCtrl', function($scope,$http, $rootScope, $location,$window, User, CONSTANTS) {
        $scope.loginData = {};
        $scope.token01 = CONSTANTS;
        $scope.doLogin = function() {
            if (!($scope.loginData.username && $scope.loginData.password)) {
                $scope.errorMsg = "Form Incomplete";
                return;
            }
            return User.login($scope.loginData, function(data) {
                var token;
                var userdb = angular.fromJson($http.get('test.json'));
                /*Pass a validation var here*/
                var validation = $scope.loginData.username in CONSTANTS.USERDB;
                console.log(validation);
                if (validation) {
                    //token = data.token_type + ' ' + data.access_token;
                    $scope.errorMsg = "";
                    $scope.successMsg = "Login Success";
                    User.getProfile(token, function(data) {
                        CONSTANTS.TOKEN = 1;
                        CONSTANTS.USERS_DOMAIN = data[$scope.loginData.username].type ;
                        $rootScope.userData = data;
                        console.log(data);
                        //$rootScope.userData.token = token;
                        if (1) {
                            switch (data[$scope.loginData.username].type) {
                                case "kdm":
                                    return $window.location.assign("/3003cms/app/#/kdm");
                                case "operator":
                                    return $window.location.assign("/3003cms/app/#/operator");
                                default:
                                    return $window.location.assign("/3003cms/app/#/public");
                            }
                        } else {
                            console.log('this is wrong');
                            return $window.location.assign("/login");
                        }
                    });
                    return;
                } else {
                    $scope.errorMsg = "Invalid Credentials";
                }
            });
        };

        $scope.doLogout = function(){
            return User.logout();
        };
    });

}).call(this);

//# sourceMappingURL=login.js.map
