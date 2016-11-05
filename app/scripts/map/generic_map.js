
function dehighlightAllAreas(hidePopup){
    if (hidePopup) $('.mapInfoPopup').hide();
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