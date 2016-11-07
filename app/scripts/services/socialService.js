/**
 * Created by shannon_z on 7/11/16.
 */
(function() {
    'use strict';
    angular.module('myApp').service('social', function($http, CONSTANTS) {
        facebook = function (callback){
            return $http.post()
                .success((function(data, status, headers, config){
                    //CONSTANTS.TOKEN = 1;
                    //CONSTANTS.USERS_DOMAIN = data[loginData.username].type ;
                    callback(data);
                }))
                .error((function(data, status, headers, config) {
                    console.log("Login failed");
                    callback(data);
                }));
        };

        twitter = function (callback){

        };

        return {
            facebook: facebook,
            twitter: twitter
        };
    });
}).call(this);
