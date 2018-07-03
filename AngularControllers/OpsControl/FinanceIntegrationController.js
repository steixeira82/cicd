app.controller('FinanceIntegrationController', function ($interval, $scope, $rootScope, $http, View) {
    var vm = this;
    vm.view = View;
    vm.filter = { FINANCE_DT_LANC: moment().format('DD/MM/YYYY'), FINANCE_TYPE: '', FINANCE_SYS: '' }
    vm.update = function () {
        vm.view.dtFinance_update(vm.filter);
    };


    

});