(function(angular) {
  'use strict';

  angular.module('geo_chat')
    .controller('RoomCtrl', ['$scope', '$cordovaGeolocation', 'uiGmapGoogleMapApi', '$timeout', 'RoomService', RoomCtrl]);
  function RoomCtrl($scope, $cordovaGeolocation, uiGmapGoogleMapApi, $timeout, RoomService) {

    var posOptions = {timeout: 1000, enableHighAccuracy: true};
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(getLocationSuccess, getLocationError);

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
      RoomService.createRoom(newRoom);

    };

      //RoomService.childAdded(function (addedChild) {
      //  $scope.rooms.push(addedChild);
      //});
      //

    $scope.options = {scrollwheel: false};
      // uiGmapGoogleMapApi is a promise.
      // The "then" callback function provides the google.maps object.
      uiGmapGoogleMapApi.then(function(maps) {

      });
    }
}(window.angular));