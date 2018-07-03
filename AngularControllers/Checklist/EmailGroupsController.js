app.controller('EmailGroupsController', function ($scope, $rootScope, $http, View) {
    var vm = this;
    vm.view = View;
   
    vm.emailItem = {};
   
    vm.modify = function (key) {
        $('#gridEditModal').draggable();
        $('#gridEditModal').modal('toggle');
        vm.view.EMAILS_update(key);
        $('#editForm').parsley().reset();
        $http.post("GetEmailGroupsById", key).then(function (response) { vm.editItem = response.data });
    };

    vm.remove = function (key) {
        $('#gridDeleteModal').modal('toggle');
        $http.post("GetEmailGroupsById", key).then(function (response) { vm.editItem = response.data });
    };

    vm.save = function () {
        if ($('#editForm').parsley().validate({ group: 'group' })) {
            $http.post("PostEmailGroups", { groupEmails: { group: vm.editItem, emails: vm.view.EMAILS_data } }).then(function (response) {
                vm.view.view_success(response.data.message);
                vm.view.dtEmailGroups_update();
                $('#gridEditModal').modal('toggle');
            }, function (response) {
                vm.view.view_error(response.data.message);
            });
        };
    };

    vm.new = function () {
        $('#gridEditModal').modal('toggle');
        $('#editForm').parsley().reset();
        vm.view.EMAILS_update({ GROUP_EMAIL_ID: 0 });
        vm.emailItem.email = "";
    }

    vm.delete = function () {
        $http.post("DeleteEmailsGroup", vm.editItem).then(function (response) {
            vm.view.view_success(response.data.message);
            vm.view.dtEmailGroups_update();
            $('#gridDeleteModal').modal('toggle');
        }, function (response) {
            vm.view.view_error(response.data.message);
        });
        
    };

    vm.addEmail = function () {
        if ($('#editForm').parsley().validate({group: 'addEmail'})) {
            vm.view.EMAILS_data.push({ label: vm.emailItem.email.toLowerCase(), value: vm.emailItem.email.toLowerCase() });
            vm.emailItem.email = "";
            $('#EMAIL').parsley().reset();

        }
    }
    
    vm.removeEmail = function () {
        for (var i = vm.view.EMAILS_data.length - 1; i >= 0; i--) {
            for (var j = 0; j < vm.editItem.EMAILS.length; j++) {
                if (vm.view.EMAILS_data[i].label == vm.editItem.EMAILS[j]) {
                    vm.view.EMAILS_data.splice(i, 1);
                    break;
                }
            }
        }
    }
});