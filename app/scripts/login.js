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
    angular.module('myApp').controller('loginCtrl', function($scope, $rootScope, $location, User) {
        $scope.loginData = {};
        $scope.doLogin = function() {
            if (!($scope.loginData.username && $scope.loginData.password)) {
                $scope.errorMsg = "Form Incomplete";
                return;
            }
            return User.login($scope.loginData, function(data) {
                var token;
                /*Pass a validation var here*/
                if (1) {
                    //token = data.token_type + ' ' + data.access_token;
                    $scope.errorMsg = "";
                    $scope.successMsg = "Login Success";
                    User.getProfile(token, function(data) {
                        $rootScope.userData = data;
                        console.log(data.type);
                        //$rootScope.userData.token = token;
                        if (1) {
                            switch ($rootScope.userData.type) {
                                case "kdm":
                                    console.log($location);
                                    return $location.path("/kdm");
                                case "operator":
                                    return $location.path("/operator");
                                default:
                                    return $location.path("/public");
                            }
                        } else {
                            console.log('this is wrong');
                            return $location.path("/login");
                        }
                    });
                    return;
                } else {
                    $scope.errorMsg = "Invalid Credentials";
                }
            });
        };
    });

}).call(this);

//# sourceMappingURL=login.js.map
