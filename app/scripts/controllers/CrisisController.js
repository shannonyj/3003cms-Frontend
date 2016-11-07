// TypeScript
var CrisisController = (function () {
    function CrisisController() {
        this.rootDjangoUrl = 'http://127.0.0.1:8000';
    }
    CrisisController.prototype.approveCrisis = function (id) {
        $.get(rootDjangoUrl + '/approveCrisis/' + id + '/');
    };
    CrisisController.prototype.getPublicMap = function (callback) {
    };
    CrisisController.prototype.getApprovedMap = function (callback) {
    };
    CrisisController.prototype.getReportingMap = function (callback) {
    };
    return CrisisController;
}());
