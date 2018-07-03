app.controller('PageController', function ($scope, $rootScope, $http, View) {
    var vm = this;
    vm.view = View;
    vm.processExecutionItemVisible = false;

    vm.detail = function (key) {
        vm.processExecutionItemVisible = true;
        $('#processExecutionForm').parsley().reset();
        $http.post("GetProcessExecutionById", key).then(function (response) {
            if (response.data) {
                vm.processExecutionItem = response.data;
                vm.processExecutionItemLabel = 'Process Execution ID: ' + response.data.EXEC_ID;
            }
        });
        vm.view.dtNotification_update(key);
        vm.view.dtFileExecution_update(key);
        
    };

    vm.notificationDetail = function (key) {
        $('#modalNotification').modal('toggle');
        $http.post("GetNotificationByNotificationId", key).then(function (response) {
            if (response.data) {
                vm.notificationItem = response.data;
            }
        });
    };

    vm.updateProcessExecutionItem = function () {
        vm.view.dtNotification_update({ EXEC_ID: vm.processExecutionItem.EXEC_ID });
        vm.view.dtFileExecution_update({ EXEC_ID: vm.processExecutionItem.EXEC_ID });
    };

    vm.updateProcessExecution = function () {
        vm.view.dtProcessExecution_update();
    };

    vm.repeat = function () {
        $http.post("RepeatProcessExecution", vm.processExecutionItem).then(function (response) {
            vm.view.view_success(response.data.message);
            vm.view.dtProcessExecution_update();
            vm.processItemVisible = false;
            $('#confirmRepeatProcess').modal('toggle');
        }, function (response) {
            vm.view.view_error(response.data.message);
        });
    }

    
    vm.fileExecutionDetail = function (key) {
        $('#modalFileExecution').modal('toggle');
        $http.post("GetFileExecutionById", key).then(function (response) {
            vm.fileExecutionItem = response.data;
            vm.view.dtFileAttach_update({ FILE_EXEC_ID: vm.fileExecutionItem.FILE_EXEC_ID });
        });
    }
    
    vm.fileAttachDownload = function (key) {
        $http.post("DownloadFile", key).then(function (data, status, headers) {
            headers = headers();

            var filename = headers['x-filename'];
            var contentType = headers['content-type'];

            var linkElement = document.createElement('a');
            try {
                var blob = new Blob([data], { type: contentType });
                var url = window.URL.createObjectURL(blob);

                linkElement.setAttribute('href', url);
                linkElement.setAttribute("download", filename);

                var clickEvent = new MouseEvent("click", {
                    "view": window,
                    "bubbles": true,
                    "cancelable": false
                });
                linkElement.dispatchEvent(clickEvent);
            } catch (ex) {
                console.log(ex);
            }
        }, function (response) {
            vm.view.view_error(response.data.message);
        });
    }

    vm.repeatConfirmation = function (key) {
        vm.processExecutionItem = key;
        $('#confirmRepeatProcess').modal('toggle');
    }

});