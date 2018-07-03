app.controller('FeeMaintainanceController', function ($interval, $scope, $rootScope, $http, View) {
    var vc = this;
    vc.view = View;

    vc.filter = { DT_DATMOV: moment().format('DD/MM/YYYY'), DT_NEGOCIO: moment().format('DD/MM/YYYY'), CD_BROKER: '' };
    vc.editItem = { ROW_ID: '', VAL_CORT_EXEC: '' };
    
    vc.VAL_CORT_EXEC_SUM = 0;
    vc.update = function () {
        vc.view.dtTrades_update(vc.filter);
        vc.view.idUpdate_disable();
        
        $http.post("GetTradesSum", vc.filter).then(function (response) {

            vc.VAL_CORT_EXEC_SUM = numeral(response.data).format('0,0.[000000000000]');
            vc.view.idUpdate_enable();
            
        }, function (response) {
            vc.view.view_error(response.data.message);
            vc.view.idUpdate_enable();
        });
    };
    
    vc.modify = function (key) {
        $('#gridEditFee').modal('toggle');
        $('#editForm').parsley().reset();
        vc.editItem.ROW_ID = key.ROW_ID;
        vc.editItem.VAL_CORT_EXEC = numeral(key.VAL_CORT_EXEC).format('0.[000000000000]')
    };

    vc.focus = function myCtrl($scope) {
        $scope.selectAllContent = function ($event) {
            $event.target.select();
        };
    }

    vc.save = function () {
        if ($('#editForm').parsley().validate()) {
            vc.editItem.VAL_CORT_EXEC = numeral(vc.editItem.VAL_CORT_EXEC).value();
            vc.editItem.DT_DATMOV = $('#DT_DATMOV')[0].value;
            vc.editItem.DT_NEGOCIO = $('#DT_NEGOCIO')[0].value;
            $http.post("PostBrokerFeeAdjust", { ROW_ID: vc.editItem.ROW_ID, VAL_CORT_EXEC: vc.editItem.VAL_CORT_EXEC, DT_DATMOV: vc.editItem.DT_DATMOV, DT_NEGOCIO: vc.editItem.DT_NEGOCIO }).then(function (response) {
                vc.view.view_success(response.data.message);
                vc.view.dtTrades_update(vc.filter);
                $http.post("GetTradesSum", vc.filter).then(function (response) {
                    vc.VAL_CORT_EXEC_SUM = numeral(response.data).format('0,0.[000000000000]');
                }, function (response) {
                    vc.view.view_error(response.data.message);
                });
                $('#gridEditFee').modal('toggle');
            }, function (response) {
                vc.view.view_error(response.data.message);
            });
            
        }
    };

    vc.confirmRecalc = function () {
        $('#confirmRecalc').modal('toggle');
    };

    vc.recalculate = function () {
        vc.view.idRecalc_disable();
        $http.post("PostProcessRecalc", { DT_DATMOV: $('#DT_DATMOV')[0].value, DT_NEGOCIO: $('#DT_NEGOCIO')[0].value }).then(function (response) {
            vc.view.view_success(response.data.message);
            vc.view.dtTrades_update(vc.filter);
            $('#confirmRecalc').modal('toggle');
            vc.view.idRecalc_enable();
            
        }, function (response) {
            vm.view.view_error(response.data.message);
            vc.view.idRecalc_enable();
        });
    };
});