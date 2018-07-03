app.controller('CarryingFeeController', function ($scope, $rootScope, $http, View) {
    var vm = this;
    vm.view = View;
    vm.filter = { DT_START: '', DT_END: '', CD_CLIENTE: '', FEE_TYPE: '' };
    var keyDelete = 0;

    vm.modify = function (key) {
        $('#gridEditModal').modal('toggle');
        $('#editForm').parsley().reset();

        $http.post("GetCarryingFeeByClient", key).then(function (response) {
            vm.editItem = response.data;
            vm.editItem.DATE_START = moment(response.data.DT_START).format('DD/MM/YYYY');
            vm.editItem.DATE_END = moment(response.data.DT_END).format('DD/MM/YYYY');
            numeral.locale('pt-br');
            vm.editItem.FACTOR = numeral(response.data.FACTOR).format('0.[000000000000]')
            vm.editItem.CD_CLIENTE = response.data.CD_CLIENTE;
            vm.editItem.FEE_TYPE = response.data.FEE_TYPE;
        });
    };

    vm.update = function () {
        vm.view.dtCarryingFeePolicies_update(vm.filter);
    };

    vm.new = function () {
        $('#gridEditModal').modal('toggle');
        $('#editForm').parsley().reset();
      
        vm.editItem = { DT_START: '', DT_END: '', CD_CLIENTE: '', FEE_TYPE: '' };
    }

    vm.remove = function (key) {
        $('#gridDeleteModal').modal('toggle');
        keyDelete = key;
    };

    vm.delete = function () {
        $http.post("DeleteCarryngFeePolicies", keyDelete).then(function (response) {
            keyDelete = 0;
            vm.view.view_success(response.data.message);
            vm.view.dtCarryingFeePolicies_update(vm.filter);
            $('#gridDeleteModal').modal('toggle');
        }, function (response) {
            vm.view.view_error(response.data.message);
        });
    };

    vm.save = function () {
        if ($('#editForm').parsley().validate()) {
            
        var startDate = $('#DATE_START')[0].value;
        var endDate = $('#DATE_END')[0].value;

        var startDateFormated = new Date();
        if (startDate.split("/").length >= 3){
            startDateFormated = new Date(startDate.split("/")[2], startDate.split("/")[1], startDate.split("/")[0]);
        }

        var endDateFormated = new Date();
        if (endDate.split("/").length >= 3){
            endDateFormated = new Date(endDate.split("/")[2], endDate.split("/")[1], endDate.split("/")[0]);
        }

        if (startDateFormated > endDateFormated) {
            vm.view.view_warning("The end value of the date is less than the start value");
            return;
        }

        vm.editItem.DT_START = startDate;
        vm.editItem.DT_END = endDate;
        vm.editItem.FACTOR = numeral(vm.editItem.FACTOR).value();
            
        $http.post("PostCarryingFee", vm.editItem).then(function (response) {
            if (response.status == "200") {
                vm.view.view_success(response.data.message);
                vm.view.dtCarryingFeePolicies_update();
                $('#gridEditModal').modal('toggle');
            }
            else
                vm.view.view_warning(response.data.message);
        }, function (response) {
            vm.view.view_error(response.data.message);
        });
    }
};
});
