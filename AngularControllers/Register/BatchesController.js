app.controller('BatchesController', function ($scope, $rootScope, $http, View) {
    var vm = this;
    vm.view = View;

    vm.modify = function (key) {
        $('#gridEditModal').modal('toggle');
        $('#editForm').parsley().reset();
        vm.view.CD_CLIENTE_update();
        vm.view.MARKET_ID_update();
        $http.post("GetBatchById", key).then(function (response) { vm.editItem = response.data }); 
    };

    vm.remove = function (key) {
        $('#gridDeleteModal').modal('toggle');
        $http.post("GetBatchById", key).then(function (response) { vm.editItem = response.data }); 
    };

    vm.save = function () {
        if ($('#editForm').parsley().validate()) {
            $http.post("PostBatch", vm.editItem).then(function (response) {
                vm.view.view_success(response.data.message);
                vm.view.dtBatch_update();
                $('#gridEditModal').modal('toggle');
            }, function (response) {
                vm.view.view_error(response.data.message);
            });
        }
    };

    vm.new = function () {
        $('#gridEditModal').modal('toggle');
        $('#editForm').parsley().reset();
        vm.editItem = { BATCH_EXCLUDED: false };
        vm.view.RULE_PARENT_ID_update();
    }

    vm.delete = function () {
        
        vm.editItem.BATCH_EXCLUDED = true;
        $http.post("PostBatch", vm.editItem).then(function (response) {
            vm.view.view_success(response.data.message);
            vm.view.dtBatch_update();
            $('#gridDeleteModal').modal('toggle');
        }, function (response) {
            vm.view.view_error(response.data.message);
        });
        
    };

});