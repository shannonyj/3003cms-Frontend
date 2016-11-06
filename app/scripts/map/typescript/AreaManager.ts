// TypeScript
/// <reference path="models/DisasterType.ts"/>
/// <reference path="models/AreaType.ts"/>
/// <reference path="models/MapArea.ts"/>
/// <reference path="./server/Serializer.ts"/>
/// <reference path="jquerytypings.ts"/>
declare var google: any;

class AreaManager{
    currentAreas: Array<MapArea> = [];
    currentMap: any;
    onAreaChangeCallback: any;
    onAreaLoadCallback: any;
    parentMapManager: any;
    idCount = 100;
    areaCounter = 1;
    constructor(map:any){
        this.currentMap = map;
    }
    createPoint(marker, disasterType){
        var area = new MapArea();
        area.polygon = marker[0];
        area.disaster = disasterType;
        area.serializablePolygon.push(marker[0].position);
        area.time = new Date();
        area.type = AreaType.Point;
        area.name = 'Point' + this.areaCounter++;
        area.id = this.idCount++;
        if (this.parentMapManager != null) this.parentMapManager._onAreaCreatedMapManagerCallback(marker[0]);
        this.currentAreas.push(area);
        this.onAreaChangeCallback(area);
    }
    createArea(markers, disasterType){
        var config = DisasterTypeConfigMap.getConfig(disasterType);
        if (config.areaType == AreaType.Point)
        {
            this.createPoint(markers, disasterType);
            return;
        }
        var coordinates = [];
        for (var i =0; i < markers.length; i++){
            coordinates.push(markers[i].position);
        }
        var markedArea = new google.maps.Polygon($.extend({
            paths: coordinates}, config.polygonStyle));
        markedArea.setMap(this.currentMap);
        if (this.parentMapManager != null) this.parentMapManager._onAreaCreatedMapManagerCallback(markedArea);
        var area = new MapArea();
        area.polygon = markedArea;
        area.serializablePolygon = coordinates;
        area.disaster = disasterType;
        area.time = new Date();
        area.type = AreaType.Polygon;
        area.name = 'Area' + this.areaCounter++;
        area.id = this.idCount;
        this.currentAreas.push(area);
        var curInst = this;
        area.id = this.idCount++;
        this.onAreaChangeCallback((function getArea() {
            for (var i = 0; i < curInst.currentAreas.length; i++) {
                if (curInst.currentAreas[i].id == area.id) {
                    return curInst.currentAreas[i];
                }
            }
        })());
    }
    serializeCurrentMap(){
        var serializer = new Serializer();
        return serializer.serializeAreaList(this.currentAreas);
    }
    hideArea(areaId: number){
        for (var i = 0; i < this.currentAreas.length; i++){
            if (this.currentAreas[i].id == areaId){
                this.currentAreas[i].polygon.setVisible(false);
            }
        }
    }
    showArea(areaId: number){
        var area = null;
        for (var i = 0; i < this.currentAreas.length; i++){
            if (this.currentAreas[i].id == areaId){
                area = this.currentAreas[i];
            }
        }
        area.polygon.setVisible(true);
        var opacity = [0, 0]
        var interval = setInterval(function() {
          if (opacity[0] >= 0.8 && opacity[1] >= 0.35) {
            clearInterval(interval);
            area.polygon.setVisible(false);
          } else {
            opacity[0] = Math.max(0.0, opacity[0] + 0.055);
            opacity[1] = Math.max(0.0, opacity[1] + 0.025);
            area.polygon.setOptions({strokeOpacity: opacity[0], fillOpacity: opacity[1]});    
          }
        }, 50);
    }
    loadAreasFromString(raw: string){
        var deserialized = new Serializer().deserializeAreaList(raw);
        for (var i = 0; i < deserialized.length; i++){
            console.log('loading' +i);
            var config = DisasterTypeConfigMap.getConfig(deserialized[i].disaster);
            if (deserialized[i].type == AreaType.Point){
                deserialized[i].polygon = new google.maps.Marker({
                    position: deserialized[i].serializablePolygon[0],
                    map: this.currentMap,
                    icon: config.icon
                });
                 if (this.parentMapManager != null) this.parentMapManager._onAreaCreatedMapManagerCallback(deserialized[i].polygon);
            }
            else {
                var markedArea = new google.maps.Polygon($.extend({
                    paths: deserialized[i].serializablePolygon}, config.polygonStyle));
                deserialized[i].polygon = markedArea;
                if (this.parentMapManager != null) this.parentMapManager._onAreaCreatedMapManagerCallback(markedArea);
            }
            deserialized[i].polygon.setMap(this.currentMap);
        }
        this.currentAreas = deserialized;
        this.onAreaLoadCallback(this.currentAreas);
    }
}