app.controller('FuturesMICSController', function ($interval, $scope, $rootScope, $http, View) {
    var vc = this;
    vc.view = View;
    vc.filter = { TRANSACTIONDATE: moment().format('DD/MM/YYYY'), STATUS: "", TYPE: 1 }
    vc.update = function () {
        vc.view.dtFutures_update(vc.filter);
    };

    vc.confirmTradeout = function () {
        $('#confirmTradeout').modal('toggle');
    };

    vc.tradeout = function () {
        var resubmitJson = { data: [] };

        for (var property in vc.view.dtFutures_selectedPreview) {
            if (vc.view.dtFutures_selectedPreview.hasOwnProperty(property)) {
                if (vc.view.dtFutures_selectedPreview[property])
                    resubmitJson.data.push(property);
            }
        }

        $http.post("FuturesTradeOutTrades", resubmitJson).then(function (response) {
            vc.view.view_success(response.data.message);
            $('#confirmTradeout').modal('toggle');
        }, function (response) {
            vc.view.view_error(response.data.message);
        });
    };

    vc.select = function () {
        var resubmitJson = { BVMFIDS: [''] };
        for (var property in vc.view.dtFutures_selectedPreview) {
            if (vc.view.dtFutures_selectedPreview.hasOwnProperty(property)) {
                if (vc.view.dtFutures_selectedPreview[property])
                    resubmitJson.BVMFIDS.push(property);
            }
        }
        vc.view.dtSelectedTradeout_update(resubmitJson);
    };

    vc.unselect = function (key) {
        for (var property in vc.view.dtFutures_selectedPreview) {
            if (vc.view.dtFutures_selectedPreview.hasOwnProperty(property)) {
                if (vc.view.dtFutures_selectedPreview[property])
                    if (property == key.BVMFID) {
                        vc.view.dtFutures_selectedPreview[property] = false;
                    }
            }
        }
        vc.select();
    };
    

});