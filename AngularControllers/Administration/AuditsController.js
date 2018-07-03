app.controller('PageController', function ($scope, $rootScope, $http, View) {
    var vm = this;
    vm.view = View;

    vm.details = function (key) {
        $('#gridEditModal').modal('toggle');
        $http.post("GetAuditById", key).then(function (response) { vm.editItem = response.data });
    };

    vm.update = function () {
        vm.view.dtAuthorization_update();
    }

});