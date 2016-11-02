/**
 * Created by shannon_z on 1/11/16.
 */
(function() {
    'use strict';
    angular.module('myApp').service('Incident', function($http) {
        var allIncidentDispatches, allIncidentUpdates, approveIncident, approveIncidentDispatch, approveIncidentUpdate, archiveIncident, getIncident, getIncidentDispatch, getIncidentDispatches, getIncidentFromKey, getIncidentTypes, getIncidentUpdate, getIncidentUpdates, getIncidents, postIncident, postIncidentUpdate, rejectIncident, rejectIncidentDispatch, rejectIncidentUpdate;
        getIncidents = function(token, callback) {
            $http({
                url: App.host_addr + "/incidents/",
                method: "GET",
                headers: {
                    "Authorization": token
                }
            }).success((function(data, status, headers, config) {
                console.log("getIncidents success");
                callback(data);
            })).error((function(data, status, headers, config) {
                console.log("Process failed");
                callback(false);
            }));
        };
        getIncident = function(token, id, callback) {
            $http({
                url: App.host_addr + "/incidents/" + id + "/",
                method: "GET",
                headers: {
                    "Authorization": token
                }
            }).success((function(data, status, headers, config) {
                console.log("getIncident success");
                callback(data);
            })).error((function(data, status, headers, config) {
                console.log("Process failed");
                callback(false);
            }));
        };
        getIncidentFromKey = function(token, key, callback) {
            $http({
                url: App.host_addr + "/update/" + key + "/keys/",
                method: "GET",
                headers: {
                    "Authorization": token
                }
            }).success((function(data, status, headers, config) {
                console.log("getIncidentFromKey success");
                console.log(data);
                callback(data);
            })).error((function(data, status, headers, config) {
                console.log("getIncidentFromKey failed");
                callback(false);
            }));
        };
        postIncident = function(token, report, callback) {
            $http({
                url: App.host_addr + "/incidents/",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                data: {
                    "type": report.type,
                    "name": report.name,
                    "severity": report.severity,
                    "time": report.time,
                    "location": report.location,
                    "longitude": report.longitude,
                    "latitude": report.latitude,
                    "contact": report.contact,
                    "description": report.description
                }
            }).success((function(data, status, headers, config) {
                console.log("postIncident success");
                callback(data);
            })).error((function(data, status, headers, config) {
                console.log(data);
                callback(false);
            }));
        };
        approveIncident = function(token, id, callback) {
            $http({
                url: App.host_addr + "/incidents/" + id + "/approve/",
                method: "GET",
                headers: {
                    "Authorization": token
                }
            }).success((function(data, status, headers, config) {
                console.log("approveIncident success");
                callback(data);
            })).error((function(data, status, headers, config) {
                console.log("approveIncident failed");
                callback(false);
            }));
        };
        rejectIncident = function(token, id, callback) {
            $http({
                url: App.host_addr + "/incidents/" + id + "/reject/",
                method: "GET",
                headers: {
                    "Authorization": token
                }
            }).success((function(data, status, headers, config) {
                console.log("rejectIncident success");
                callback(data);
            })).error((function(data, status, headers, config) {
                console.log("rejectIncident failed");
                callback(false);
            }));
        };
        archiveIncident = function(token, id, callback) {
            $http({
                url: App.host_addr + "/incidents/" + id + "/archive/",
                method: "GET",
                headers: {
                    "Authorization": token
                }
            }).success((function(data, status, headers, config) {
                console.log("archiveIncident success");
                callback(data);
            })).error((function(data, status, headers, config) {
                console.log("archiveIncident failed");
                callback(false);
            }));
        };
        allIncidentUpdates = function(token, callback) {
            $http({
                url: App.host_addr + "/incidents/allupdates/",
                method: "GET",
                headers: {
                    "Authorization": token
                }
            }).success((function(data, status, headers, config) {
                console.log("allupdates success");
                callback(data);
            })).error((function(data, status, headers, config) {
                console.log("allupdates failed");
                callback(false);
            }));
        };
        getIncidentUpdates = function(token, id, callback) {
            $http({
                url: App.host_addr + "/incidents/" + id + "/updates/",
                method: "GET",
                headers: {
                    "Authorization": token
                }
            }).success((function(data, status, headers, config) {
                console.log("getIncidentUpdates success");
                callback(data);
            })).error((function(data, status, headers, config) {
                console.log("Process failed");
                callback(false);
            }));
        };
        getIncidentUpdate = function(token, inci_id, update_id, callback) {
            $http({
                url: App.host_addr + "/incidents/" + inci_id + "/updates/" + update_id + "/",
                method: "GET",
                headers: {
                    "Authorization": token
                }
            }).success((function(data, status, headers, config) {
                console.log("getIncidentUpdate success");
                callback(data);
            })).error((function(data, status, headers, config) {
                console.log("Process failed");
                callback(false);
            }));
        };
        postIncidentUpdate = function(token, key, report, callback) {
            $http({
                url: App.host_addr + "/update/" + key + "/keys/",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                data: {
                    "updated_severity": report.severity,
                    "time": report.time,
                    "description": report.description,
                    "photo_url": report.photo_url
                }
            }).success((function(data, status, headers, config) {
                console.log("postIncidentUpdate success");
                callback(data);
            })).error((function(data, status, headers, config) {
                console.log(data);
                callback(false);
            }));
        };
        approveIncidentUpdate = function(token, inci_id, id, callback) {
            $http({
                url: App.host_addr + "/incidents/" + inci_id + "/updates/" + id + "/approve/",
                method: "GET",
                headers: {
                    "Authorization": token
                }
            }).success((function(data, status, headers, config) {
                console.log("approveIncidentUpdate success");
                console.log(data);
                callback(data);
            })).error((function(data, status, headers, config) {
                console.log("approveIncidentUpdate failed");
                console.log(data);
                callback(false);
            }));
        };
        rejectIncidentUpdate = function(token, inci_id, id, callback) {
            $http({
                url: App.host_addr + "/incidents/" + inci_id + "/updates/" + id + "/reject/",
                method: "GET",
                headers: {
                    "Authorization": token
                }
            }).success((function(data, status, headers, config) {
                console.log("rejectIncidentDispatch success");
                console.log(data);
                callback(data);
            })).error((function(data, status, headers, config) {
                console.log("rejectIncidentDispatch failed");
                callback(false);
            }));
        };
        allIncidentDispatches = function(token, callback) {
            $http({
                url: App.host_addr + "/incidents/alldispatches/",
                method: "GET",
                headers: {
                    "Authorization": token
                }
            }).success((function(data, status, headers, config) {
                console.log("alldispatches success");
                callback(data);
            })).error((function(data, status, headers, config) {
                console.log("alldispatches failed");
                callback(false);
            }));
        };
        getIncidentDispatches = function(token, inci_id, callback) {
            $http({
                url: App.host_addr + "/incidents/" + inci_id + "/dispatches/",
                method: "GET",
                headers: {
                    "Authorization": token
                }
            }).success((function(data, status, headers, config) {
                console.log("getIncidentDispatches success");
                callback(data);
            })).error((function(data, status, headers, config) {
                console.log("Process failed");
                callback(false);
            }));
        };
        getIncidentDispatch = function(token, inci_id, dispatch_id, callback) {
            $http({
                url: App.host_addr + "/incidents/" + inci_id + "/dispatches/" + dispatch_id + "/",
                method: "GET",
                headers: {
                    "Authorization": token
                }
            }).success((function(data, status, headers, config) {
                console.log("getIncidentDispatch success");
                callback(data);
            })).error((function(data, status, headers, config) {
                console.log("Process failed");
                callback(false);
            }));
        };
        approveIncidentDispatch = function(token, inci_id, id, callback) {
            $http({
                url: App.host_addr + "/incidents/" + inci_id + "/dispatches/" + id + "/approve/",
                method: "GET",
                headers: {
                    "Authorization": token
                }
            }).success((function(data, status, headers, config) {
                console.log("approveIncidentDispatch success");
                console.log(data);
                callback(data);
            })).error((function(data, status, headers, config) {
                console.log("approveIncidentDispatch failed");
                callback(false);
            }));
        };
        rejectIncidentDispatch = function(token, inci_id, id, callback) {
            $http({
                url: App.host_addr + "/incidents/" + inci_id + "/dispatches/" + id + "/reject/",
                method: "GET",
                headers: {
                    "Authorization": token
                }
            }).success((function(data, status, headers, config) {
                console.log("rejectIncidentDispatch success");
                console.log(data);
                callback(data);
            })).error((function(data, status, headers, config) {
                console.log("rejectIncidentDispatch failed");
                callback(false);
            }));
        };
        getIncidentTypes = function(token, callback) {
            $http({
                url: App.host_addr + "/incidents/types/",
                method: "GET",
                headers: {
                    "Authorization": token
                }
            }).success((function(data, status, headers, config) {
                console.log("get inci types success");
                callback(data);
            })).error((function(data, status, headers, config) {
                console.log("inci types failed");
                callback(false);
            }));
        };
        return {
            getIncidents: getIncidents,
            getIncident: getIncident,
            getIncidentFromKey: getIncidentFromKey,
            postIncident: postIncident,
            approveIncident: approveIncident,
            rejectIncident: rejectIncident,
            archiveIncident: archiveIncident,
            allIncidentUpdates: allIncidentUpdates,
            getIncidentUpdates: getIncidentUpdates,
            getIncidentUpdate: getIncidentUpdate,
            postIncidentUpdate: postIncidentUpdate,
            approveIncidentUpdate: approveIncidentUpdate,
            rejectIncidentUpdate: rejectIncidentUpdate,
            allIncidentDispatches: allIncidentDispatches,
            getIncidentDispatches: getIncidentDispatches,
            getIncidentDispatch: getIncidentDispatch,
            approveIncidentDispatch: approveIncidentDispatch,
            rejectIncidentDispatch: rejectIncidentDispatch,
            getIncidentTypes: getIncidentTypes
        };
    });

}).call(this);

//# sourceMappingURL=incidentService.js.map
