(function(angular) {
  'use strict';

  angular.module('geo_chat')
    .controller('RoomCtrl', ['$scope', '$cordovaGeolocation', 'uiGmapGoogleMapApi', '$timeout', 'RoomService', RoomCtrl]);
  function RoomCtrl($scope, $cordovaGeolocation, uiGmapGoogleMapApi, $timeout, RoomService) {
    var defaultForm = {
        name: "",
        private: "",
        range: ""
      };

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

    setTimeout(getLocationSuccess, 0);

    //Create Room

    $scope.createRoom = function (newRoom) {
      if (newRoom === undefined){
        $scope.errorMes = "*Room name is required";
      }
      else{
        switch (newRoom.private){
          case undefined:
            var pushRoomData = {
              name: newRoom.name,
              private: newRoom.private,
              range: newRoom.range,
              location: [$scope.map.center.latitude, $scope.map.center.longitude]
            };
            pushRoomData.private = false;
            pushRoomData.range = 0;
            RoomService.createRoom(pushRoomData);
            break;
          case !undefined:
            var pushRoomData = {
              name: newRoom.name,
              private: newRoom.private,
              range: newRoom.range,
              location: [$scope.map.center.latitude, $scope.map.center.longitude]
            };
            pushRoomData.private = newRoom.private;
            pushRoomData.range = newRoom.range;
            RoomService.createRoom(pushRoomData);
            break;
        }
      }

    };

    $scope.options = {scrollwheel: false};


  }
}(window.angular));