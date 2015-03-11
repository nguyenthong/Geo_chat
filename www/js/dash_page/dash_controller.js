(function (angular) {
  "use strict";
  angular.module('geo_chat')
   .controller('DashCtrl',['$scope', '$rootScope', '$cordovaGeolocation','uiGmapGoogleMapApi', 'GetProfileService','$timeout', DashCtrl]);

    function DashCtrl($scope,$rootScope, $cordovaGeolocation, uiGmapGoogleMapApi, GetProfileService, $timeout) {
      GetProfileService.userProfile()
        .then(getUserSuccess, getUserError);

      function getUserSuccess (user){
        $rootScope.user = user;
      }

      function getUserError (){
        console.log("Error happen");
      }

      // Do stuff with your $scope.
      // Note: Some of the directives require at least something to be defined originally!
      // e.g. $scope.markers = []
      var posOptions = {timeout: 1000, enableHighAccuracy: true};
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(getLocationSuccess, getLocationError);

        function getLocationSuccess(position) {
          $timeout(function () {
            $scope.map = {
            center: {
              latitude: position.coords.latitude,
              longitude:  position.coords.longitude
            },
            zoom: 14
          };
          }, 0);
        }

        function getLocationError(err) {
          console.log(err);
        }

      $scope.options = {scrollwheel: false};
      // uiGmapGoogleMapApi is a promise.
      // The "then" callback function provides the google.maps object.
      uiGmapGoogleMapApi.then(function(maps) {

      });
    }
})(window.angular);

