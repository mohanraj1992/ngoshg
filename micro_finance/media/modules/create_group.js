/**
 * Created by hariharaselvam on 2/4/18.
 */
window[appName].controller('create_group', function ($rootScope, $stateParams, $scope, $state, $http, fileUpload, $window, $location, $q, $filter) {

    $scope.group = {};
    $scope.loan_details = {};
    function processTheData(method, action, url, parameter) {

        http.Requests(method, url, parameter).success(function (response) {


            switch (action) {


                case 'group':

                    $scope.group = response;
                    break;


            }
        });

    }

    $scope.uploadFile = function () {



        processTheData('post', 'create_loan', '/api/groups/loandetails/create/', $scope.loan_details);

        var file = $scope.myFile;
        var uploadUrl = "api/groups/create/";
        fileUpload.uploadFileToUrl(file, $scope.group, uploadUrl);
    };
    //$scope.uploadFile();


});
