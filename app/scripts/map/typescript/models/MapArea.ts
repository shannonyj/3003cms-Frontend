// TypeScript
/// <reference path="DispatchInfo.ts"/>
class MapArea{
    id: number;
    polygon: any; //type google.maps.Polygon/Marker
    serializablePolygon: Array<any> = [];
    disaster: DisasterType;
    type: AreaType;
    name: string;
    description: string;
    time: any;
    location: string;
    severity: number;
    dispatch: DispatchInfo;
}