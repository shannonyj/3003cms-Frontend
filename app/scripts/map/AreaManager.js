/// <reference path="models/DisasterType.ts"/>
/// <reference path="models/AreaType.ts"/>
/// <reference path="models/MapArea.ts"/>
/// <reference path="./server/Serializer.ts"/>
/// <reference path="jquerytypings.ts"/>
var AreaManager = (function () {
    function AreaManager(map) {
        this.currentAreas = [];
        this.areaCounter = 1;
        this.currentMap = map;
    }
    AreaManager.prototype.createPoint = function (marker, disasterType) {
        var area = new MapArea();
        area.polygon = marker[0];
        area.disaster = disasterType;
        area.serializablePolygon.push(marker[0].position);
        area.time = new Date();
        area.type = AreaType.Point;
        area.name = 'Point' + this.areaCounter++;
        if (this.parentMapManager != null)
            this.parentMapManager._onAreaCreatedMapManagerCallback(marker[0]);
        this.currentAreas.push(area);
        this.onAreaChangeCallback(area);
    };
    AreaManager.prototype.createArea = function (markers, disasterType) {
        var config = DisasterTypeConfigMap.getConfig(disasterType);
        if (config.areaType == AreaType.Point) {
            this.createPoint(markers, disasterType);
            return;
        }
        var coordinates = [];
        for (var i = 0; i < markers.length; i++) {
            coordinates.push(markers[i].position);
        }
        var markedArea = new google.maps.Polygon($.extend({
            paths: coordinates }, config.polygonStyle));
        markedArea.setMap(this.currentMap);
        if (this.parentMapManager != null)
            this.parentMapManager._onAreaCreatedMapManagerCallback(markedArea);
        var area = new MapArea();
        area.polygon = markedArea;
        area.serializablePolygon = coordinates;
        area.disaster = disasterType;
        area.time = new Date();
        area.type = AreaType.Polygon;
        area.name = 'Area' + this.areaCounter++;
        this.currentAreas.push(area);
        this.onAreaChangeCallback(area);
    };
    AreaManager.prototype.serializeCurrentMap = function () {
        var serializer = new Serializer();
        return serializer.serializeAreaList(this.currentAreas);
    };
    AreaManager.prototype.loadAreasFromString = function (raw) {
        var deserialized = new Serializer().deserializeAreaList(raw);
        for (var i = 0; i < deserialized.length; i++) {
            console.log('loading' + i);
            var config = DisasterTypeConfigMap.getConfig(deserialized[i].disaster);
            if (deserialized[i].type == AreaType.Point) {
                deserialized[i].polygon = new google.maps.Marker({
                    position: deserialized[i].serializablePolygon[0],
                    map: this.currentMap,
                    icon: config.icon
                });
                if (this.parentMapManager != null)
                    this.parentMapManager._onAreaCreatedMapManagerCallback(deserialized[i].polygon);
            }
            else {
                var markedArea = new google.maps.Polygon($.extend({
                    paths: deserialized[i].serializablePolygon }, config.polygonStyle));
                deserialized[i].polygon = markedArea;
                if (this.parentMapManager != null)
                    this.parentMapManager._onAreaCreatedMapManagerCallback(markedArea);
            }
            deserialized[i].polygon.setMap(this.currentMap);
        }
        this.currentAreas = deserialized;
        this.onAreaLoadCallback(this.currentAreas);
    };
    return AreaManager;
}());
