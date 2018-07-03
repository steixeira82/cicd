app.controller('ImbarqPositionController', function ($interval, $scope, $rootScope, $http, View) {
    var vm = this;
    vm.view = View;

    vm.filter = { IMBARQ_TRADE_DATE: moment().format('DD/MM/YYYY'), IMBARQ_SETTEL_DATE: moment().format('DD/MM/YYYY'), IMBARQ_VALID: 1 }
    vm.update = function () {
        vm.view.dtEquities_update(vm.filter);
    };

    vm.exportExcel = function () {
        document.getElementById('my_iframe').src = '/opscontrol/GetImbarqPositionExcel?IMBARQ_TRADE_DATE=' + moment(vm.filter.IMBARQ_TRADE_DATE, 'DD/MM/YYYY').format('YYYY-MM-DD') + '&IMBARQ_SETTEL_DATE=' + moment(vm.filter.IMBARQ_SETTEL_DATE, 'DD/MM/YYYY').format('YYYY-MM-DD') + '&IMBARQ_VALID=' + vm.filter.IMBARQ_VALID;
    }
});