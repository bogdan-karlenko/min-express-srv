angular.module('Authentication')
  .controller('RegisterController', ['$http', '$rootScope', '$location', '$scope',
    function($http, $scope, $rootScope, $location) {
      $scope.newUser = function(details) {
        console.log(details);
        return $http
          .post('/register/newuser', details).
        then(function(res) {
          // $rootScope.Login({
          //   username: details.username,
          //   password: details.password
          // });
        })
      }
    }
  ])
