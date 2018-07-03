app.controller('CMSController', function ($interval, $scope, $rootScope, $http, View) {
    var vm = this;
    vm.view = View;

    vm.refreshTime = "";

    var waitView = setInterval(function () {
        if (vm.view && vm.view.momentjsLongDateTimeFormat) {
            clearInterval(waitView);
            vm.refreshTime = "Last Update: " + moment().format(vm.view.momentjsLongDateTimeFormat);
        }
    }, 100);

    $interval(vm.update, 60000);

    vm.filter = { dat_integracao: moment().format('DD/MM/YYYY') }
    vm.update = function () {
        vm.refreshTime = "Last Update: " + moment().format(vm.view.momentjsLongDateTimeFormat);
        if (typeof vm.filter.dat_integracao == "object")
            vm.view.dtCMS_update({ dat_integracao: vm.filter.dat_integracao.format('DD/MM/YYYY') });
        else
            vm.view.dtCMS_update(vm.filter);
    };

});