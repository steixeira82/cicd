app.controller('PageController', function ($scope, $rootScope, $http, View) {
    var vm = this;
    vm.view = View;
    vm.processItemVisible = false;
    vm.executeProcessItem = { FIN_RESUB_DT: moment().format('DD/MM/YYYY') }


    vm.confirmExecuteResub = function (key) {
        $('#confirmFinanceResubForm').parsley().reset();
        $http.post("GetFinanceResubById", key).then(function (response) {
            if (response.data) {
                vm.processItem = response.data;
                var disabled = false;
                $("#FIN_RESUB_DT")[0].disabled = disabled;
                vm.executeProcessItem.FIN_RESUB_DT = moment().format('DD/MM/YYYY');
            }
        });
        $('#confirmExecFinancResubProcess').modal('toggle');
    };

    vm.executeProcess = function () {
        if ($('#confirmFinanceResubForm').parsley().validate()) {
            $http.post("ExecuteFinResubmit", { FIN_RESUB_ID: vm.processItem.FIN_RESUB_ID, FIN_RESUB_DT: $("#FIN_RESUB_DT")[0].value }).then(function (response) {
                vm.view.view_success(response.data.message);
                vm.view.dtProcesses_update();
                vm.processItemVisible = false;
                $('#confirmExecFinancResubProcess').modal('toggle');

            }, function (response) {
                vm.view.view_error(response.data.message);
            });
        }
    }

});