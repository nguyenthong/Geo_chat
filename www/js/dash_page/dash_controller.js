(function (angular) {
  "use strict";
  angular.module('geo_chat')
   .controller('DashCtrl',['$scope', '$rootScope', '$timeout', '$cordovaGeolocation','uiGmapGoogleMapApi', 'GetProfileService', 'RoomService', DashCtrl]);

    function DashCtrl($scope,$rootScope, $timeout, $cordovaGeolocation, uiGmapGoogleMapApi, GetProfileService, RoomService) {
      GetProfileService.userProfile()
      .then(getUserSuccess, getUserError);


      function getUserSuccess (user){
        $rootScope.user = user;
      }

      function getUserError (){
        console.log("Error happen");
      }

      //todo memory leak issue, also in RoomCrtl, checkout https://github.com/dylanfprice/angular-gm, or using partial
      var posOptions = {timeout: 1000, maximumAge:1000, enableHighAccuracy: false};
      //checking the user position every 1s
      $timeout(function () {
        $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(getLocationSuccess, getLocationError);
      }, 1000);

      function getLocationSuccess(position) {
        $scope.map = {
          center: {
            latitude: position.coords.latitude,
            longitude:  position.coords.longitude
          },
          zoom: 14
        };
        //saving user location in 2 differnt types of data
        $scope.currentLocation = [position.coords.latitude, position.coords.longitude];
      //  save current user location to the firebase for Geoquery every 1s
        GetProfileService.userLocationKey($scope.currentLocation);
      }

      function getLocationError(err) {
        console.log(err);
      }

      setTimeout(getLocationSuccess, 0);

      //Querying the rooms
      $scope.rooms = [];
      $scope.radius = 0;
      $scope.roomRefresh = function() {
        //data for callback
        var distance = $scope.radius * 0.001;//geofire take the distance para in kilometer
        var location = $scope.currentLocation;
        var key = $rootScope.user.userKey;

        RoomService.getRoom($scope.radius, $scope.map.center).
          then(getRoomSuccess, getRoomError);
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$apply();

        function getRoomSuccess(geoQuery) {
          console.log(key);
          geoQuery.on("key_entered", function(key, location, distance) {
            console.log("room " + key + " found at " + location + " (" + distance + " km away)");
          });
        }

        function getRoomError() {
          console.log("error");
        }
      };


      $scope.options = {scrollwheel: false};
      // uiGmapGoogleMapApi is a promise.
      // The "then" callback function provides the google.maps object.
      uiGmapGoogleMapApi.then(function(maps) {

      });
    }
})(window.angular);

