(function (angular) {
  "use strict";
  angular.module('geo_chat')
   .controller('DashCtrl', ['$scope', '$rootScope', '$log', '$timeout', '$cordovaGeolocation', 'uiGmapGoogleMapApi', 'GetProfileService', 'RoomService', DashCtrl]);

  function DashCtrl($scope, $rootScope, $log, $timeout, $cordovaGeolocation, uiGmapGoogleMapApi, GetProfileService, RoomService) {
      //initila value for radius
      $scope.radius = 100;
      var range = $scope.radius;

      //get user profile
      GetProfileService.userProfile()
      .then(getUserSuccess, getUserError);

      //todo memory leak issue, also in RoomCrtl, checkout https://github.com/dylanfprice/angular-gm, or using partial
      var posOptions = {timeout: 10000, maximumAge:1000, enableHighAccuracy: false};
      //checking the user position every 1s
      $timeout(function () {
        $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(getLocationSuccess, getLocationError);
      }, 1000);

      setTimeout(getLocationSuccess, 0);

      //google maps interactive
      $scope.options = {scrollwheel: true};

      //Querying the rooms
      $scope.allRooms = function(radius) {
        //data for callback
        var key = $rootScope.user.userKey; // key for querying geofire
        var distance = Number(radius) * 0.001;//geofire take the distance para in kilometer
        var location = $scope.currentLocation;

        RoomService.all(key, location, distance, user_location, range).
          then(allRoomSuccess, allRoomError);
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$apply();

      };

      //declare
      function getLocationSuccess(position) {
        $scope.map = {
          center: {
            latitude: position.coords.latitude,
            longitude:  position.coords.longitude
          },
          events: { // event return query value from firebase base on Viewport of user map
            tilesloaded: function (map) {
              $scope.$apply(function () {
                uiGmapGoogleMapApi.then(function(maps) {
                   //var map = new google.maps.Map;
                   var key = $rootScope.user.userKey; // key for querying geofire
                   var zoomLevel = map.getZoom();
                   var viewPort = map.getBounds();
                   var locationObj = viewPort.getCenter();
                   var neObj = viewPort.getNorthEast();
                   var swObj = viewPort.getSouthWest();
                   // convert object to array for geofire query
                   var neArr = objToArray(neObj);
                   var locationArr = objToArray(locationObj);

                   function objToArray(obj) {
                     var arr = Object.keys(obj).map(function (i) {
                       return obj[i];
                     });
                     return arr;
                   }
                   var distance = maps.geometry.spherical.computeDistanceBetween(neObj, locationObj) * 0.001;
                   $log.info('this is the map instance', locationArr);
                   RoomService.all(key, locationArr, distance, user_location, range).
                      then(allRoomSuccess, allRoomError);
                 });
              });
            }
          },
          zoom: 13
        };
        //Google map marker
        $scope.marker = {
          id: 0,
          coords: $scope.map.center,
          options: {draggable: true}
        };
        //saving user location in 2 differnt types of data
        $scope.currentLocation = [position.coords.latitude, position.coords.longitude];
        var user_location = $scope.currentLocation;
        //  save current user location to the firebase for Geoquery every 1s
        GetProfileService.userLocationKey($scope.currentLocation);
        //  initialize the the rooms
        $scope.allRooms(100);
      }

      function getLocationError(err) {
        console.log(err);
      }
      function getUserSuccess (user) {
        $rootScope.user = user;
      }

      function getUserError () {
        console.log("Error happen");
      }

      function allRoomSuccess(container) {
          $scope.rooms = container.rooms;
          console.log(container);
          $scope.circles = container.circles;
        }

      function allRoomError(e) {
        console.log(e);
      }

    }
})(window.angular);
