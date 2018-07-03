app.controller('ImbarqShortSalesController', function ($interval, $scope, $rootScope, $http, View) {
    var vm = this;
    vm.view = View;

    vm.filter = { IMBARQ_VALID: 1, IMBARQ_INDIC_SHORTSALES: true }
    vm.update = function () {
        vm.view.dtEquities_update(vm.filter);
    };

    vm.exportExcel = function () {
        document.getElementById('my_iframe').src = '/opscontrol/GetImbarqShortSalesExcel?IMBARQ_VALID=' + vm.filter.IMBARQ_VALID + '&IMBARQ_INDIC_SHORTSALES=' + vm.filter.IMBARQ_INDIC_SHORTSALES;
    }
});