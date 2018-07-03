app.controller('MatchingController', function ($interval, $scope, $rootScope, $http, View) {
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

    vm.filter = { MATCHING_DT_TRADE: moment().format('DD/MM/YYYY'), MATCH: '' }
    vm.update = function () {
        vm.refreshTime = "Last Update: " + moment().format(vm.view.momentjsLongDateTimeFormat);
        if (typeof vm.filter.MATCHING_DT_TRADE == "object")
            vm.view.dtMatching_update({ MATCHING_DT_TRADE: vm.filter.MATCHING_DT_TRADE.format('DD/MM/YYYY'), MATCH: vm.filter.MATCH });
        else
            vm.view.dtMatching_update(vm.filter);
    };

});