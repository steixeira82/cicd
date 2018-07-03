app.controller('OnlinePositionsController', function ($interval, $scope, $rootScope, $http, View) {
    var vm = this;
    vm.refreshTime = "";

    var waitView = setInterval(function () {
        if (vm.view && vm.view.momentjsLongDateTimeFormat) {
            clearInterval(waitView);
            vm.update();
        }
    }, 100);

    vm.update = function () {
        //vm.refreshTime = "Last Update: " + moment().format(vm.view.momentjsLongDateTimeFormat);
        vm.view.dtPositions_update();
    };

    vm.refreshData = function () {
        vm.view.btnRefresh_disable();
        $http.get("CopyPositionFuturesView").then(function (response) {
            vm.view.btnRefresh_enable();
            vm.update();
        }, function (response) {
            vm.view.btnRefresh_enable();
            vm.view.view_error(response.data.message);
        });
    };

    
    $interval(vm.update, 60000);

    vm.view = View;

    

});