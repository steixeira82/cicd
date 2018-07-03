app.controller('RulesController', function ($scope, $rootScope, $http, View) {
    var vm = this;
    vm.view = View;

    vm.modify = function (key) {
        $('#gridEditModal').modal('toggle');
        $('#editForm').parsley().reset();
        vm.view.RULE_PARENT_ID_update();
        $http.post("GetRuleById", key).then(function (response) { vm.editItem = response.data }); // jQuery.extend({}, item); // Cloning object
    };

    vm.remove = function (key) {
        $('#gridDeleteModal').modal('toggle');
        $http.post("GetRuleById", key).then(function (response) { vm.editItem = response.data }); //jQuery.extend({}, item); // Cloning object
    };

    vm.save = function () {
        if ($('#editForm').parsley().validate()) {
            $http.post("PostRules", vm.editItem).then(function (response) {
                vm.view.view_success(response.data.message);
                vm.view.dtAuthorization_update();
                $('#gridEditModal').modal('toggle');
            }, function (response) {
                vm.view.view_error(response.data.message);
            });
        }
    };

    vm.new = function () {
        $('#gridEditModal').modal('toggle');
        $('#editForm').parsley().reset();
        vm.editItem = { RULE_EXCLUDED: false };
        vm.view.RULE_PARENT_ID_update();
    }

    vm.delete = function () {
        
        vm.editItem.RULE_EXCLUDED = true;
        $http.post("PostRules", vm.editItem).then(function (response) {
            vm.view.view_success(response.data.message);
            vm.view.dtAuthorization_update();
            $('#gridDeleteModal').modal('toggle');
        }, function (response) {
            vm.view.view_error(response.data.message);
        });
        
    };

});