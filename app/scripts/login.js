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
    angular.module('myApp').controller('loginCtrl', function($scope, $rootScope, $location,$window, User) {
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
    });

}).call(this);

//# sourceMappingURL=login.js.map
