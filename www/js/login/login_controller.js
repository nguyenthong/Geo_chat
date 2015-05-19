/*global Firebase*/
(function(angular) {
  'use strict';

  angular.module('geo_chat')
    .controller('LoginCtrl', ['$scope', '$firebase', '$cordovaFacebook', 'FBURL', 'USERURL', '$window', '$rootScope', '$state', LoginCtrl]);
  function LoginCtrl($scope, $firebase, $cordovaFacebook, FBURL, USERURL, $window, $rootScope, $state) {
      var fbRef = new Firebase(FBURL);
      var authObj = $firebaseAuth(fbRef);
      var userRef = new Firebase(USERURL);

      $scope.login = function () {
        $cordovaFacebook.login(["public_profile", "email", "user_friends"])
          .then(function (authData) {
            $state.go('tab.dash');
            console.log(authData);
            //userRef.child(authData.id).set({
            //  provider: 'fb',
            //  user_name: authData.facebook.displayName,
            //  picture: authData.facebook.cachedUserProfile.picture.data.url
            //});
          }, function (error) {
            console.log(error);
          });
      };



      //todo adding checking user data
      //var isNewUser = true;

      //$scope.login = function (provider) {
      //  authObj.$authWithOAuthPopup(provider)
      //    .then(function(authData) {
      //      console.log("Logged in as:", authData);
      //      $state.go('tab.dash');
      //      //todo refactor this to service
      //      //add new user ref to fireabase
      //      userRef.child(authData.uid).set({
      //        provider: authData.provider,
      //        user_name: authData.facebook.displayName,
      //        picture: authData.facebook.cachedUserProfile.picture.data.url
      //      });
      //      return authData;
      //    })
      //    .catch(function(error) {
      //      console.error("Authentication failed:", error);
      //    });
      //};

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

    }

}(window.angular));
