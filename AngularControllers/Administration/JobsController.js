app.controller('JobsController', function ($interval, $scope, $rootScope, $http, View) {
    var vm = this;
    vm.view = View;
    var keyDelete = '';
    var keySelected = '';
    
    vm.userItem = {};

    vm.modify = function (key) {
        $('#gridEditModal').draggable();
        $('#gridEditModal').modal('toggle');
        $('#editForm').parsley().reset();
        keySelected = key;
        $('#JOB_NAME_EDIT')[0].disabled = true;
        $http.post("GetJobByName", key).then(function (response) {
            response.data.START_DATE = moment(response.data.START_DATE).format('DD/MM/YYYY HH:mm:ss');
            response.data.END_DATE = moment(response.data.END_DATE).format('DD/MM/YYYY HH:mm:ss');

            vm.editItem = response.data;
            vm.editItem.ISUPDATE = true;
        });
    };

    vm.play = function (key) {
        keySelected = key;
        $http.post("RunJob", key ).then(function (response) {
            vm.view.view_success(response.data.message);
            vm.view.dtJobs_update();
        }, function (response) {
            vm.view.view_error(response.data.message);
        });
    };

    vm.stop = function (key) {
        keySelected = key;
        $http.post("StopJob", key).then(function (response) {
            vm.view.view_success(response.data.message);
            vm.view.dtJobs_update();
        }, function (response) {
            if (response.status == 501) {
                vm.view.view_warning("The job is not running");
            }
            else {
                vm.view.view_error(response.data.message);
            }
            vm.view.dtJobs_update();
        });
    };

    vm.remove = function (key) {
        $('#gridDeleteModal').modal('toggle');
        keyDelete = key;
    };

    vm.detail = function (key) {
        //$('#gridEditModal').modal('toggle');
        keySelected = key;
        vm.view.dtJobRunDetails_update(key);
    }

    vm.save = function () {

        if ($('#editForm').parsley().validate({ group: 'group' })) {

           //Check if procedure contains parameters, if conteins is a needs be a plsql block
            if (vm.editItem.JOB_ACTION.indexOf('(') > -1 && vm.editItem.JOB_ACTION.indexOf(')') > -1)
            {
                vm.editItem.JOB_TYPE = 'PLSQL_BLOCK';
            }
            else
            {
                vm.editItem.JOB_TYPE = 'STORED_PROCEDURE';
            }

            vm.editItem.AUTO_DROP = false;
            vm.editItem.JOB_CLASS = 'DEFAULT_JOB_CLASS';

            vm.editItem.JOB_NAME = vm.editItem.JOB_NAME.replace(/\s/g, '');

            $http.post("PostSaveJob", { jobParameters: vm.editItem }).then(function (response) {
                vm.view.view_success(response.data.message);
                vm.view.dtJobs_update();
                $('#gridEditModal').modal('toggle');
                vm.editItem.ISUPDATE = false;
            }, function (response) {
                vm.view.view_error(response.data.message);
            });
        };
    };

    vm.new = function () {
        $('#gridEditModal').modal('toggle');
        $('#editForm').parsley().reset();

        $('#JOB_NAME_EDIT')[0].disabled = false;

        //Clear all edit data
        vm.editItem.JOB_TYPE = 'STORED_PROCEDURE';
        vm.editItem.AUTO_DROP = false;
        vm.editItem.JOB_CLASS = 'DEFAULT_JOB_CLASS';
        vm.editItem.JOB_NAME = '';
        vm.editItem.JOB_ACTION = '';
        vm.editItem.FREQUENCY = '';
        vm.editItem.START_DATE = '';
        vm.editItem.END_DATE = '';
        vm.editItem.INTERVAL = '';
        vm.editItem.WEEK_DAY = '';
        vm.editItem.HOUR = '';
        vm.editItem.MINUTE = '';
        vm.editItem.ISUPDATE = false;
        vm.editItem.COMMENTS = '';
        vm.editItem.JOB_ENABLED = false;
    }

    vm.delete = function () {
        $http.post("PostDropJob", keyDelete).then(function (response) {
            keyDelete = '';
            keySelected = '';
            vm.view.view_success(response.data.message);
            vm.view.dtJobs_update();
            $('#gridDeleteModal').modal('toggle');
        }, function (response) {
            vm.view.view_error(response.data.message);
        });
    };

    vm.updateInfos = function (init) {
        if (init > 0) {
            vm.view.dtJobRunDetails_update(keySelected);
        }
    }

    vm.updateRunDetails = function (init) {
        if (init > 0) {
            vm.view.dtJobs_update();
        }
    }

    vm.updateInfos(0);
    vm.updateRunDetails(0);
    $interval(vm.updateInfos, 10000);//10 seconds for update
    $interval(vm.updateRunDetails, 10000);//10 seconds for update
    
});