// TypeScript
class CrisisController{
    rootDjangoUrl: string = 'http://127.0.0.1:8000';
    approveCrisis(id){
        $.get(rootDjangoUrl + '/approveCrisis/' + id + '/');
    }
    submitCrisis(crisis){
        var areaId = Number(crisis.id);
        for (var i = 0; i < mapManager.areaManager.currentAreas.length; i++) {
            if (mapManager.areaManager.currentAreas[i].id == areaId) {
                mapManager.areaManager.currentAreas[i].name = crisis.name;
                mapManager.areaManager.currentAreas[i].description = crisis.name;
                mapManager.areaManager.currentAreas[i].location = crisis.name;
                mapManager.areaManager.currentAreas[i].severity = crisis.name;

                console.log(mapManager.areaManager.currentAreas[i]);
            }
        }
        var serializer = new Serializer();
        var newSerializedArea = serializer.serializeArea(crisis);
        
        $.post(rootDjangoUrl + '/submitCrisis/', newSerializedArea, function (data) { });
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