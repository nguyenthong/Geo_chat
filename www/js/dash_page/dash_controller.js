(function (angular) {
  "use strict";
  angular.module('geo_chat')
   .controller('DashCtrl', ['$scope', '$rootScope', '$log', '$timeout', '$cordovaGeolocation', '$ionicLoading', 'uiGmapGoogleMapApi', 'GetProfileService', 'rx', 'RoomService', DashCtrl]);

  function DashCtrl($scope, $rootScope, $log, $timeout, $cordovaGeolocation, $ionicLoading, uiGmapGoogleMapApi, GetProfileService, rx, RoomService) {
      //initila value for radius
      startLoading();
      $scope.activeRoom = $rootScope.activeRoom;
      $scope.radius = 100;
      var range = $scope.radius;
      //get user profile
      GetProfileService.userProfile()
      .then(getUserSuccess, getUserError);

      var posOptions = {timeout: 15000, enableHighAccuracy: true};
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(getLocationSuccess, getLocationError);

      //google maps interactive
      $scope.options = {scrollwheel: true};

      //Querying the rooms
      $scope.allRooms = function(radius) {
        //data for callback
        var key = $rootScope.user.userKey; // key for querying geofire
        var distance = Number(radius) * 0.001;//geofire take the distance para in kilometer
        var location = $scope.currentLocation;

        RoomService.all(key, location, distance, $scope.currentLocation, range).
          then(allRoomSuccess, allRoomError);
        $scope.$broadcast('scroll.refreshComplete');
      };

      //declare=========================================================
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
                   //RoomService.all(key, locationArr, distance, user_location, range).
                   //   then(mapAllRoomSuccess, allRoomError);
                  var promise = RoomService.all(key, locationArr, distance, user_location, range);
                   var observable = rx.Observable
                     .fromPromise(promise)
                     .map(function (container) {
                       return container.circles;
                     });

                   observable.subscribe(function (circles) {
                     $scope.circles = circles;
                   });
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
        $scope.allRooms(1000);
        $scope.$apply();
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
          stopLoading();
        }

      function allRoomError(e) {
        console.log(e);
      }

      function mapAllRoomSuccess(container) {
        $scope.circles = container.circles;
      }
      //stop loading icon
      function startLoading() {
        $ionicLoading.show({
          template: '<ion-spinner icon="ripple" class="spinner-energized"></ion-spinner>'
        });
      }
      function stopLoading() {
        $ionicLoading.hide();

      }

    }
})(window.angular);
