app.controller('VolumnsController', function ($interval, $scope, $rootScope, $http, View) {
    var vc = this;
    vc.view = View;

    var date = new Date();
    date.setDate(1);
    var firstDay = date.toLocaleDateString("pt-BR");

    vc.filter = { CD_CLIENTE: null, BROKER_ID: null, FEE_MARKET_ID: null, VOLUMN_DATE_START: firstDay, VOLUMN_DATE_END: null, VOLUMN_CONSOLIDATES_CHECK: false };

    vc.update = function () {

        vc.filter.CD_CLIENTE = $('select[name="CD_CLIENTE"] option:selected').val();
        vc.filter.BROKER_ID = $('select[name="BROKER_ID"] option:selected').val();
        vc.filter.FEE_MARKET_ID = $('select[name="FEE_MARKET_ID"] option:selected').val();
        vc.filter.VOLUMN_DATE_START = $("#VOLUMN_DATE_START").val();
        vc.filter.VOLUMN_DATE_END = $("#VOLUMN_DATE_END").val();
        vc.filter.VOLUMN_CONSOLIDATES_CHECK = $('#VOLUMN_CONSOLIDATES_CHECK:checkbox:checked').length > 0;

        vc.view.idSearch_disable();


        vc.view.dtVolumn_update(vc.filter, function () {
            vc.view.idSearch_enable();

            var col = $("#dtVolumn th:nth-child(5), #dtVolumn td:nth-child(5)");
            if (vc.filter.VOLUMN_CONSOLIDATES_CHECK) {
                col.hide();
            }
            else {
                col.show();
            }
        });
    };

    vc.exportExcel = function () {
        document.getElementById('my_iframe').src = '/MarketData/GetVolumnFile?_IS_EXCEL=true' +
            '&_CD_CLIENTE=' + $('select[name="CD_CLIENTE"] option:selected').val() +
            '&_BROKER_ID=' + $('select[name="BROKER_ID"] option:selected').val() +
            '&_FEE_MARKET_ID=' + $('select[name="FEE_MARKET_ID"] option:selected').val() +
            '&_VOLUMN_DATE_START=' + $("#VOLUMN_DATE_START").val() +
            '&_VOLUMN_DATE_END=' + $("#VOLUMN_DATE_END").val() +
            '&_CONSOLIDATED=' + ($('#VOLUMN_CONSOLIDATES_CHECK:checkbox:checked').length > 0).toString();
    }

    vc.exportPdf = function () {
        document.getElementById('my_iframe').src = '/MarketData/GetVolumnFile?_IS_EXCEL=false' +
            '&_CD_CLIENTE=' + $('select[name="CD_CLIENTE"] option:selected').val() +
            '&_BROKER_ID=' + $('select[name="BROKER_ID"] option:selected').val() +
            '&_FEE_MARKET_ID=' + $('select[name="FEE_MARKET_ID"] option:selected').val() +
            '&_VOLUMN_DATE_START=' + $("#VOLUMN_DATE_START").val() +
            '&_VOLUMN_DATE_END=' + $("#VOLUMN_DATE_END").val() +
            '&_CONSOLIDATED=' + ($('#VOLUMN_CONSOLIDATES_CHECK:checkbox:checked').length > 0).toString();
    }
});