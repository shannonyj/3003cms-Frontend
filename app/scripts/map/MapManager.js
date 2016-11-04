/// <reference path="models/DisasterType.ts"/>
/// <reference path="jquerytypings.ts"/>
/// <reference path="AreaManager.ts"/>
/// <reference path="server/Serializer.ts"/>
var MapManager = (function () {
    function MapManager() {
        this.mapInitializationInfo = {
            center: { lat: 1.3438458780474163, lng: 103.82801055908203 },
            zoom: 11,
            minZoom: 11
        };
        this.markerManager = new MarkerManager(this);
        this.currentDisasterType = DisasterType.Zombie;
    }
    MapManager.prototype.initializeMap = function (mapContainer) {
        this.currentMap = new google.maps.Map(mapContainer, this.mapInitializationInfo);
        this.areaManager = new AreaManager(this.currentMap);
        this.areaManager.parentMapManager = this;
        var currentMap = this.currentMap;
        this._attachClickListenerToMapObject(currentMap);
    };
    MapManager.prototype.triggerMarkAreaClick = function () {
        this.areaManager.createArea(this.markerManager.liveMarkers, this.currentDisasterType);
        this.markerManager.clearCurrentMarkers();
    };
    MapManager.prototype.deleteArea = function (area) {
        if (area.type == AreaType.Point)
            area.polygon.setMap(null);
        else
            area.polygon.setMap(null);
        this.areaManager.currentAreas.splice(this.areaManager.currentAreas.indexOf(area), 1);
    };
    MapManager.prototype.highlightArea = function (area) {
        var areaConfig = DisasterTypeConfigMap.getConfig(area.disaster, true);
        if (area.type == AreaType.Point)
            area.polygon.setIcon(areaConfig.icon);
        else {
            area.polygon.setOptions(areaConfig.polygonStyle);
        }
    };
    MapManager.prototype.deHighlightArea = function (area) {
        var areaConfig = DisasterTypeConfigMap.getConfig(area.disaster, false);
        if (area.type == AreaType.Point)
            area.polygon.setIcon(areaConfig.icon);
        else {
            area.polygon.setOptions(areaConfig.polygonStyle);
        }
    };
    MapManager.prototype.setDisasterType = function (name) {
        switch (name) {
            case 'Zombie':
                this.currentDisasterType = DisasterType.Zombie;
                break;
            case 'Terminator':
                this.currentDisasterType = DisasterType.Terminator;
                break;
            case 'Fire':
                this.currentDisasterType = DisasterType.Fire;
                break;
            case 'Plague':
                this.currentDisasterType = DisasterType.Plague;
                break;
            case 'Thunderstorm':
                this.currentDisasterType = DisasterType.Thunderstorm;
                break;
            case 'Safehouse':
                this.currentDisasterType = DisasterType.Safehouse;
                break;
        }
        this.markerManager.clearCurrentMarkers();
    };
    MapManager.prototype.saveMap = function () {
        console.log(this.areaManager.serializeCurrentMap());
        $('.saveTextArea').text(this.areaManager.serializeCurrentMap());
    };
    MapManager.prototype.loadMap = function (raw) {
        this.areaManager.loadAreasFromString(raw);
    };
    MapManager.prototype.clearMap = function () {
        for (var i = this.areaManager.currentAreas.length - 1; i >= 0; i--) {
            this.deleteArea(this.areaManager.currentAreas[i]);
        }
        // this.areaManager.currentAreas = [];
    };
    MapManager.prototype.getDisasterName = function (areaType) {
        return DisasterType[areaType];
    };
    MapManager.prototype.setEditable = function (isEditable) {
        this.isEditable = isEditable;
    };
    MapManager.prototype._onAreaCreatedMapManagerCallback = function (mapObject) {
        this._attachClickListenerToMapObject(mapObject);
    };
    MapManager.prototype._attachClickListenerToMapObject = function (mapObject) {
        var curInst = this;
        google.maps.event.addListener(mapObject, "click", function (event) {
            if (curInst.isEditable) {
                curInst.markerManager.setMarker({ lat: event.latLng.lat(), lng: event.latLng.lng() }, curInst.currentMap, curInst.currentDisasterType);
                if (DisasterTypeConfigMap.getConfig(curInst.currentDisasterType).areaType == AreaType.Point) {
                    curInst.areaManager.createArea(curInst.markerManager.liveMarkers, curInst.currentDisasterType);
                    curInst.markerManager.liveMarkers = [];
                }
            }
            else {
                var isAVisibleMapItem = mapObject.visible;
                console.log(isAVisibleMapItem);
                if (isAVisibleMapItem) {
                    for (var i = 0; i < curInst.areaManager.currentAreas.length; i++) {
                        if (curInst.areaManager.currentAreas[i].polygon == mapObject) {
                            curInst.onAreaSpaceClickCallback(curInst.areaManager.currentAreas[i]);
                        }
                    }
                }
            }
        });
    };
    return MapManager;
}());
var MarkerManager = (function () {
    function MarkerManager(mapManager) {
        this.liveMarkers = [];
        this.mapManager = mapManager;
    }
    MarkerManager.prototype.setMarker = function (coordinates, map, disasterType) {
        var config = DisasterTypeConfigMap.getConfig(disasterType);
        var drawingMarker = new google.maps.Marker({
            position: coordinates,
            map: map,
            icon: config.icon
        });
        this.liveMarkers.push(drawingMarker);
    };
    MarkerManager.prototype.clearCurrentMarkers = function () {
        for (var i = 0; i < this.liveMarkers.length; i++) {
            this.liveMarkers[i].setMap(null);
        }
        this.liveMarkers = [];
    };
    return MarkerManager;
}());
