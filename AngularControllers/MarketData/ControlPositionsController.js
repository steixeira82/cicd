app.controller('ControlPositionsController', function ($interval, $scope, $rootScope, $http, View) {
    var vc = this;
    vc.view = View;

    vc.importSuccess = function(result) {
        vm.view.dtImportedFile_json = result.data;
        vm.view.dtImportedFile_update();
    };

    vc.importError = function(result) {
        vc.view.view_error(result.data.message);
    };

    vc.askInsert = function () {
        $('#confirmInsert').modal('toggle');
    };

    vc.insert = function () {
        $http.post("InsertControlPositions", { }).then(function (response) {
            vc.view.view_success(response.data.message);
            $('#confirmInsert').modal('toggle');
        }, function (response) {
            vc.view.view_error(response.data.message);
        });
    };

    vc.upload = function () {
        vc.view.UPLOAD_upload();
        vc.view.dtImportedFile_update();
        }

});
