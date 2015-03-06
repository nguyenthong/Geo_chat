(function (angular) {
  "use strict";
  angular.module('geo_chat')
   .controller('DashCtrl', function($scope, uiGmapGoogleMapApi, $rootScope) {
      $scope.user = {
        user_name: $rootScope.authData.facebook.displayName,
        picture: $rootScope.authData.facebook.cachedUserProfile.picture.data.url
      };
      // Do stuff with your $scope.
      // Note: Some of the directives require at least something to be defined originally!
      // e.g. $scope.markers = []
      $scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14 };
      $scope.options = {scrollwheel: false};
      // uiGmapGoogleMapApi is a promise.
      // The "then" callback function provides the google.maps object.
      uiGmapGoogleMapApi.then(function(maps) {

      });
    });
})(window.angular);

xc