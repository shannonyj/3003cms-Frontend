
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
        loadMapFromUrl(rootDjangoUrl + '/' + $('.mapType').val());
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
        console.log({ json: newSerializedArea });
        $.post(rootDjangoUrl + '/submitCrisis/', newSerializedArea, function (data) { });
        $('.crisisReportForm,.overlay').hide();
        $('#toggleEditBtn').click();
    });
    $('.mapInfoPopupInnerWrapper .infoBtn').click(function () {
        var areaData = $('.mapInfoPopup').data('area');
        $('.crisisInfoForm .crisisName').text(mapManager.getDisasterName(areaData.disaster));
        $('.crisisInfoForm .location').text(areaData.location);
        $('.crisisInfoForm .name').text(areaData.name);
        $('.crisisInfoForm .time').text(area.time.format());
        $('.crisisInfoForm .description').text(areaData.description);
        var severity = 2;
        if (areaData.severity != null) severity = areaData.severity;
        $('.crisisInfoForm .severity').html(generateSeverityBar(severity));
        $('.crisisInfoForm,.overlay').show();
    });
    setTimeout(function () {
        new google.maps.places.SearchBox($('#locationReport')[0]);
    }, 500);
    $('.mapType').change(function () {
        loadMapFromUrl(rootDjangoUrl + '/' + $(this).val());
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
    $('#disasterTimeReport').text(area.time.format());
    $('#submitFormBtn').data('area', area);
}
function loadMap(raw) {
    mapManager.loadMap(raw);
}