/**
 * Created by shannon_z on 2/11/16.
 */
(function() {
    'use strict';
    angular.module('myApp').service('User', function($http, CONSTANTS) {
        var getProfile, login, logout;
        login = function(loginData, callback){
            return $http.get('test.json'
                /*Here should be the communication*/
            ).success((function(data, status, headers, config){
                    CONSTANTS.TOKEN = 1;
                    CONSTANTS.USERS_DOMAIN = data['type'] ;
                    callback(data);
                })).error((function(data, status, headers, config) {
                    console.log("Login failed");
                    callback(data);
                }));

        };

        logout = function(){
            return $http.get('test.json'
            ).success((function(data,status,headers,config){
                    console.log("Logout");
                    CONSTANTS.USERS_DOMAIN = [];
                    CONSTANTS.TOKEN = 0;
                    console.log(CONSTANTS.TOKEN);
                }));
        };

        /*
        var getProfile, login, logout;
        login = function(loginData, callback) {
            return $http({
                url: App.host_addr + "/o/token/",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Basic dGNMbmQ1NmhldjJWVDdPOHRiS1c1RjV0RFlxRWRqU0VmcHljVTBWbDo4UmxtMkI0R2Vkd3M2ZkJWN3VzMU0xZTI3RXhkRVB4T3o4M05IZllWS1pUaFluYUJUQXJ2Vk5PaFpoUW4xQzlRWERvSGViMXBQS2tsSTFRTEFNNUZjdnVrN1Y5NGtudUJmbGJseTRkbjhqdDZsajRvMzZFZVFHbWE4a2ZRYjNaUA=="
                },
                transformRequest: function(obj) {
                    var p, str;
                    str = [];
                    for (p in obj) {
                        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                    }
                    return str.join('&');
                },
                data: {
                    "grant_type": "password",
                    "username": loginData.username,
                    "password": loginData.password,
                    "scope": "read"
                }
            }).success((function(data, status, headers, config) {
                console.log(data);
                callback(data);
            })).error((function(data, status, headers, config) {
                console.log("Login failed");
                callback(data);
            }));
        };
        logout = function(token, callback) {
            return $http({
                url: App.host_addr + "/o/revoke_token/",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Basic dGNMbmQ1NmhldjJWVDdPOHRiS1c1RjV0RFlxRWRqU0VmcHljVTBWbDo4UmxtMkI0R2Vkd3M2ZkJWN3VzMU0xZTI3RXhkRVB4T3o4M05IZllWS1pUaFluYUJUQXJ2Vk5PaFpoUW4xQzlRWERvSGViMXBQS2tsSTFRTEFNNUZjdnVrN1Y5NGtudUJmbGJseTRkbjhqdDZsajRvMzZFZVFHbWE4a2ZRYjNaUA=="
                },
                transformRequest: function(obj) {
                    var p, str;
                    str = [];
                    for (p in obj) {
                        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                    }
                    return str.join('&');
                },
                data: {
                    "token": token
                }
            }).success((function(data, status, headers, config) {
                console.log(data);
                callback(data);
            })).error((function(data, status, headers, config) {
                console.log("Login failed");
                callback(data);
            }));
        };
        */
        getProfile = function(token, callback) {

            return $http.get('test.json')
                .success((function(data, status, headers, config) {
                console.log(data);
                console.log("getProfile success");
                callback(data);
            })).error((function(data, status, headers, config) {
                console.log("getProfile failed");
                callback(false);
            }));
        };

        return {
            login: login,
            logout: logout,
            getProfile: getProfile
        };
    });

}).call(this);

//# sourceMappingURL=userService.js.map
