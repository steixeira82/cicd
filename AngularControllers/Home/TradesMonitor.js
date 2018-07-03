app.controller('TradesMonitorController', function ($interval, $scope, $rootScope, $http, View) {
    var vm = this;
    vm.refreshTime = "";

    var waitView = setInterval(function () {
        if (vm.view && vm.view.momentjsLongDateTimeFormat) {
            clearInterval(waitView);
            vm.update();
        }
    }, 100);

    vm.update = function () {
        vm.refreshTime = "Last Update: " + moment().format(vm.view.momentjsLongDateTimeFormat);
        vm.view.gtrades_update();
        vm.view.gProcesses_update();
        vm.view.dtProcessExecution_update();
    };
    
    $interval(vm.update, 10000);

    vm.view = View;

});