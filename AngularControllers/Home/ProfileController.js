app.controller('ProfileController', function ($scope, $rootScope, $http, View) {
    var vm = this;
    vm.view = View;
    
    $('#editForm').parsley().reset();

    $(document).ready(function () {
        $http.get("GetCurrentUser").then(function (response) {
            vm.editItem = response.data;
            vm.view.USER_PHOTO_setImage(vm.editItem.USER_PHOTO_TYPE, vm.editItem.USER_PHOTO);
        });
    });
    
    vm.save = function () {
        if ($('#editForm').parsley().validate()) {
            vm.view.USER_PHOTO_uploadFile(vm.editItem.USER_LOGIN, vm.editItem.USER_PHOTO, function (response) {
                vm.view.USER_PHOTO_update();
            });
            vm.editItem.USER_PHOTO = null;
            $http.post("PostUser", vm.editItem).then(function (response) {
                vm.view.view_success(response.data.message);
            }, function (response) {
                vm.view.view_error(response.data.message);
            });
        }
    };

});