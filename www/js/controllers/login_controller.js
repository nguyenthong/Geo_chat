/*global Firebase*/
(function(angular) {
  'use strict';

  angular.module('geo_chat')
    .controller('LoginCtrl', function($scope, $firebase, $firebaseAuth, FBURL, $window, $rootScope, $state) {
      var fbRef = new Firebase(FBURL);
      $scope.auth = $firebaseAuth(fbRef);

      $scope.login = function (facebook) {
        fbRef.authWithOAuthPopup('facebook', function (error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully:", authData);
          $state.go('tab.dash');
        }
         $rootScope.authData = authData;
          return $rootScope.authData;
      });
      };

      //$scope.simpleLogin = $firebaseSimpleLogin(fbRef);
      //$scope.errors = [];
      //$scope.user = {
      //  email: '',
      //  password: ''
      //};
      //
      //$scope.login = function() {
      //  $scope.errors = [];
      //
      //  if ($scope.user.email === '') {
      //    $scope.errors.push('Please enter your email');
      //  }
      //
      //  if ($scope.user.password === '') {
      //    $scope.errors.push('Please enter your password');
      //  }
      //
      //  if ($scope.errors.length > 0) {
      //    return;
      //  }
      //
      //  var promise = $scope.simpleLogin.$login('password', {
      //    email: $scope.user.email,
      //    password: $scope.user.password
      //  });
      //
      //  promise.then(function(user) {
      //    console.log(user);
      //    $rootScope.user = user;
      //    $window.location.href = '/#/main';
      //  }, function(error) {
      //    console.error(error);
      //    if (error.code === 'INVALID_EMAIL') {
      //      $scope.errors.push('The email was invalid');
      //    }
      //    if (error.code === 'INVALID_PASSWORD') {
      //      $scope.errors.push('The password was invalid');
      //    }
      //  });
      //
      //};

    });

}(window.angular));
