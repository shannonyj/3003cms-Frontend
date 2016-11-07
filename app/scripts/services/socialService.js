/**
 * Created by shannon_z on 7/11/16.
 */
(function() {
    'use strict';
    angular.module('myApp').service('social', function($http, CONSTANTS) {
        facebook = function (id, loc,callback){
            return $http.post(rootDjangoUrl + '/sendToFacebook/' + id, loc)
                .success((function(data, status, headers, config){
                    console.log('success to post');
                    //CONSTANTS.TOKEN = 1;
                    //CONSTANTS.USERS_DOMAIN = data[loginData.username].type ;
                    callback(data);
                }))
                .error((function(data, status, headers, config) {
                    console.log("fail to post");
                    callback(data);
                }));
        };

        twitter = function (id, loc, callback){
            return $http.post(rootDjangoUrl + '/sendToTwitter/' + id, loc)
                .success((function(data, status, headers, config){
                    console.log('success to post');
                    //CONSTANTS.TOKEN = 1;
                    //CONSTANTS.USERS_DOMAIN = data[loginData.username].type ;
                    callback(data);
                }))
                .error((function(data, status, headers, config) {
                    console.log("fail to post");
                    callback(data);
                }));
        };

        return {
            facebook: facebook,
            twitter: twitter
        };
    });
}).call(this);
