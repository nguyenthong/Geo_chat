(function(angular) {
  'use strict';

  angular.module('geo_chat')
    .controller('RoomCtrl', ['$scope', '$cordovaGeolocation', 'uiGmapGoogleMapApi', '$timeout', 'RoomService', RoomCtrl]);
  function RoomCtrl($scope, $cordovaGeolocation, uiGmapGoogleMapApi, $timeout, RoomService) {

    var posOptions = {timeout: 1000, enableHighAccuracy: true};
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(getLocationSuccess, getLocationError);
      //location for displaying the map and create new room
      function getLocationSuccess(position) {
        $scope.map = {
        center: {
          latitude: position.coords.latitude,
          longitude:  position.coords.longitude
        },
        zoom: 14
        };
      }

      function getLocationError(err) {
        console.log(err);
      }

    setTimeout(getLocationSuccess, 1000);

    //Create Room
    $scope.createRoom = function (newRoom) {
      var pushRoomData = {
        name: newRoom.name,
        location: [$scope.map.center.latitude, $scope.map.center.longitude]
      };
      RoomService.createRoom(pushRoomData);
    };

    $scope.options = {scrollwheel: false};


  }
}(window.angular));