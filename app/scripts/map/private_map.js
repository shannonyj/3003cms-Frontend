
var mapManager;
$(document).ready(function () {
    $('#markAreaBtn').click(function () {
        mapManager.triggerMarkAreaClick();
    });
    $('.disasterType').change(function () {
        mapManager.setDisasterType($(this).val());
    });
    $('.areaList li').click(function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        mapManager.setDisasterType($(this).attr('disasterType'));
    });
    $('#saveMapBtn').click(function () {
        mapManager.saveMap();
    });
    $('#toggleEditBtn').click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active').text('New crisis');
            mapManager.setEditable(false);
        }
        else {
            $(this).addClass('active').text('New crisis');
            mapManager.setEditable(true);
            dehighlightAllAreas(true);
        }
    });
    $('#clearMapBtn').click(function () {
        mapManager.clearMap();
        $('.modifyAreaForm').hide();
    });
    setTimeout(function () {
        mapManager.clearMap();
        //Input url here************* Uncomment below
        /*$.get('', function (rawJson) {
        loadMap(rawJson);
        }); */
        //Sample load data
        loadMap(JSON.stringify([{ "coordinates": [{ "lat": 1.397562659547266, "lng": 103.70304107666016 }, { "lat": 1.40374062266067, "lng": 103.7270736694336 }, { "lat": 1.3447060959795738, "lng": 103.7160873413086}], "disaster": "Zombie", "type": "Polygon", "name": "Area1", "time": "2016-10-25T17:41:11.176Z" }, { "coordinates": [{ "lat": 1.4215879797063258, "lng": 103.73531341552734 }, { "lat": 1.4229608476328477, "lng": 103.7710189819336 }, { "lat": 1.3117559678296862, "lng": 103.7710189819336 }, { "lat": 1.318620614005517, "lng": 103.74149322509766}], "disaster": "Terminator", "type": "Polygon", "name": "Area2", "time": "2016-10-25T17:41:15.876Z" }, { "coordinates": [{ "lat": 1.3804015658498483, "lng": 103.80741119384766 }, { "lat": 1.3762828848738569, "lng": 103.9200210571289 }, { "lat": 1.3694184007839654, "lng": 103.86165618896484}], "disaster": "Fire", "type": "Polygon", "name": "Area3", "time": "2016-10-25T17:41:23.126Z" }, { "coordinates": [{ "lat": 1.4174693710318358, "lng": 103.87813568115234}], "disaster": "Safehouse", "type": "Point", "name": "Point4", "time": "2016-10-25T17:41:25.872Z" }, { "coordinates": [{ "lat": 1.3042048352878455, "lng": 103.87676239013672}], "disaster": "Safehouse", "type": "Point", "name": "Point6", "time": "2016-10-25T17:41:26.956Z" }, { "coordinates": [{ "lat": 1.3213664671805336, "lng": 103.6831283569336}], "disaster": "Safehouse", "type": "Point", "name": "Point7", "time": "2016-10-25T17:41:27.804Z"}]));
    }, 500);

    $('#submitFormBtn').click(function () {
        var targetArea = $(this).data('area');
        targetArea.name = $('.crisisReportForm #nameReport').val();
        targetArea.description = $('.crisisReportForm #descriptionReport').val();
        targetArea.location = $('.crisisReportForm #locationReport').val();
        targetArea.severity = $('.crisisReportForm #severityReport').val();
        var areaId = Number(targetArea.id);
        for (var i = 0; i < mapManager.areaManager.currentAreas.length; i++) {
            if (mapManager.areaManager.currentAreas[i].id == areaId) {
                console.log(areaId);
                console.log('found area match');
                mapManager.areaManager.currentAreas[i].name = $('.crisisReportForm #nameReport').val();
                mapManager.areaManager.currentAreas[i].description = $('.crisisReportForm #descriptionReport').val();
                mapManager.areaManager.currentAreas[i].location = $('.crisisReportForm #locationReport').val();
                mapManager.areaManager.currentAreas[i].severity = $('.crisisReportForm #severityReport').val();

                console.log(mapManager.areaManager.currentAreas[i]);
            }
        }
        var serializer = new Serializer();
        var newSerializedArea = serializer.serializeArea(targetArea);
        //Input url here************* Uncomment below
        // $.post('', { json: newSerializedArea }, function (data) { });
        $('.crisisReportForm,.overlay').hide();
        $('#toggleEditBtn').click();
    });
    $('.mapInfoPopupInnerWrapper .infoBtn').click(function () {
        var areaData = $('.mapInfoPopup').data('area');
        $('.crisisInfoForm .crisisName').text(mapManager.getDisasterName(areaData.disaster));
        $('.crisisInfoForm .location').text(areaData.location);
        $('.crisisInfoForm .name').text(areaData.name);
        $('.crisisInfoForm .time').text(new Date().toTimeString());
        $('.crisisInfoForm .description').text(areaData.description);
        var severity = 2;
        if (areaData.severity != null) severity = areaData.severity;
        $('.crisisInfoForm .severity').html(generateSeverityBar(severity));
        $('.crisisInfoForm,.overlay').show();
    });
});
function initMap() {
    mapManager = new MapManager();
    mapManager.initializeMap(document.getElementById('map'));
    mapManager.areaManager.onAreaChangeCallback = function (area) {
        createNewAreaItem(area);
        setTimeout(function () { $('.crisisReportForm,.overlay').show();}, 250);
    };
    mapManager.areaManager.onAreaLoadCallback = function (areas) {
        for (var i = 0; i < areas.length; i++) {
            createNewAreaItem(areas[i]);
        }
        $('.crisisReportForm,.overlay').hide();
    }
    mapManager.onAreaSpaceClickCallback = function (area) {
            genericOnAreaSpaceClickCallback(area);
    }
}
function createNewAreaItem(area) {
    $('.crisisReportForm input').val('');
    $('.crisisReportForm textarea').val('');
    $('#disasterTypeReport').text(mapManager.getDisasterName(area.disaster));
    $('#disasterTimeReport').text(new Date().toString());
    $('#submitFormBtn').data('area', area);
}
function loadMap(raw) {
    mapManager.loadMap(raw);
}