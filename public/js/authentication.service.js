angular.module('Authentication')

.factory('AuthService', function($http, $cookies) {
  var authService = {};

  authService.Login = function(credentials, callback) {
    console.log('AuthService.Login');
    $http
      .post('/login/user', credentials)
      .then(function(res) {
        callback(res);
      }, function(res) {
        callback(res);
      })
  };

  authService.SetCurrentUser = function(user) {
    authService.currentUser = user;
    $cookies.putObject('currentUser', authService.currentUser);
    console.log(authService.currentUser, $cookies.getObject('currentUser'));

  };

  authService.ClearCurrentUser = function() {
    authService.currentUser = null;
    $cookies.remove('currentUser');
  };

  authService.isAuthenticated = function() {
    return !!authService.currentUser;
  }

  return authService;
})
