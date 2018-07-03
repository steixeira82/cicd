app.controller('DropcopyController', function ($scope, $rootScope, $http, View) {
    var vm = this;
    vm.view = View;

    vm.modify = function (key) {
        $('#gridEditModal').modal('toggle');
        $('#editForm').parsley().reset();
        $http.post("GetDropcopyById", key).then(function (response) { vm.editItem = response.data });
    };

    vm.remove = function (key) {
        $('#gridDeleteModal').modal('toggle');
        $http.post("GetDropcopyById", key).then(function (response) { vm.editItem = response.data });
    };

    vm.save = function () {
        if ($('#editForm').parsley().validate()) {
            $http.post("PostDropcopy", vm.editItem).then(function (response) {
                vm.view.view_success(response.data.message);
                vm.view.dtDropcopy_update();
                $('#gridEditModal').modal('toggle');
            }, function (response) {
                vm.view.view_error(response.data.message);
            });
        }
    };

    vm.new = function () {
        $('#gridEditModal').modal('toggle');
        $('#editForm').parsley().reset();
        vm.editItem = { DC_TYPE: "", DC_EXCLUDED: false };
    }

    vm.delete = function () {
        
        vm.editItem.DC_EXCLUDED = true;
        $http.post("PostDropcopy", vm.editItem).then(function (response) {
            vm.view.view_success(response.data.message);
            vm.view.dtDropcopy_update();
            $('#gridDeleteModal').modal('toggle');
        }, function (response) {
            vm.view.view_error(response.data.message);
        });
        
    };

});