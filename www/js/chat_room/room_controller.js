(function(angular) {
  'use strict';

  angular.module('geo_chat')
    .controller('RoomCtrl', ['$scope','$cordovaGeolocation', 'uiGmapGoogleMapApi', '$timeout','RoomService' ,RoomCtrl]);
    function RoomCtrl($scope, $cordovaGeolocation, uiGmapGoogleMapApi, $timeout, RoomService) {

      var posOptions = {timeout: 1000, enableHighAccuracy: true};
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          $timeout(function () {
            $scope.map = {
            center: {
              latitude: position.coords.latitude,
              longitude:  position.coords.longitude
            },
            zoom: 14
          };
          }, 0);
        }, function(err) {
          console.log(err);
        });


      //RoomService.childAdded(function (addedChild) {
      //  $scope.rooms.push(addedChild);
      //});
      //
      //$scope.creatRoom = RoomService.create();
      $scope.options = {scrollwheel: false};
      // uiGmapGoogleMapApi is a promise.
      // The "then" callback function provides the google.maps object.
      uiGmapGoogleMapApi.then(function(maps) {

      });
    }
}(window.angular));