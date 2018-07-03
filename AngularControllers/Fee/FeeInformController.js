app.controller('PageController', function ($interval, $scope, $rootScope, $http, View) {
    var vm = this;

    vm.view = View;

    vm.filter = { DT_TRADE: '', DT_SETTLE: moment().format('DD/MM/YYYY'), CD_CLIENTE: '', TYPE: '' };

    vm.update = function () {
        vm.view.btnSearch_disable();
        vm.view.dtFeeInform_update(vm.filter, function () { vm.view.btnSearch_enable(); });
    }

    vm.exportExcel = function () {
        document.getElementById('my_iframe').src = '/fee/GetFeeInformViewExcel?DT_TRADE=' + (vm.filter.DT_TRADE != '' ? moment(vm.filter.DT_TRADE, 'DD/MM/YYYY').format('YYYYMMDD') : '') + '&DT_SETTLE=' + (vm.filter.DT_SETTLE != '' ? moment(vm.filter.DT_SETTLE, 'DD/MM/YYYY').format('YYYYMMDD') : '') + '&CD_CLIENTE=' + vm.filter.CD_CLIENTE + '&TYPE=' + vm.filter.TYPE;
    }

    vm.exportPdf = function () {
        document.getElementById('my_iframe').src = '/fee/GetFeeInformViewPdf?DT_TRADE=' + (vm.filter.DT_TRADE != '' ? moment(vm.filter.DT_TRADE, 'DD/MM/YYYY').format('YYYYMMDD') : '') + '&DT_SETTLE=' + (vm.filter.DT_SETTLE != '' ? moment(vm.filter.DT_SETTLE, 'DD/MM/YYYY').format('YYYYMMDD') : '') + '&CD_CLIENTE=' + vm.filter.CD_CLIENTE + '&TYPE=' + vm.filter.TYPE;
    }
});