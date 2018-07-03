app.controller('FeeChangeNotaController', function ($scope, $rootScope, $http, View) {
    var vm = this;
    vm.view = View;
    vm.filter = { DT_DATMOV: moment().format('DD/MM/YYYY') , DT_NEGOCIO: moment().format('DD/MM/YYYY')};

    vm.modify = function (key) {
        $('#gridEditModal').modal('toggle');
        $('#editForm').parsley().reset();
        $http.post("GetNotaFeeById", key).then(function (response) {
            vm.editItem = response.data;
            vm.editItem.NR_NOTA = response.data.NR_NOTA;
            vm.editItem.VAL_CORT_EXEC = numeral(vm.editItem.VAL_CORT_EXEC).format('0.[000000000000]');
            numeral.locale('pt-br');
        });
    };

    vm.save = function () {
        if ($('#editForm').parsley().validate()) {
            vm.editItem.VAL_CORT_EXEC = numeral(vm.editItem.VAL_CORT_EXEC).value();
            vm.editItem.DT_DATMOV = $('#DT_DATMOV')[0].value;
            vm.editItem.DT_NEGOCIO = $('#DT_NEGOCIO')[0].value;
            $http.post("PostFeeChangeNota", vm.editItem).then(function (response) {
                if (response.status == "200") {
                    vm.view.view_success(response.data.message);
                    vm.update();
                    $('#gridEditModal').modal('toggle');
                }
                else
                    vm.view.view_warning(response.data.message);
            }, function (response) {
                vm.view.view_error(response.data.message);
            });
        }
    };

    vm.update = function () {
        $http.post("GetNotaFeeView", vm.filter).then(function (response) {
            vm.view.dtChangeNota_update(vm.filter);
            
        }, function (response) {
            vm.view.view_error(response.data.message);
        });
    };


});