app.controller('BrokerFeeController', function ($scope, $rootScope, $http, View) {
    var vm = this;
    vm.view = View;
    vm.filter = { FEE_ID: '', FEE_DT_START: '', FEE_DT_END: '', CD_CLIENTE: '', CD_NEGOCIO: '', FEE_MARKET_ID: '', CHANNEL_ID: '', FEE_CALC_ID: '', BROKER_ID: '', FEE_VL_FACTOR: '', FEE_DC_POINTS: '', FEE_STATUS: true, FEE_FLOW_ID: '', FEE_INITIAL_VOLUMN: '', FEE_FINAL_VOLUMN: '' };

    vm.changeFeeFlowType = function ()
    {
        //Validation client for cascade
        FeeVolumnVisibility();
    }

    vm.modify = function (key) {
        
        $('#gridEditModal').modal('toggle');
        $('#editForm').parsley().reset();
        
        $http.post("GetBrokerFeeById", key).then(function (response) {

            vm.editItem = response.data;
            
            vm.editItem.FEE_DT_START = moment(response.data.FEE_DT_START).format('DD/MM/YYYY');
            vm.editItem.FEE_DT_END = moment(response.data.FEE_DT_END).format('DD/MM/YYYY');
            numeral.locale('pt-br');
            vm.editItem.FEE_VL_FACTOR = numeral(vm.editItem.FEE_VL_FACTOR).format('0.[000000000000]');
            vm.editItem.FEE_FINAL_VOLUMN = numeral(vm.editItem.FEE_FINAL_VOLUMN).format('0.[000000000000]');
            vm.editItem.FEE_INITIAL_VOLUMN = numeral(vm.editItem.FEE_INITIAL_VOLUMN).format('0.[000000000000]');

            FeeVolumnVisibility(response.data.FEE_FLOW_ID);
        });
    };

    vm.save = function () {
        if ($('#editForm').parsley().validate()) {
            FeeVolumnVisibility();
            numeral.locale('pt-br');
            
            //Validation client for cascade
            if (vm.editItem.FEE_FLOW_ID == "2")//Cascade flow type
            {
                if (vm.editItem.FEE_INITIAL_VOLUMN == null || vm.editItem.FEE_FINAL_VOLUMN == null)
                {
                    vm.view.view_warning("Set the initial and final volume");
                    return;
                }

                var strFEE_FINAL_VOLUMN = vm.editItem.FEE_FINAL_VOLUMN.toString().replace(/\./g, '');
                var lenghtFinalVolumn = strFEE_FINAL_VOLUMN.length;
                if (strFEE_FINAL_VOLUMN.indexOf(",") > -1)
                {
                    lenghtFinalVolumn = lenghtFinalVolumn - 3;
                }
                var strFEE_START_VOLUMN = vm.editItem.FEE_INITIAL_VOLUMN.toString().replace(/\./g, '');
                var lenghtInitialVolumn = strFEE_START_VOLUMN.length;
                if (strFEE_START_VOLUMN.indexOf(",") > -1) {
                    lenghtInitialVolumn = lenghtInitialVolumn - 3;
                }
                if (lenghtFinalVolumn > 13 || lenghtInitialVolumn > 13) {
                    vm.view.view_warning("The value of the volume is too large. The maximum value should be R$ 9.999.999.999.999,99");
                    return;
                }

                vm.editItem.FEE_FINAL_VOLUMN = numeral(vm.editItem.FEE_FINAL_VOLUMN).value();
                vm.editItem.FEE_INITIAL_VOLUMN = numeral(vm.editItem.FEE_INITIAL_VOLUMN).value();
            }

            vm.editItem.CHANNEL_ID = $('#CHANNEL_ID')[0].value;
            vm.editItem.CD_NEGOCIO = $('#CD_NEGOCIO')[0].value;
            vm.editItem.FEE_CALC_ID = $('#FEE_CALC_ID')[0].value;
            vm.editItem.FEE_VL_FACTOR = numeral(vm.editItem.FEE_VL_FACTOR).value();
            
            vm.editItem.FEE_DT_START = $('#FEE_DT_START')[0].value;
            vm.editItem.FEE_DT_END = $('#FEE_DT_END')[0].value;
            $http.post("PostBrokerFee", vm.editItem).then(function (response) {
                if (response.status == "200") {

                    if (response.data.brokenRules == '')
                    {
                        vm.view.view_success(response.data.message);
                        vm.view.dtBrokerFee_update(vm.filter);
                        $('#gridEditModal').modal('toggle');
                    }
                    else
                    {
                        vm.view.view_warning(response.data.brokenRules);
                    }
                }
                else
                    vm.view.view_warning(response.data.message);
            }, function (response) {
                vm.view.view_error(response.data.message);
            });
        }
    };

    vm.update = function () {
        FeeVolumnVisibility();

        vm.filter.FEE_VL_FACTOR = numeral(vm.filter.FEE_VL_FACTOR).value();
        vm.view.dtBrokerFee_update(vm.filter);
    };

    vm.new = function () {
        $('#gridEditModal').modal('toggle');
        $('#editForm').parsley().reset();
        
        FeeVolumnVisibility(0);

        vm.editItem = { FEE_ID: '', FEE_DT_START: '', FEE_DT_END: '', CD_CLIENTE: '', CD_NEGOCIO: '', FEE_MARKET_ID: '', CHANNEL_ID: '', FEE_CALC_ID: '', BROKER_ID: '', FEE_VL_FACTOR: '', FEE_DC_POINTS: '', FEE_STATUS: true, FEE_FLOW_ID: '', FEE_INITIAL_VOLUMN: '', FEE_FINAL_VOLUMN: '' };
    }

    function FeeVolumnVisibility(feeId)
    {
        //Validation client for cascade
        var isCascade = false;

        if (feeId == null)
        {
            isCascade = $("#FEE_FLOW_ID").val() == 2;
        }
        else if (feeId == 2)
        {
            isCascade = true;
        }
        
        var feeInitialVolumnCtl = $("#FEE_INITIAL_VOLUMN")[0];
        var feeFinalVolumnCtl = $("#FEE_FINAL_VOLUMN")[0];
        var symbolCtl = $('#CD_NEGOCIO')[0];
        var feeTypeCtl = $('#FEE_CALC_ID')[0];
        
        if (isCascade)
        {
            //reset a values
            $('select#CD_NEGOCIO').val(''); //Always null
            $('select#FEE_CALC_ID').val('2'); //Always percentual (index 2)
        }

        feeFinalVolumnCtl.disabled = feeInitialVolumnCtl.disabled = !isCascade;
        feeTypeCtl.disabled = symbolCtl.disabled = isCascade;

        $('#CHANNEL_ID').prop('required', !isCascade);
    }

});
