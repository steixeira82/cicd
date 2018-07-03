app.controller('GroupsController', function ($scope, $rootScope, $http, View) {
    var vm = this;
    vm.view = View;
   
    vm.userItem = {};
   
    vm.modify = function (key) {
        $('#gridEditModal').draggable();
        $('#gridEditModal').modal('toggle');
        vm.view.GROUP_RULE_update(key);
        vm.view.USERS_update(key);
        $('#editForm').parsley().reset();
        $http.post("GetGroupById", key).then(function (response) { vm.editItem = response.data }); 
    };

    vm.remove = function (key) {
        $('#gridDeleteModal').modal('toggle');
        $http.post("GetGroupById", key).then(function (response) { vm.editItem = response.data }); 
    };

    vm.save = function () {
        var rules = { checked: vm.view.GROUP_RULE_getChecked(), unchecked: vm.view.GROUP_RULE_getUnchecked() };
        
        if ($('#editForm').parsley().validate({ group: 'group' })) {
            $http.post("PostGroupRules", { groupRulesUsers: { group: vm.editItem, rules: rules, users: vm.view.USERS_data } }).then(function (response) {
                vm.view.view_success(response.data.message);
                vm.view.dtAuthorization_update();
                $('#gridEditModal').modal('toggle');
            }, function (response) {
                vm.view.view_error(response.data.message);
            });
        };
    };

    vm.new = function () {
        $('#gridEditModal').modal('toggle');
        $('#editForm').parsley().reset();
        vm.view.GROUP_RULE_update({ GROUP_ID: 0 });
        vm.view.USERS_update({ GROUP_ID: 0 });
        vm.editItem = { GROUP_EXCLUDED: false };
        vm.userItem.user = "";
    }

    vm.delete = function () {
        vm.editItem.GROUP_EXCLUDED = true;
        $http.post("PostGroups", vm.editItem).then(function (response) {
            vm.view.view_success(response.data.message);
            vm.view.dtAuthorization_update();
            $('#gridDeleteModal').modal('toggle');
        }, function (response) {
            vm.view.view_error(response.data.message);
        });
        
    };

    vm.addUser = function () {
        if ($('#editForm').parsley().validate({group: 'addUser'})) {
            vm.view.USERS_data.push({ label: vm.userItem.user.toLowerCase(), value: vm.userItem.user.toLowerCase() });
            vm.userItem.user = "";
            $('#USER').parsley().reset();

        }
    }
    
    vm.removeUser = function () {
        for (var i = vm.view.USERS_data.length - 1; i >= 0; i--) {
            for (var j = 0; j < vm.editItem.USERS.length; j++) {
                if (vm.view.USERS_data[i].label == vm.editItem.USERS[j]) {
                    vm.view.USERS_data.splice(i, 1);
                    break;
                }
            }
        }
    }
});