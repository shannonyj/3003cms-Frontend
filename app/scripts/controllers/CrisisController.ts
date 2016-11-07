// TypeScript
class CrisisController{
    rootDjangoUrl: string = 'http://127.0.0.1:8000';
    approveCrisis(id){
        $.get(rootDjangoUrl + '/approveCrisis/' + id + '/');
    }
    submitCrisis(crisis){
        
    }
    getPublicMap(callback){
        $.get(rootDjangoUrl + '/getPublicApprovedCrisis/', function (rawJson) {
            callback(rawJson);
        });
    }
    getApprovedMap(callback){
        $.get(rootDjangoUrl + '/getApprovedCrisis/', function (rawJson) {
            callback(rawJson);
        });
    }
    getReportingMap(callback){
        $.get(rootDjangoUrl + '/getUnapprovedCrisis/', function (rawJson) {
            callback(rawJson);
        });
    }
}