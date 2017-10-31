angular.module('Authentication', []);
angular.module('Core', ['Authentication']);

var app = angular.module('min-express-srv-app', [
  'Authentication',
  'Core',
  'ngRoute',
  'ngCookies'
]);

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'html/partials/home.html',
      activetab: 'home'
    })
    .when('/login', {
      templateUrl: 'html/partials/login.html',
      controller: 'LoginController',
      activetab: 'login',
    })
    .when('/register', {
      templateUrl: 'html/partials/register.html',
      controller: 'RegisterController',
      activetab: 'register'
    })
    .when('/profile', {
      templateUrl: 'html/partials/profile.html',
      activetab: 'profile',
      controller: 'ProfileController'
    });

  $locationProvider.html5Mode(true);
});
