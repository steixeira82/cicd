app.controller('DashboardController', function ($interval, $scope, $rootScope, $http, View) {
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
        //vm.view.gProcesses_update();
        //vm.view.dtProcessExecution_update();
        vm.view.gMonitorClientFutures_update();
        vm.view.gMonitorClientEquities_update();
        vm.view.gMonitorBatch_update();
        //var items = [];
        //items.push({id: 1, content: '<img src="./Content/img/sinacor.png">', start: moment('2017-09-19 21:00:00') });
        //items.push({id: 2, content: 'Processo de fechamento do Sinacor', start: moment('2017-09-19 20:15:00'), end: moment('2017-09-19 21:00:00') });
        vm.view.tEstimated_update();
    };
    
    vm.tradesMonitor = function () {
        window.open("/home/tradesmonitor", "_blank", "location=0,left=100,height=450,width=800,menubar=0,status=0,titlebar=0,toolbar=0");
    }
    $interval(vm.update, 10000);

    vm.view = View;

});