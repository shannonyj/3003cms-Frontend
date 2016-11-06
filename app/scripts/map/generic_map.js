$(document).ready(function () {
    setTimeout(function () { 
    var searchBox = new google.maps.places.SearchBox($('#pac-input')[0]);
    searchBox.addListener('places_changed', function () {
        console.log(searchBox.getPlaces()[0]);
        goToLocation(searchBox.getPlaces()[0].formatted_address);
    });
    }, 500);
});
function dehighlightAllAreas(hidePopup){
    if (hidePopup) $('.mapInfoPopup,.mapInfoPopupTypes').hide();
    for (var i = mapManager.areaManager.currentAreas.length - 1; i >= 0; i--) {
            mapManager.deHighlightArea(mapManager.areaManager.currentAreas[i]);
        }
}

function generateSeverityBar(severity){
    var severityBar = $('<ul class="severityBar"></ul>');
    for (var i = 0; i < 5; i++){
        var severityIcon = $('<li class="radio"></li>');
        severityIcon.html('<span class="innerRadio"></span>');
        if (severity-- > 0){
            severityIcon.addClass('active');
        }
        severityBar.append(severityIcon);
    }
    return severityBar;
}
function genericOnAreaSpaceClickCallback(area){
    $('.mapInfoPopupInnerWrapper .crisisType').html(DisasterType[area.disaster]);
    $('.mapInfoPopupInnerWrapper .crisisName').html(area.name);
    var severity = 2;
    if (area.severity != null) severity = area.severity;
    $('.severityBarWrapper').empty().append(generateSeverityBar(severity));
    $('.mapInfoPopup').show();
    $('.mapInfoPopup').animate({ width: '202px', height: '102px', 'margin-left': '-1px', 'font-size': '105%' }, 250, 'easeOutBounce').animate({ width: '200px', height: '100px', 'margin-left': '0px', 'font-size': '100%' }, 250, 'easeOutBounce');
    $('.mapInfoPopup').data('area', area);
    dehighlightAllAreas(false);
    mapManager.highlightArea(area);
}

function goToLocation(location){
    $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURI(location) + '&key=AIzaSyCanXJuqR9G83t3TPpOBySHq-4gx2_7DUA', function (data) {
        var results = data.results[0];
        console.log(results);
        var latDiff = results.geometry.viewport.northeast.lat - results.geometry.viewport.southwest.lat;
        var lngDiff = results.geometry.viewport.northeast.lng - results.geometry.viewport.southwest.lng;
        var sumDist = latDiff + lngDiff;
        var zoom = 18;
        console.log(sumDist);
        if (sumDist < 0.01) zoom = 17;
        else if (sumDist < 0.06) zoom = 15;
        else if (sumDist < 0.1) zoom = 14;
        else if (sumDist < 0.28) zoom = 13;
        else if (sumDist < 0.37) zoom = 13;
        else if (sumDist < 0.5) zoom = 12;
        else zoom = 11;
        console.log(zoom);
        mapManager.currentMap.setZoom(zoom);
        mapManager.currentMap.setCenter(results.geometry.location);
        var rectangle = new google.maps.Rectangle({
            strokeColor: '#4f7537',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#ffffff',
            fillOpacity: 0,
            map: mapManager.currentMap,
            bounds: {
                north: results.geometry.viewport.northeast.lat,
                south: results.geometry.viewport.southwest.lat,
                east: results.geometry.viewport.northeast.lng,
                west: results.geometry.viewport.southwest.lng
            }
        });
        var v = 1;
        setTimeout(function () {
            var chgeOpacityInterval = setInterval(function () {
                rectangle.set("fillOpacity", v * 0);
                rectangle.set("strokeOpacity", v * 0.8);
                v -= 0.05;
                if (v <= 0) {
                    clearInterval(chgeOpacityInterval);
                    rectangle.setMap(null);
                }
            }, 100);
        }, 500);
    });
}