app.controller('GiveUpController', function ($interval, $scope, $rootScope, $http, View) {
    var vm = this;
    vm.view = View;
    vm.filter = { DATA_PREG: moment().format('DD/MM/YYYY'), COD_SITU_ALOC: '' }
    vm.update = function () {
        if (typeof vm.filter.DATA_PREG == "object")
            vm.view.dtGiveUp_update({ DATA_PREG: vm.filter.DATA_PREG.format('DD/MM/YYYY'), COD_SITU_ALOC: vm.filter.COD_SITU_ALOC });
        else
            vm.view.dtGiveUp_update(vm.filter);
    };

});