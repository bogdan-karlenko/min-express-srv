angular.module('Authentication')
  .controller('LoginController', ['$scope', '$rootScope', '$location', 'AuthService', function($scope, $rootScope, $location, AuthService) {

    $scope.credentials = {
      username: '',
      password: ''
    }

    window.gapi.signin2.render('googleButton');

    $scope.login = function(credentials) {

      AuthService.Login(credentials, function(res) {
        var user = {
          id: res.data._id,
          name: res.data.username,
          email: res.data.email,
          role: res.data.role
        }
        if (res.statusText === 'OK') {
          console.log('res: ', res);
          AuthService.SetCurrentUser(user);
          $location.path('/profile');
        } else {
          $scope.error = 'Wrong username or password\n(' + res.statusText + ')';
        }
      })
    }
  }])
