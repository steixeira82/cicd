app.controller('FuturesConfirmationController', function ($interval, $scope, $rootScope, $http, View) {
    var vm = this;
    vm.view = View;
    vm.filter = { TRANSACTIONDATE: moment(), STATUS: "" }
    vm.update = function () {
        vm.view.dtFutures_update(vm.filter);
    };


    

});