app.controller('PageController', function ($scope, $rootScope, $http, View) {
    var vm = this;
    vm.view = View;
    vm.clientItemLabel = 'Please, select a Client to edit information'
    vm.clientItemVisible = false;
    vm.brokerClientItem = {};

    vm.modify = function (key) {
        vm.clientItemVisible = true;
        $('#clientForm').parsley().reset();
        $http.post("GetClientById", key).then(function (response) {
            if (response.data)
                vm.clientItem = response.data
            else
                vm.clientItem = { CD_CLIENTE: key.CD_CLIENTE, CLIENT_TYPE: "" };
        });
        vm.view.dtBroker_update(key);
        $http.post("GetClientViewById", key).then(function (response) {
            if (response.data)
                vm.clientItemLabel = response.data.CD_CLIENTE + ' - ' + response.data.NM_CLIENTE + ' selected.';
        });
        
    };

    vm.editBrokerClient = function (key) {
        $('#gridEditModal').modal('toggle');
        $('#brokerClientForm').parsley().reset();
        $http.post("GetBrokerClientById", key).then(function (response) {
            vm.brokerClientItem = response.data;
            vm.view.DC_ID_update({ BROKER_ID: vm.brokerClientItem.BROKER_ID });
        });
    };


    vm.removeBrokerClient = function (key) {
        $('#gridDeleteModal').modal('toggle');
        $http.post("GetRuleById", key).then(function (response) { vm.brokerClientItem = response.data }); 
    };

    
    vm.saveClient = function () {
        if ($('#clientForm').parsley().validate()) {
            $http.post("PostClient", vm.clientItem).then(function (response) {
                vm.view.view_success(response.data.message);
                vm.view.dtSinacorClient_update();
            }, function (response) {
                vm.view.view_error(response.data.message);
            });
        }
    };

    vm.saveBrokerClient = function () {
        if ($('#brokerClientForm').parsley().validate()) {
            $http.post("PostBrokerClient", vm.brokerClientItem).then(function (response) {
                vm.view.view_success(response.data.message);
                vm.view.dtBroker_update({ CD_CLIENTE: vm.brokerClientItem.CD_CLIENTE });
                $('#gridEditModal').modal('toggle');
            }, function (response) {
                vm.view.view_error(response.data.message);
            });
        }
    };

    vm.newBrokerClient = function () {
        $('#gridEditModal').modal('toggle');
        $('#editForm').parsley().reset();
    }

    vm.BROKER_ID_change = function () {
        vm.view.DC_ID_update({ BROKER_ID: vm.brokerClientItem.BROKER_ID })
    }
});