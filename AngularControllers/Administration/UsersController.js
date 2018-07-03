app.controller('UsersController', function ($scope, $rootScope, $http, View) {
    var vm = this;
    vm.view = View;

    vm.modify = function (key) {
        $('#gridEditModal').modal('toggle');
        $('#editForm').parsley().reset();
        
        $http.post("GetUserByLogin", key).then(function (response) {
            vm.editItem = response.data;
            vm.view.USER_PHOTO_setImage(vm.editItem.USER_PHOTO_TYPE, vm.editItem.USER_PHOTO);
        }); 
    };

    vm.remove = function (key) {
        $('#gridDeleteModal').modal('toggle');
        $http.post("GetUserByLogin", key).then(function (response) { vm.editItem = response.data }); //jQuery.extend({}, item); // Cloning object
    };

    vm.save = function () {
        if ($('#editForm').parsley().validate()) {
            vm.view.USER_PHOTO_uploadFile(vm.editItem.USER_LOGIN, vm.editItem.USER_PHOTO, function (response) {
                vm.view.USER_PHOTO_update();
            });
            vm.editItem.USER_PHOTO = null;
            $http.post("PostUser", vm.editItem).then(function (response) {
                vm.view.view_success(response.data.message);
                vm.view.dtUsers_update();
                $('#gridEditModal').modal('toggle');
            }, function (response) {
                vm.view.view_error(response.data.message);
            });
        }
    };

    vm.delete = function () {
        
        vm.editItem.RULE_EXCLUDED = true;
        $http.post("PostUsers", vm.editItem).then(function (response) {
            vm.view.view_success(response.data.message);
            vm.view.dtUsers_update();
            $('#gridDeleteModal').modal('toggle');
        }, function (response) {
            vm.view.view_error(response.data.message);
        });
        
    };

});