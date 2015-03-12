(function(angular) {
  'use strict';

  angular.module('geo_chat')
    .controller('RoomCtrl', ['$scope','$cordovaGeolocation', 'uiGmapGoogleMapApi','RoomService' ,RoomCtrl]);
    function RoomCtrl($scope, $cordovaGeolocation, uiGmapGoogleMapApi, RoomService) {

      var posOptions = {timeout: 10000, enableHighAccuracy: true};
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

      setTimeout(getLocationSuccess, 0);

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