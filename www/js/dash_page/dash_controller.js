(function (angular) {
  "use strict";
  angular.module('geo_chat')
   .controller('DashCtrl',['$scope', '$rootScope', '$log','$timeout', '$cordovaGeolocation','uiGmapGoogleMapApi', 'GetProfileService', 'RoomService', DashCtrl]);

    function DashCtrl($scope,$rootScope, $log, $timeout, $cordovaGeolocation, uiGmapGoogleMapApi, GetProfileService, RoomService) {

      GetProfileService.userProfile()
      .then(getUserSuccess, getUserError);

      function getUserSuccess (user){
        $rootScope.user = user;
      }

      function getUserError (){
        console.log("Error happen");
      }

      //todo memory leak issue, also in RoomCrtl, checkout https://github.com/dylanfprice/angular-gm, or using partial
      var posOptions = {timeout: 10000, maximumAge:1000, enableHighAccuracy: false};
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
          zoom: 13
        };
        //Google map marker
        $scope.marker = {
          id: 0,
          coords: $scope.map.center,
          options: { draggable: true }
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


      $scope.options = {scrollwheel: true};
      uiGmapGoogleMapApi.then(function(maps) {
      });

      //Querying the rooms
      $scope.radius = 100;
      $scope.allRooms = function(radius) {
        //data for callback
        var distance = Number(radius)* 0.001;//geofire take the distance para in kilometer
        var location = $scope.currentLocation;
        var key = $rootScope.user.userKey;

        RoomService.all(key,location, distance).
          then(allRoomSuccess, allRoomError);
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$apply();

        function allRoomSuccess(container) {
          $scope.rooms = container.rooms;
          console.log(container);
          $scope.circles = container.circles;
        }

        function allRoomError() {
          console.log("error");
        }
      };

    }
})(window.angular);

