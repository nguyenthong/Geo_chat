(function(angular) {
  'use strict';

  angular.module('geo_chat')
    .controller('RoomCtrl', ['$scope','$cordovaGeolocation','RoomService' ,RoomCtrl]);
    function RoomCtrl($scope, $cordovaGeolocation,$timeout, RoomService) {

      $scope.rooms = [];

      $scope.getLocation = function () {
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
            var lat  = position.coords.latitude;
            var long = position.coords.longitude;
          }, function(err) {
            // error
          });
      };

      //RoomService.childAdded(function (addedChild) {
      //  $scope.rooms.push(addedChild);
      //});
      //
      //$scope.creatRoom = RoomService.create();
    }
}(window.angular));