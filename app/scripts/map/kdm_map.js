
    var mapManager;
    var crisisController;
    $(document).ready(function () {
        $('.to-do-list-dispatch .close,#approve-dispatch-cancel').click(function () {
            $('.to-do-list-dispatch,.overlay').hide();
        });
        setTimeout(function () {
            loadMapFromUrl(rootDjangoUrl + '/' + $('.mapType').val());
        }, 500);
        setTimeout(function () {
            loadToDoList();
        }, 1000);
        $('.mapInfoPopupInnerWrapper .infoBtn').click(function () {
            var areaData = $('.mapInfoPopup').data('area');
            $('.crisisInfoForm .crisisName').text(mapManager.getDisasterName(areaData.disaster));
            $('.crisisInfoForm .location').text(areaData.location);
            $('.crisisInfoForm .name').text(areaData.name);
            $('.crisisInfoForm .time').text(areaData.time.format());
            $('.crisisInfoForm .description').text(areaData.description);
            var severity = 2;
            if (areaData.severity != null) severity = areaData.severity;
            $('.crisisInfoForm .severity').html(generateSeverityBar(severity));
            $('.crisisInfoForm,.overlay').show();
        });
        $('#hideDispatchFormBtn').click(function () {
            $('.dispatchInfoForm,.overlay').hide();
        });
        $('.mapDispatchInfoPopup').click(function () {
            $('.dispatchInfoForm,.overlay').show();
        });
        $('.createMapDispatchInfoPopup').click(function () {
            loadCreateDispatchForm($(this).data('area'));
        });
        $('#approve-dispatch').click(function () {
            $('.to-do-list-dispatch,.overlay,.createMapDispatchInfoPopup').hide();
            var area = $('.createMapDispatchInfoPopup').data('area');
            area.dispatch = {};
            area.dispatch.agency = $('.to-do-list-dispatch .agency').val();
            area.dispatch.resource = $('.to-do-list-dispatch .resource').val();
            area.dispatch.contact = $('.to-do-list-dispatch .contact').val();
            area.dispatch.time = new Date($('.to-do-list-dispatch .dispatchTime').text());
            $('.to-do-list-dispatch .agency option')[0].selected = true;
            $('.to-do-list-dispatch .resource option')[0].selected = true;
            $('.to-do-list-dispatch .contact').val('');
            $.post(rootDjangoUrl + '/sendDispatch/' + area.id + '/', JSON.stringify(area.dispatch), function (response) { });
            $('.mapDispatchInfoPopup').show();
        });
        $('#cancelApproveCrisisFormBtn').click(function () {
            $('.crisisApprovalForm,.overlay').hide();
        });
        $('#approveCrisisFormBtn').click(function () {
            crisisController.approveCrisis($('.crisisApprovalForm').data('area').id);
            $('.crisisApprovalForm').data('area').polygon.setMap(null);
            $('.crisisApprovalForm,.overlay').hide();
        });
        $('.mapApproveInfoPopup').click(function () {
            loadApprovalForm($(this).data('area'));
        });
        $('.mapType').change(function () {
            loadMapFromUrl(rootDjangoUrl + '/' + $(this).val());
            setTimeout(function () {
                loadToDoList();
            }, 500);
        });
        $('.archiveCrisisBtn').click(function () {
            var area = $(this).data('area');
            area.polygon.setMap(null);
            $.get(rootDjangoUrl + '/closeCrisis/' + area.id + '/');
        });
    });
    function loadToDoList(){
        var toDoItems = [];
        $('.toDoItems').empty();
        for (var i = 0; i < mapManager.areaManager.currentAreas.length; i++){
            console.log(mapManager.areaManager.currentAreas[i].approved);
            if (!mapManager.areaManager.currentAreas[i].approved || mapManager.areaManager.currentAreas[i] == null)
                toDoItems.push(mapManager.areaManager.currentAreas[i]);
        }
        toDoItems.reverse();
        for (var i = 0; i < toDoItems.length; i++) {
            var area = toDoItems[i];
            var approved = area.approved;
            var newItem = $('<li><span class="handle-disabled">\
                    <i class="fa fa-ellipsis-v"></i>\
                    <i class="fa fa-ellipsis-v"></i>\
                    </span><span>&lt;' + toDoItems[i].name + '&gt;: <span class="typeText">Dispatch</span></span>\
                        <small class="label label label-primary ng-scope"><i class="fa fa-clock-o"></i> <span am-time-ago="todo.time"></span></small>\
                    </li>');
            $('.typeText').text(approved ? 'Dispatch': 'Crisis');
            $('.toDoItems').append(newItem);
            newItem.click(function () {
                if (!approved) {
                    loadApprovalForm(area);
                }
            });
        }
    }
    function loadMap(raw) {
        mapManager.loadMap(raw);
    }
    function initMap() {
        mapManager = new MapManager();
        mapManager.initializeMap(document.getElementById('map'));
        mapManager.areaManager.onAreaChangeCallback = function (area) {
            createNewAreaItem(area);
        };
        mapManager.areaManager.onAreaLoadCallback = function (areas) {
            for (var i = 0; i < areas.length; i++) {
                createNewAreaItem(areas[i]);
            }
            $('.crisisReportForm').hide();
        }
        mapManager.onAreaSpaceClickCallback = function (area) {
            genericOnAreaSpaceClickCallback(area);
            $('.archiveCrisisBtn').show();
            $('.archiveCrisisBtn').data('area', area);
            $('.to-do-list-dispatch .location').text(area.location);
            if (area.approved != null && area.approved) {
                if (area.dispatch != null) {
                    $('.mapDispatchInfoPopup').show();
                    $('.createMapDispatchInfoPopup').hide();
                    $('.mapApproveInfoPopup').hide();
                    $('.dispatchInfoForm .location').text(area.location);
                    $('.dispatchInfoForm .agency').text(area.dispatch.agency);
                    $('.dispatchInfoForm .resource').text(area.dispatch.resource);
                    $('.dispatchInfoForm .contact').text(area.dispatch.contact);
                    console.log(area.dispatch);
                    $('.dispatchInfoForm .time').text(area.dispatch.time.format());
                }
                else {
                    $('.createMapDispatchInfoPopup').show().data('area', area);
                    $('.mapDispatchInfoPopup').hide();
                    $('.mapApproveInfoPopup').hide();
                }
            }
            else {
                $('.mapApproveInfoPopup').show().data('area', area);
                $('.mapDispatchInfoPopup').hide();
                $('.createMapDispatchInfoPopup').hide();
            }
        };
    }
    function loadApprovalForm(area) {
        $('.crisisApprovalForm').data('area', area);
        $('.crisisApprovalForm .disaster').text(mapManager.getDisasterName(area.disaster));
        $('.crisisApprovalForm .name').text(area.name);
        $('.crisisApprovalForm .location').text(area.location);
        $('.crisisApprovalForm .time').text(area.time.format());
        $('.crisisApprovalForm .description').text(area.description);
        var severity = 2;
        if (area.severity != null) severity = area.severity;
        $('.crisisApprovalForm .severity').html(generateSeverityBar(severity));
        $('.crisisApprovalForm,.overlay').show();
    }
    function loadCreateDispatchForm(area) {
        $('.to-do-list-dispatch .disasterType').text(mapManager.getDisasterName(area.disaster));
        $('.to-do-list-dispatch .location').text(area.location);
        $('.to-do-list-dispatch .time').text(area.time.format());
        $('.to-do-list-dispatch .description').text(area.description);
        var severity = 2;
        if (area.severity != null) severity = area.severity;
        $('.to-do-list-dispatch .severity').html(generateSeverityBar(severity));
        $('.to-do-list-dispatch .dispatchTime').text(new Date().format());
        $('.to-do-list-dispatch,.overlay').show();
    }