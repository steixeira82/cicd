app.controller('EquitiesMICSController', function ($interval, $scope, $rootScope, $http, View) {
    var vc = this;
    vc.view = View;

    vc.filter = { DT_PREGAO: moment().format('DD/MM/YYYY'), DT_LASTSENT: '', STATUS: "", TYPE: 1 }

    vc.update = function () {
        vc.view.dtEquities_update(vc.filter);
    };

    vc.confirmTradeout = function () {
        $('#confirmTradeout').modal('toggle');
    };

    vc.tradeout = function () {
        var resubmitJson = { data: [] };

        for (var property in vc.view.dtEquities_selectedPreview) {
            if (vc.view.dtEquities_selectedPreview.hasOwnProperty(property)) {
                if (vc.view.dtEquities_selectedPreview[property])
                    resubmitJson.data.push(property);
            }
        }

        $http.post("EquitiesTradeOutTrades", resubmitJson).then(function (response) {
            vc.view.view_success(response.data.message);
            $('#confirmTradeout').modal('toggle');
        }, function (response) {
            vc.view.view_error(response.data.message);
        });
    };

    vc.select = function () {
        var resubmitJson = { EQUITIES_IDS: [''] };
        for (var property in vc.view.dtEquities_selectedPreview) {
            if (vc.view.dtEquities_selectedPreview.hasOwnProperty(property)) {
                if (vc.view.dtEquities_selectedPreview[property])
                    resubmitJson.EQUITIES_IDS.push(property);
            }
        }
        vc.view.dtSelectedTradeout_update(resubmitJson);
    };

    vc.unselect = function (key) {
        for (var property in vc.view.dtEquities_selectedPreview) {
            if (vc.view.dtEquities_selectedPreview.hasOwnProperty(property)) {
                if (vc.view.dtEquities_selectedPreview[property])
                    if (property == key.EQUITIES_ID) {
                        vc.view.dtEquities_selectedPreview[property] = false;
                    }
            }
        }
        vc.select();
    };
});