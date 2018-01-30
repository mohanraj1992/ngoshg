window.appName = 'pothigai_login';

window.project = "http://hotelpothigai.in/api/"



window[appName] = angular.module(appName, ['ui.router', 'ngValidator', 'ngSanitize']);

window[appName].config(function ($stateProvider, $urlRouterProvider, $httpProvider) {


    
    

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




window[appName].controller('pothigai_home_controller', function ($rootScope, $scope, http, $state, $http, $window, $location, $q, $filter, $stateParams, $interval) {

    

    function processTheData(method, action, url, parameter) 
    {

        http.Requests(method, url, parameter).success(function (response) 
        {
        
            switch (action) 
            {

                case 'register':
                    if(response.result=="success")
                    {
                        bootbox.alert( $scope.username + " registered successfully");
                        $scope.username="";
                        $scope.password="";
                        $scope.cpassword="";
                        $scope.email="";
                        $scope.number="";
                    }
                    else
                    {
                        bootbox.alert( $scope.username + " was not registered");
                    }
                    
                    break; 
                case 'login':
                   
                    if(response.result=="success")
                    {
                        sessionStorage.setItem("username", $scope.lusername);
                        processTheData('get', 'session', window.project+'profile.php', {});
                        window.location = "/public";
                    }
                    else
                    {
                        bootbox.alert( "Username or password invalid" );
                        $scope.lusername="";
                        $scope.lpassword="";

                    }
                    
                    break; 
                case 'session':
                    if(response.status=="success")
                    {
                    	
                        window.location = "/public";
                        
                    }
                    
                   
                    break;
            }
        });
    }

    $scope.register = function ()
    {
        if($scope.username==undefined || $scope.username=="")
        {
            bootbox.alert( "Enter a valid username");
            return false;
        }
        if(!valid_mail($scope.email))
        {
            bootbox.alert( "Enter a valid Email");
            return false;
        }
        if(!valid_mobile($scope.number))
        {
            bootbox.alert( "Enter a valid mobile number");
            return false;
        }
        if($scope.password==undefined || $scope.password=="")
        {
            bootbox.alert( "Enter a valid password");
            return false;
        }
        if($scope.password!=$scope.cpassword)
        {
                bootbox.alert( "Password and Confirm password are not matching");
                return false;
        }

        var param = { "username" : $scope.username, "password" : $scope.password, "email" :$scope.email,"phone" : $scope.number };
            

        processTheData('post', 'register', window.project+'register_user.php', param);

    };

    $scope.login = function ()
    {
    

        var param = { "username" : $scope.lusername, "password" : $scope.lpassword };
            

        processTheData('post', 'login', window.project+'login.php', param);

    };

    $scope.forgot = function ()
    {
    
        if($scope.femail)
        {
            var param = { "email" : $scope.femail};

            bootbox.alert("Password recover link has been send to "+$scope.femail );
            

        //processTheData('post', 'login', window.project+'login.php', param);

        }


    };
    
    processTheData('get', 'session', window.project+'profile.php', {});

            (function($) {
            $(document).ready(function() {
                $('.list-inline li > a').click(function() {
                    var activeForm = $(this).attr('href') + ' > form';
                    //console.log(activeForm);
                    $(activeForm).addClass('animated fadeIn');
                    //set timer to 1 seconds, after that, unload the animate animation
                    setTimeout(function() {
                        $(activeForm).removeClass('animated fadeIn');
                    }, 1000);
                });
            });
        })(jQuery);
        
        
        function valid_mail(email_value) 
        {
            if(email_value==undefined||email_value=="")
            {
                return false;
            }
            var atpos = email_value.indexOf("@");
            var dotpos = email_value.lastIndexOf(".");
            if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email_value.length) 
            {
        
                return false;
            }
            return true;
        }
        function valid_mobile(mobile_value) 
        {
            var phoneno = /^\d{10}$/;
            if(mobile_value==undefined||mobile_value=="")
            {
                return false;
            }
            if(mobile_value.match(phoneno)) 
            {  
                return true;  
            }  
            else  
            {  
                return false; 
            }  
        }

  
   


});




