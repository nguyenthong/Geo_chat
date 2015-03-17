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
    //Get location of user
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
    $scope.newRoom = {};

    $scope.createRoom = function () {
      if ( $scope.newRoom.name === undefined){
        $scope.errorMes = "*Room name is required";
      }
      else if ( $scope.newRoom.range === undefined ){
        $scope.errorMes = "*Range is required";
      }
      else{
        switch ( $scope.newRoom.private){
          case undefined:
            var pushRoomData = {
              name:  $scope.newRoom.name,
              private:  $scope.newRoom.private,
              range:  $scope.newRoom.range,
              location: [$scope.map.center.latitude, $scope.map.center.longitude]
            };
            pushRoomData.private = false;
            pushRoomData.range = $scope.newRoom.range;
            RoomService.createRoom(pushRoomData);
            break;
          case !undefined:
            var pushRoomData = {
              name:  $scope.newRoom.name,
              private:  $scope.newRoom.private,
              range:  $scope.newRoom.range,
              location: [$scope.map.center.latitude, $scope.map.center.longitude]
            };
            pushRoomData.private =  $scope.newRoom.private;
            pushRoomData.range =  $scope.newRoom.range;
            RoomService.createRoom(pushRoomData);
            break;
        }
      }
      $scope.newRoom = defaultForm;

    };

    $scope.options = {scrollwheel: false};


  }
}(window.angular));