window[appName].controller('dashboard', function ($rootScope, $stateParams, $scope, $state, http, $window, $location, $q, $filter) {

    function processTheData(method, action, url, parameter) {

        http.Requests(method, url, parameter).success(function (response) {


            switch (action) {


                case 'Groups':

                    $scope.groups = response;
                    break;


            }
        });

    }

    $scope.groups = [];
    processTheData('get', 'Groups', '/api/groups/', {});


});