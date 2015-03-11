(function (angular) {
  "use strict";
  angular.module('geo_chat')
   .controller('DashCtrl', ['$scope', 'uiGmapGoogleMapApi', 'GetProfileService','$state', DashCtrl]);

    function DashCtrl($scope, uiGmapGoogleMapApi, GetProfileService) {
      GetProfileService.userProfile()
        .then(getUserSuccess, getUserError);

      function getUserSuccess (user){
        $scope.user = user;
      }

      function getUserError (){
        console.log("Error happen");
      }

      // Do stuff with your $scope.
      // Note: Some of the directives require at least something to be defined originally!
      // e.g. $scope.markers = []
      $scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14 };
      $scope.options = {scrollwheel: false};
      // uiGmapGoogleMapApi is a promise.
      // The "then" callback function provides the google.maps object.
      uiGmapGoogleMapApi.then(function(maps) {

      });
    }
})(window.angular);

