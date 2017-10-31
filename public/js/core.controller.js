angular.module('Core', ['Authentication'])
  .controller('coreController', ['$scope', '$route', 'AuthService', '$cookies', '$location',
    function($scope, $route, AuthService, $cookies, $location) {
      //$scope.currentUser = null;

      $scope.$route = $route;
      $scope.authService = AuthService;

      $scope.isAuthenticated = $scope.authService.isAuthenticated();

      console.log('$scope.isAuthenticated: ', $scope.isAuthenticated);

      function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        console.log(profile);

        var user = {
          id: profile.getId(),
          name: profile.getName(),
          email: profile.getEmail(),
          role: 'user'
        }

        $scope.authService.SetCurrentUser(user);

        $location.path('/profile');
        $scope.$apply();

        //$scope.$apply();
      }

      function signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function() {
          $scope.authService.ClearCurrentUser();
          $location.path('/');
          $scope.$apply();
          console.log('User signed out.');
        });
      }
      window.signOut = signOut;
      window.onSignIn = onSignIn;

    }
  ]);
