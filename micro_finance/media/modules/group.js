/**
 * Created by hariharaselvam on 2/10/18.
 */
window[appName].controller('group', function ($rootScope, $stateParams, $scope, $state, http, fileUpload, $window, $location, $q, $filter) {

    $scope.id = $stateParams.id;
    function processTheData(method, action, url, parameter) {

        http.Requests(method, url, parameter).success(function (response) {


            switch (action) {


                case 'group':

                    $scope.group = response;
                    break;


            }
        });

    }

    $scope.group = {};
    processTheData('get', 'group', '/api/groups/'+$scope.id+"/", {});


});
