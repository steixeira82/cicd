app.controller('PageController', function ($interval, $scope, $rootScope, $http, View) {
    var vm = this;

    vm.view = View;

    vm.infos = [];
    vm.editItem = { PROC_COMMENT: '' };
    
    vm.inform = function () {
        if ($('#informForm').parsley().validate()) {
            $('#gridInformModal').modal('toggle');
        }
    }

    vm.updateInfos = function (init) {
        $http.get("GetEODInfosView").then(function (response) {
            vm.infos = response.data;
        });
        if (init > 0)
        {
            vm.view.dtLastUpdates_update();
            vm.view.dtProcess_update();
        }
    }

    vm.close = function () {
        $http.post("PostEODInformClose", vm.editItem).then(function (response) {
            vm.editItem = { PROC_COMMENT: '' };
            $('#informForm').parsley().reset();
            vm.view.view_success(response.data.message);
            vm.view.dtLastUpdates_update();
            $('#gridInformModal').modal('toggle');
        }, function (response) {
            vm.view.view_error(response.data.message);
        });
    }
    vm.updateInfos(0);
    $interval(vm.updateInfos, 10000);
});