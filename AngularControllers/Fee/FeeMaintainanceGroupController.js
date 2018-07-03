app.controller('FeeMaintainanceGroupController', function ($interval, $scope, $rootScope, $http, View) {
    var vc = this;
    vc.view = View;

    vc.filter = { DT_DATMOV: moment().format('DD/MM/YYYY'), DT_NEGOCIO: moment().format('DD/MM/YYYY'), CD_BROKER: '', CD_NEGOCIO: '', CD_CLIENTE: '', TIPO_MERC: '', VAL_CORR: '' };
    vc.filterQuery = { DT_DATMOVC: moment().format('DD/MM/YYYY'), DT_NEGOCIOC: moment().format('DD/MM/YYYY'), CD_BROKER: '' };

    vc.editItem = { ROW_ID: '', CD_CLIENTE: '', COD_PAR_NEG: '', TIPO_MERC: '', CD_NEGOCIO: '',  DT_DATMOV: moment().format('DD/MM/YYYY'), DT_NEGOCIO: moment().format('DD/MM/YYYY'), SUM_VAL_CORT_EXEC: '', VAL_CORR: ''  };
    
    vc.VAL_CORT_EXEC_SUM = 0;
    vc.VAL_CORR = 0;
    vc.DT_DATMOVC = '';
    vc.DT_NEGOCIOC = '';


    vc.update = function () {
        $http.post("GetTradesGroupSum2", vc.filter).then(function (response) {
            vc.VAL_CORT_EXEC_SUM = numeral(response.data).format('0,0.[000000000000]');
            vc.query();
            
        }, function (response) {
            vc.view.view_error(response.data.message);
        });
    };

    vc.query = function () {
        $http.post("GetTradesMaintainanceGroup", vc.filter).then(function (response) {
                vc.view.dtTrades_update(vc.filter);
            }, function (response) {
                vc.view.view_error(response.data.message);
            });
    };
    
    vc.focus = function myCtrl($scope) {
        $scope.selectAllContent = function ($event) {
            $event.target.select();
        };
    }


    vc.confirmLoading = function () {
        $('#confirmLoading').modal('toggle');
    };

    vc.confirmRecalc = function () {
        $('#confirmLoading').modal('toggle');
        vc.filter.VAL_CORR = vc.VAL_CORR;
        $http.post("PostProcessRecalcGroup", vc.filter).then(function (response) {
            $('#confirmLoading').modal('toggle');
            vc.view.view_success(response.data.message);
            //location.reload();
            vc.update();
            vc.filter.VAL_CORR = 0;
            vc.VAL_CORR = 0;

        }, function (response) {
            $('#confirmLoading').modal('toggle');
            vm.view.view_error(response.data.message);
        });
    };

});