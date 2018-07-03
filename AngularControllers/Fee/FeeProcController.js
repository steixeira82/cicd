app.controller('PageController', function ($interval, $scope, $rootScope, $http, View) {
    var vm = this;

    vm.view = View;

    vm.calc = { P_DT_TRADE: '', P_DT_MOV: '', P_CD_CLIENTE: '', P_CD_BROKER: '', P_FLAG_AMEND: false };

    vm.update = function() {
        vm.view.dtRecentUpdates_update();
    }

    vm.disclaimer = function () {
        if ($('#procForm').parsley().validate()) {
            $('#gridInformModal').modal('toggle');
        }
    }

    vm.detail = function (key) {
        vm.view.dtExecutionDetails_update(key);
    }

    vm.calculate = function () {
        $http.post("PostProcessCalc", vm.calc).then(function (response) {
            vm.calc = { P_DT_TRADE: '', P_DT_MOV: '', P_CD_CLIENTE: '', P_CD_BROKER: '', P_FLAG_AMEND: false };
            $('#procForm').parsley().reset();
            vm.view.view_success(response.data.message);
            vm.view.dtRecentUpdates_update();
            $('#gridInformModal').modal('toggle');
        }, function (response) {
            vm.view.view_error(response.data.message);
        });
    }

    $interval(vm.update, 10000);
});