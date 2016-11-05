// TypeScript
/// <reference path="models/DisasterType.ts"/>
/// <reference path="jquerytypings.ts"/>
/// <reference path="AreaManager.ts"/>
/// <reference path="server/Serializer.ts"/>
declare var google: any;

class MapManager{
    currentMap: any;
    mapInitializationInfo: any = {
            center: { lat: 1.3438458780474163, lng: 103.82801055908203 },
            zoom: 11,
            minZoom: 11
    };
    markerManager = new MarkerManager(this);
    areaManager: AreaManager;
    isEditable: bool;
    onAreaSpaceClickCallback: any;
    currentDisasterType = DisasterType.Zombie;

    initializeMap(mapContainer){
        this.currentMap = new google.maps.Map(mapContainer, this.mapInitializationInfo);
        this.areaManager = new AreaManager(this.currentMap);
        this.areaManager.parentMapManager = this;
        var currentMap = this.currentMap;
        this._attachClickListenerToMapObject(currentMap);
    }
    triggerMarkAreaClick(){
        this.areaManager.createArea(this.markerManager.liveMarkers, this.currentDisasterType);
        this.markerManager.clearCurrentMarkers();
    }
    deleteArea(area: MapArea){
        if (area.type == AreaType.Point)
            area.polygon.setMap(null);
        else
            area.polygon.setMap(null);
        this.areaManager.currentAreas.splice(this.areaManager.currentAreas.indexOf(area), 1);
    }
    highlightArea(area: MapArea){
        var areaConfig = DisasterTypeConfigMap.getConfig(area.disaster, true);
        if (area.type == AreaType.Point)
            area.polygon.setIcon(areaConfig.icon);
        else {
            area.polygon.setOptions(areaConfig.polygonStyle);
        }
    }
    deHighlightArea(area: MapArea){
        var areaConfig = DisasterTypeConfigMap.getConfig(area.disaster, false);
        if (area.type == AreaType.Point)
            area.polygon.setIcon(areaConfig.icon);
        else {
            area.polygon.setOptions(areaConfig.polygonStyle);
        }
    }
    hideArea(area: MapArea){
        this.areaManager.hideArea(area.id);
    }
    showArea(area: MapArea){
        this.areaManager.showArea(area.id);
    }
    setDisasterType(name: string){
        switch (name){
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
    }
    saveMap() {
        console.log(this.areaManager.serializeCurrentMap());
        $('.saveTextArea').text(this.areaManager.serializeCurrentMap());
    }
    loadMap(raw: string){
        this.areaManager.loadAreasFromString(raw);
    }
    clearMap(){
        for (var i = this.areaManager.currentAreas.length - 1; i >= 0; i--){
            this.deleteArea(this.areaManager.currentAreas[i]);
        }
       // this.areaManager.currentAreas = [];
    }
    getDisasterName(areaType: number){
        return DisasterType[areaType];
    }
    setEditable(isEditable: bool){
        this.isEditable = isEditable;
    }
    
    _onAreaCreatedMapManagerCallback(mapObject: any){
        this._attachClickListenerToMapObject(mapObject);
    }
    _attachClickListenerToMapObject(mapObject: any){
        var curInst = this;
        google.maps.event.addListener(mapObject, "click", function (event) {
            if (curInst.isEditable){
                curInst.markerManager.setMarker({ lat: event.latLng.lat(), lng: event.latLng.lng() }, curInst.currentMap, curInst.currentDisasterType);
                if (DisasterTypeConfigMap.getConfig(curInst.currentDisasterType).areaType == AreaType.Point)
                {
                    curInst.areaManager.createArea(curInst.markerManager.liveMarkers, curInst.currentDisasterType);
                    curInst.markerManager.liveMarkers = [];
                }
            }
            else {
                var isAVisibleMapItem = mapObject.visible;
                console.log(isAVisibleMapItem);
                if (isAVisibleMapItem){
                    for (var i = 0; i < curInst.areaManager.currentAreas.length; i++){
                        if (curInst.areaManager.currentAreas[i].polygon == mapObject){
                        console.log(curInst.areaManager.currentAreas[i]);
                            curInst.onAreaSpaceClickCallback(curInst.areaManager.currentAreas[i]);
                        }
                    }
                }
            }
        });
    }

}


class MarkerManager{
    mapManager: MapManager;
    liveMarkers: any = [];
    constructor(mapManager: MapManager){
        this.mapManager = mapManager;
    }
    setMarker(coordinates, map, disasterType){
        var config = DisasterTypeConfigMap.getConfig(disasterType);
        var drawingMarker = new google.maps.Marker({
            position: coordinates,
            map: map,
            icon: config.icon
        });
        this.liveMarkers.push(drawingMarker);
    }
    clearCurrentMarkers(){
        for (var i =0; i < this.liveMarkers.length; i++){
            this.liveMarkers[i].setMap(null);
        }
        this.liveMarkers = [];
    }
}