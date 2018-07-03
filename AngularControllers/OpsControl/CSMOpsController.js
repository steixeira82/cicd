app.controller('PageController', function ($interval, $scope, $rootScope, $http, View) {
    var vm = this;

    vm.view = View;

    vm.editItem = { MARKET_ID: '' };
    
    vm.inform = function () {
        if ($('#informForm').parsley().validate()) {
            $('#gridInformModal').modal('toggle');
        }
    }

    vm.close = function () {
        $http.post("PostInformClose", vm.editItem).then(function (response) {
            vm.editItem = { MARKET_ID: '' };
            $('#informForm').parsley().reset();
            vm.view.view_success(response.data.message);
            vm.view.dtLastUpdates_update();
            $('#gridInformModal').modal('toggle');
        }, function (response) {
            vm.view.view_error(response.data.message);
        });
    }
});