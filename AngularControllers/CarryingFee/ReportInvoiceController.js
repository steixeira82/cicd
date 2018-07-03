app.controller('ReportInvoiceController', function ($scope, $rootScope, $http, View) {
    var vm = this;
    vm.view = View;

    var date = new Date();
    var actualDay = date.toLocaleDateString("pt-BR");
    date.setDate(1);
    var firstDay = date.toLocaleDateString("pt-BR");

    vm.filter = { DT_START: firstDay, DT_END: actualDay, CD_CLIENTE: '' };

    vm.update = function () {

        var cdCliente = $("#CD_CLIENTE").val();
        if (cdCliente == null || cdCliente == '')
        {
            vm.view.view_warning("Client is required");
            return;
        }

        vm.view.dtCarryingReportInvoice_update(vm.filter);
    };

    vm.exportPdf = function () {

        var cdCliente = $("#CD_CLIENTE").val();
        if (cdCliente == null || cdCliente == '') {
            vm.view.view_warning("Client is required");
            return;
        }

        document.getElementById('my_iframe').src = '/CarryingFee/GetReportInvoicePDF?' +
            '_CD_CLIENTE=' + $('select[name="CD_CLIENTE"] option:selected').val() +
            '&_DATE_START=' + $("#DT_START").val() +
            '&_DATE_END=' + $("#DT_END").val();
    };

});
