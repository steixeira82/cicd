app.controller('PageController', function ($scope, $rootScope, $http, View) {
    var vm = this;
    vm.view = View;
    vm.processItemLabel = 'Please, select a Process to edit information'
    vm.processItemVisible = false;
    vm.executeProcessItem = { EXEC_DT_REF: moment().format('DD/MM/YYYY'), EXEC_DT_REF_END: moment().format('DD/MM/YYYY') }

    vm.newProcess = function () {
        vm.processItemVisible = true;
        vm.processItem = { PROCESS_EXCLUDED: false, PROCESS_TYPE: '', GROUP_ID: '', PROCESS_EMAIL_NOTIFY: '', PROCESS_PARENT_ID: '', PROCESS_TIME_EXEC: '', PROCESS_TIME_LIMIT: '' };
        vm.processItemLabel = 'New Process';
        $('#processForm').parsley().reset();
    }

    vm.modifyProcess = function (key) {
        vm.processItemVisible = true;
        $('#processForm').parsley().reset();
        $http.post("GetProcessesById", key).then(function (response) {
            if (response.data) {
                vm.processItem = response.data;
                vm.processItemLabel = response.data.PROCESS_NAME;
            }
        });
        vm.view.dtFileAutomation_update(key);
        vm.view.dtManual_update(key);
    };


    vm.saveProcess = function () {
        if ($('#processForm').parsley().validate()) {
            $http.post("PostProcess", vm.processItem).then(function (response) {
                vm.view.view_success(response.data.message);
                vm.view.dtProcesses_update();
                vm.processItemVisible = false;
            }, function (response) {
                vm.view.view_error(response.data.message);
            });
        }
    };

    vm.confirmExecuteProcess = function (key) {
        $('#confirmExecuteProcessForm').parsley().reset();
        $http.post("GetProcessesById", key).then(function (response) {
            if (response.data) {
                vm.processItem = response.data;
                var disabled = false;
                if (!response.data.PROCESS_FLAG_HISTORY) {
                    disabled = true;
                }
                $("#EXEC_DT_REF")[0].disabled = disabled;
                $("#EXEC_DT_REF_END")[0].disabled = disabled;
                vm.executeProcessItem = { EXEC_DT_REF: moment().format('DD/MM/YYYY'), EXEC_DT_REF_END: moment().format('DD/MM/YYYY') };
            }
        });
        $('#confirmExecuteProcess').modal('toggle');
    };

    vm.executeProcess = function () {
        if ($('#confirmExecuteProcessForm').parsley().validate()) {
            $http.post("ExecuteProcess", { PROCESS_ID: vm.processItem.PROCESS_ID, EXEC_DT_REF: vm.executeProcessItem.EXEC_DT_REF, EXEC_DT_REF_END: vm.executeProcessItem.EXEC_DT_REF_END }).then(function (response) {
                vm.view.view_success(response.data.message);
                vm.view.dtProcesses_update();
                vm.processItemVisible = false;
                $('#confirmExecuteProcess').modal('toggle');
            }, function (response) {
                vm.view.view_error(response.data.message);
            });
        }
    }

    vm.removeProcess = function (key) {
        $('#deleteProcess').modal('toggle');
        $http.post("GetProcessesById", key).then(function (response) { vm.processItem = response.data });
    };

    vm.deleteProcess = function () {
        vm.processItem.PROCESS_EXCLUDED = true;
        $http.post("PostProcess", vm.processItem).then(function (response) {
            vm.view.view_success(response.data.message);
            vm.view.dtProcesses_update();
            $('#deleteProcess').modal('toggle');
        }, function (response) {
            vm.view.view_error(response.data.message);
        });
    }


    vm.newFileAutomation = function () {
        $('#modalFileAutomation').modal('toggle');
        $('#fileAutomationForm').parsley().reset();
        vm.fileAutomationItem = { FILE_ID: '', FILE_TYPE: '', GROUP_EMAIL_ID: '', PROCESS_ID: vm.processItem.PROCESS_ID };
        vm.view.dtManual_update({ PROCESS_ID: 0 });
    }

    vm.editFileAutomation = function (key) {
        $('#modalFileAutomation').modal('toggle');
        $('#fileAutomationForm').parsley().reset();
        $http.post("GetFileAutomationsById", key).then(function (response) {
            vm.fileAutomationItem = response.data;
        });
    };

    vm.saveFileAutomation = function () {
        if ($('#fileAutomationForm').parsley().validate()) {
            $http.post("PostFileAutomation", vm.fileAutomationItem).then(function (response) {
                vm.view.view_success(response.data.message);
                vm.view.dtFileAutomation_update({ PROCESS_ID: vm.processItem.PROCESS_ID });
                $('#modalFileAutomation').modal('toggle');
            }, function (response) {
                vm.view.view_error(response.data.message);
            });
        }
    };

    vm.removeFileAutomation = function (key) {
        $('#deleteFileAutomation').modal('toggle');
        vm.fileAutomationItem = key;
    };

    vm.deleteFileAutomation = function () {
        $http.post("DeleteFileAutomation", vm.fileAutomationItem).then(function (response) {
            vm.view.view_success(response.data.message);
            vm.view.dtFileAutomation_update({ PROCESS_ID: vm.processItem.PROCESS_ID });
            $('#deleteFileAutomation').modal('toggle');
        }, function (response) {
            vm.view.view_error(response.data.message);
        });
    }
    
    vm.newManual = function () {
        $('#modalManual').modal('toggle');
        $('#manualForm').parsley().reset();
        vm.manualItem = { MANUAL_ID: '', FILE_TYPE: '', GROUP_EMAIL_ID: '', PROCESS_ID: vm.processItem.PROCESS_ID };
    }

    vm.editManual = function (key) {
        $('#modalManual').modal('toggle');
        $('#manualForm').parsley().reset();
        $http.post("GetManualById", key).then(function (response) {
            vm.manualItem = response.data;
        });
    };

    vm.saveManual = function () {
        if ($('#manualForm').parsley().validate()) {
            $http.post("PostManual", vm.manualItem).then(function (response) {
                vm.view.view_success(response.data.message);
                vm.view.dtManual_update({ PROCESS_ID: vm.manualItem.PROCESS_ID });
                $('#modalManual').modal('toggle');
            }, function (response) {
                vm.view.view_error(response.data.message);
            });
        }
    };

    vm.removeManual = function (key) {
        $('#deleteManual').modal('toggle');
        vm.manualItem = key;
    };

    vm.deleteManual = function () {
        $http.post("DeleteManual", vm.manualItem).then(function (response) {
            vm.view.view_success(response.data.message);
            vm.view.dtManual_update({ PROCESS_ID: vm.manualItem.PROCESS_ID });
            $('#deleteManual').modal('toggle');
        }, function (response) {
            vm.view.view_error(response.data.message);
        });
    }

});