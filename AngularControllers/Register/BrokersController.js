app.controller('BrokersController', function ($scope, $rootScope, $http, View) {
    var vm = this;
    vm.view = View;

    vm.modify = function (key) {
        $('#gridEditModal').modal('toggle');
        $('#editForm').parsley().reset();
        $http.post("GetBrokerById", key).then(function (response) { vm.editItem = response.data });
    };


    vm.save = function () {
        if ($('#editForm').parsley().validate()) {
            $http.post("PostBroker", vm.editItem).then(function (response) {
                vm.view.view_success(response.data.message);
                vm.view.dtBrokers_update();
                $('#gridEditModal').modal('toggle');
            }, function (response) {
                vm.view.view_error(response.data.message);
            });
        }
    };

});