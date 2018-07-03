app.controller('ImbarqCustodyBalanceController', function ($interval, $scope, $rootScope, $http, View) {
    var vm = this;
    vm.view = View;

    vm.filter = { IMBARQ_VALID: 1 }
    vm.update = function () {
        vm.view.dtEquities_update(vm.filter);
    };

    vm.exportExcel = function () {
        document.getElementById('my_iframe').src = '/opscontrol/GetImbarqCustodyBalanceExcel?IMBARQ_VALID=' + vm.filter.IMBARQ_VALID;
    }
});