var app = angular.module('min-express-srv-app', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "html/partials/home.html"
    })
    .when("/login", {
      templateUrl: "html/partials/login.html"
    })
    .when("/register", {
      templateUrl: "html/partials/register.html",
      controller: 'coreController'
    })
    .when("/profile", {
      templateUrl: "html/partials/profile.html"
    });

    $locationProvider.html5Mode(true);
});

app.controller('coreController', function () {

})
