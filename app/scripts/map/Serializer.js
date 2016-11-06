// TypeScript
/// <reference path="./models/DisasterType.ts"/>
/// <reference path="./models/AreaType.ts"/>
/// <reference path="./models/MapArea.ts"/>
var Serializer = (function () {
    function Serializer() {
    }
    Serializer.prototype.serializeAreaList = function (areaList) {
        var serializableAreaList = [];
        for (var i = 0; i < areaList.length; i++) {
            var serializableArea = {};
            serializableArea['coordinates'] = areaList[i].serializablePolygon;
            serializableArea['disaster'] = DisasterType[areaList[i].disaster];
            serializableArea['type'] = AreaType[areaList[i].type];
            serializableArea['name'] = areaList[i].name;
            serializableArea['description'] = areaList[i].description;
            serializableArea['time'] = areaList[i].time;
            serializableArea['location'] = areaList[i].location;
            serializableArea['severity'] = areaList[i].severity;
            serializableAreaList.push(serializableArea);
        }
        return JSON.stringify(serializableAreaList);
    };
    Serializer.prototype.serializeArea = function (area) {
        var serializableArea = {};
        serializableArea['coordinates'] = area.serializablePolygon;
        serializableArea['disaster'] = DisasterType[area.disaster];
        serializableArea['type'] = AreaType[area.type];
        serializableArea['name'] = area.name;
        serializableArea['description'] = area.description;
        serializableArea['time'] = area.time;
        serializableArea['location'] = area.location;
        serializableArea['severity'] = area.severity;
        return JSON.stringify(serializableArea);
    };
    Serializer.prototype.deserializeAreaList = function (raw) {
        var deserialized = JSON.parse(raw);
        var areaList = [];
        for (var i = 0; i < deserialized.length; i++) {
            var mapArea = new MapArea();
            mapArea.serializablePolygon = deserialized[i]['coordinates'];
            mapArea.disaster = DisasterType[deserialized[i]['disaster']];
            mapArea.type = AreaType[deserialized[i]['type']];
            mapArea.name = deserialized[i]['name'];
            mapArea.description = deserialized[i]['description'];
            mapArea.time = new Date(deserialized[i]['time']);
            mapArea.severity = Number(deserialized[i]['severity']);
            ;
            mapArea.location = deserialized[i]['location'];
            mapArea.id = deserialized[i]['id'];
            console.log(deserialized[i]);
            if (deserialized[i]['approved'])
                mapArea.approved = deserialized[i]['approved'];
            areaList.push(mapArea);
        }
        return areaList;
    };
    return Serializer;
} ());
