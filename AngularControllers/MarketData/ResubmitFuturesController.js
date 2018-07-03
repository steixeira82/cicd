app.controller('ResubmitFuturesController', function ($interval, $scope, $rootScope, $http, View) {
    var vc = this;
    vc.view = View;

    vc.filter = { TRANSACTIONDATE: moment().format('DD/MM/YYYY'), TRADE_FLAG_AFTER: 1 }

    vc.update = function () {
        vc.view.dtResubmit_update(vc.filter);
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

        $http.post("ResubmitTradesFutures", resubmitJson).then(function (response) {
            vc.view.view_success(response.data.message);
            var resubmitJson = { BVMFIDs: [''] };
            vc.view.dtSelectedResubmit_update(resubmitJson);
            vc.view.dtResubmit_selectedPreview = [];
            $('#confirmResubmit').modal('toggle');
            
        }, function (response) {
            vc.view.view_error(response.data.message);
        });
    };

    vc.select = function () {
        var resubmitJson = { BVMFIDs: [''] };
        for (var property in vc.view.dtResubmit_selectedPreview) {
            if (vc.view.dtResubmit_selectedPreview.hasOwnProperty(property)) {
                if (vc.view.dtResubmit_selectedPreview[property])
                    resubmitJson.BVMFIDs.push(property);
            }
        }
        vc.view.dtSelectedResubmit_update(resubmitJson);
    };

    vc.unselect = function (key) {
        for (var property in vc.view.dtResubmit_selectedPreview) {
            if (vc.view.dtResubmit_selectedPreview.hasOwnProperty(property)) {
                if (vc.view.dtResubmit_selectedPreview[property])
                    if (property == key.ROWID_NUM) {
                        vc.view.dtResubmit_selectedPreview[property] = false;
                    }
            }
        }
        vc.select();
    };
    
});