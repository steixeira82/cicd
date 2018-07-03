app.controller('ResubmitMICSController', function ($interval, $scope, $rootScope, $http, View) {
    var vc = this;
    vc.view = View;

    vc.filter = { DT_DATMOV: moment().format('DD/MM/YYYY'), DT_NEGOCIO: moment().format('DD/MM/YYYY'), FEE_CALCULATED: '' }

    vc.update = function () {
        vc.view.idSearch_disable();
        vc.view.dtResubmit_update(vc.filter, function () { vc.view.idSearch_enable(); });
    };

    vc.confirmResubmit = function () {
        $('#confirmResubmit').modal('toggle');
    };

    vc.resubmit = function () {
        var resubmitJson = { data: [] };

        for (var property in vc.view.dtResubmit_selectedPreview) {
            if (vc.view.dtResubmit_selectedPreview.hasOwnProperty(property)) {
                if (vc.view.dtResubmit_selectedPreview[property])
                resubmitJson.data.push(property);
            }
        }

        $http.post("ResubmitTrades", resubmitJson).then(function (response) {
            vc.view.view_success(response.data.message);
            $('#confirmResubmit').modal('toggle');
        }, function (response) {
            vc.view.view_error(response.data.message);
        });
    };

    vc.select = function () {
        var resubmitJson = { ROW_IDS: [''] };
        for (var property in vc.view.dtResubmit_selectedPreview) {
            if (vc.view.dtResubmit_selectedPreview.hasOwnProperty(property)) {
                if (vc.view.dtResubmit_selectedPreview[property])
                    resubmitJson.ROW_IDS.push(property);
            }
        }
        vc.view.dtSelectedResubmit_update(resubmitJson);
    };

    vc.unselect = function (key) {
        for (var property in vc.view.dtResubmit_selectedPreview) {
            if (vc.view.dtResubmit_selectedPreview.hasOwnProperty(property)) {
                if (vc.view.dtResubmit_selectedPreview[property])
                    if (property == key.ROW_ID) {
                        vc.view.dtResubmit_selectedPreview[property] = false;
                    }
            }
        }
        vc.select();
    };
    
});