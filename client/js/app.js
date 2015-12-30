var myApp = angular.module('myApp', [
	'ngRoute',
    'ui.bootstrap',
    'ngResource',
    'ngAnimate',
    'btford.socket-io'])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
		$routeProvider.when('/profile', {templateUrl: 'partials/profile.html', controller: 'profileController'});
		$routeProvider.when('/submit', {templateUrl: 'partials/submit.html', controller: 'submitController'});
		$routeProvider.when('/dailydose', {templateUrl: 'partials/dailydose.html', controller: 'dailydoseController'});
		$routeProvider.when('/projects', {templateUrl: '/partials/projects.html', controller: 'projectsController'});
        $routeProvider.when('/projects/customerapi', {templateUrl: '/partials/projects/customerapi.html', controller: 'customerApiController'});
        $routeProvider.when('/projects/chat', {templateUrl: '/partials/projects/chat.html', controller: 'chatController'});

		$routeProvider.otherwise({redirectTo: '/dailydose'});

		$locationProvider.html5Mode({enabled: true, requireBase: false});

	}])
	.filter('startFrom', function(){
        return function(data, start){
            return data.slice(start);
        }
    });



	