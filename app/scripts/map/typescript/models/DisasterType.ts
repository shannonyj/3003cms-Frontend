// TypeScript
/// <reference path="AreaType.ts"/>
enum DisasterType{
    Zombie, Terminator, Thunderstorm, Fire, Safehouse, Plague
}
class DisasterTypeConfig{
    icon: any;
    polygonStyle: any;
    areaType: AreaType;
}
class DisasterTypeConfigMap{
    static getConfig(areaType: DisasterType, isHighlight = false) {
        var config = new DisasterTypeConfig();
        if (areaType == DisasterType.Zombie){
            config.icon = './images/brown_circle.png';
            if (!isHighlight) {
                config.polygonStyle = {
                    strokeColor: '#9e7b19',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#ddbf6b',
                    fillOpacity: 0.35};
            }
            else {
                config.polygonStyle = {
                    strokeColor: '#9e7b19',
                    strokeOpacity: 1,
                    strokeWeight: 2,
                    fillColor: '#ddbf6b',
                    fillOpacity: 0.6};
            }
            config.areaType = AreaType.Polygon;
        }
        if (areaType == DisasterType.Fire){
            config.icon = './images/red_circle.png';
            if (!isHighlight) {
                config.polygonStyle = {
                    strokeColor: '#7e1c1c',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#be6b6b',
                    fillOpacity: 0.35};
            }
            else {
                config.polygonStyle = {
                    strokeColor: '#7e1c1c',
                    strokeOpacity: 1,
                    strokeWeight: 2,
                    fillColor: '#be6b6b',
                    fillOpacity: 0.6};
            }
            config.areaType = AreaType.Polygon;
        }
        if (areaType == DisasterType.Terminator){
            config.icon = './images/black_circle.png';
            if (!isHighlight) {
                config.polygonStyle = {
                    strokeColor: '#333333',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#777777',
                    fillOpacity: 0.35};
            }
            else {
                config.polygonStyle = {
                    strokeColor: '#333333',
                    strokeOpacity: 1,
                    strokeWeight: 2,
                    fillColor: '#777777',
                    fillOpacity: 0.6};
            }
            config.areaType = AreaType.Polygon;
        }
        if (areaType == DisasterType.Thunderstorm){
            config.icon = './images/blue_circle.png';
            config.polygonStyle = {
                    strokeColor: '#0c6072',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#63c5d5',
                    fillOpacity: 0.35};
            config.areaType = AreaType.Polygon;
            if (isHighlight) config.polygonStyle.strokeWeight = 4;
        }
        if (areaType == DisasterType.Safehouse){
            config.icon = './images/safehouseicon.png';
            config.areaType = AreaType.Point;
            if (isHighlight) config.icon = './images/safehouseicon_enlarged.png';
        }
        return config;
    };

}