app.controller('PricesEquitiesController', function ($interval, $scope, $rootScope, $http, View) {
    var vc = this;
    vc.view = View;

    //Set current date by default
    $("#DATE").attr('value', new Date().toLocaleDateString("pt-BR"));

    vc.filter = { DATE: new Date().toLocaleDateString("pt-BR"), STATUS: null, PROCESSEDFLAG: null };

    vc.update = function () {
        vc.filter = { DATE: $("#DATE").val(), STATUS: $("#STATUS").val(), PROCESSEDFLAG: $("#PROCESSEDFLAG").val()};
        
        if (vc.filter.DATE == "") {
            vc.filter = { DATE: new Date().toLocaleDateString("pt-BR"), STATUS: $("#STATUS").val(), PROCESSEDFLAG: $("#PROCESSEDFLAG").val() };
        }

        vc.view.dtProcesEquities_update(vc.filter);
    };
});