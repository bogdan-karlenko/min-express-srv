angular.module('Core')
  .controller('ProfileController', ['$scope', '$location', '$cookies', 'AuthService',
    function($scope, $location, $cookies, AuthService) {
      // var currentUser = $cookies.getObject('currentUser');
      // console.log('currentUser: ', currentUser);
      if (!AuthService.isAuthenticated()) {
        $location.path('/login');
      } else {
        $scope.currentUser = AuthService.currentUser;
      }
    }
  ])
