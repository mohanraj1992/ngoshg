/**
 * Created by hariharaselvam on 2/4/18.
 */
window[appName].controller('create_group', function ($rootScope, $stateParams, $scope, $state, $http, fileUpload, $window, $location, $q, $filter) {

    $scope.group = {};
    $scope.uploadFile = function () {
        var file = $scope.myFile;
        var uploadUrl = "api/groups/create/";
        fileUpload.uploadFileToUrl(file, $scope.group, uploadUrl);
    };
    //$scope.uploadFile();


});
