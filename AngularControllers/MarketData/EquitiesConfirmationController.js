app.controller('EquitiesConfirmationController', function ($interval, $scope, $rootScope, $http, View) {
    var vm = this;
    vm.view = View;

    vm.filter = { DT_PREGAO: moment(), STATUS: "" }
    vm.update = function () {
        vm.view.dtEquities_update(vm.filter);
    };


});