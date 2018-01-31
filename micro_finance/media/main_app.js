window.appName = 'micro_finance';


window[appName] = angular.module(appName, ['ui.router',   'ngSanitize']);


window[appName].config(function ($stateProvider, $urlRouterProvider, $httpProvider) {


    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('dashboard', {
            url: '/',
            templateUrl: 'modules/dashboard.html',
            controller: 'dashboard'
        });

    $stateProvider
        .state('booking', {
            url: '/booking',
            templateUrl: 'modules/book.html',
            controller: 'booking'
        });


    $stateProvider
        .state('profile', {
            url: '/profile',
            templateUrl: 'modules/profile.html',
            controller: 'password'
        });

    $stateProvider
        .state('pureveg', {
            url: '/pureveg',
            templateUrl: 'modules/pricing.html',
            controller: 'booking'
        });

    $stateProvider
        .state('nonveg', {
            url: '/nonveg',
            templateUrl: 'modules/nonveg.html',
            controller: 'booking'
        });

    $stateProvider
        .state('custom', {
            url: '/custom',
            templateUrl: 'modules/mycombo.html',
            controller: 'booking'
        });

    $stateProvider
        .state('order_history', {
            url: '/order_history',
            templateUrl: 'modules/orders.html',
            controller: 'password'
        });

    $stateProvider
        .state('payment_history', {
            url: '/payment_history',
            templateUrl: 'modules/payments.html',
            controller: 'password'
        });

    

    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';


});







window[appName].factory('http', function ($http, $rootScope,$state) {
    return{
        Requests: function(method, URL, parameter) {
        
 

            $rootScope.showLoader = true;
            var $promise = {};
            switch (method) {
                case 'post':
                    
                    $promise = $http({
                        method: 'POST',
                        url: URL,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        transformRequest: function(obj) {
                            var str = [];
                            for(var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            return str.join("&");
                        },
                        data: parameter
                    });
                    
                  
                    break;
                case 'patch':
                    $promise = $http.patch(URL, parameter);
                    break;
                case 'get':
                    $promise = $http.get(URL, parameter);
                    break;
            }
            $promise.error(function (response,error) {

                
                



            });
            $promise.finally(function() {
                $rootScope.showLoader = false;

            });

            return $promise;

        }

    }
});

window[appName].factory('table', function ($http, $rootScope,$state,http) {
    return{
        Requests: function(link,sort,order) {

            var table_conf={};
            table_conf['data']=[];
            table_conf['link']=link;
            table_conf['sort']=sort;
            table_conf['order']=order;
            table_conf['filter']='';
            table_conf['page']=1;
            table_conf['size']=10;

            return table_conf;

        }

    }
});


window[appName].controller('pothigai_controller', function ($rootScope, $scope, http, $state, $http, $window, $location, $q, $filter, $stateParams, $interval) {

    


    function processTheData(method, action, url, parameter) {

        http.Requests(method, url, parameter).success(function (response) {


            switch (action) {
                case 'session':
         	    
                    if(response.status=="success")
                    {
                    	
                        $scope.username = response.profile.username;
                        $scope.profile = response.profile;
                    }
                    else
                    {
                         //window.location = "login.html";
                    }
                    
                    break;

                case 'logout':
                	
                    if(response.result=="success")
                    {
                        window.location = "login.html";
                    }
                    break;



                

            }
        });

    }

    $scope.logout = function(){

        processTheData('get', 'logout', window.project+'logout.php', {});

    }

 
  




});




