(function(angular) {
  'use strict';

  angular.module('geo_chat')
    .controller('CreateRoomCtrl', ['$scope', '$cordovaGeolocation', 'uiGmapGoogleMapApi', '$timeout', '$state', '$ionicLoading', '$ionicModal', 'RoomService', CreateRoomCtrl]);
  function CreateRoomCtrl($scope, $cordovaGeolocation, uiGmapGoogleMapApi, $timeout, $state, $ionicLoading, $ionicModal, RoomService) {
    $scope.rooms = [];
    //Get location of user
    var posOptions = {timeout: 10000, enableHighAccuracy: true};
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
      if ($scope.newRoom.name === undefined || $scope.newRoom.name === '') {
        $scope.errorMes = "*Room name is required";
      }
      else if ($scope.newRoom.range === undefined || $scope.newRoom.range === '') {
        $scope.errorMes = "*Range is required";
      }
      else {
        startLoading();
        var pushRoomData = {
          name:  $scope.newRoom.name,
          private:  $scope.newRoom.private,
          range:  $scope.newRoom.range,
          location: [$scope.map.center.latitude, $scope.map.center.longitude],
        };
        switch ($scope.newRoom.private){
          case undefined:
            pushRoomData.private = false;
            pushRoomData.range = $scope.newRoom.range;
            RoomService.createRoom(pushRoomData)
              .then(stopLoading);
            break;
          case !undefined:
            pushRoomData.private =  $scope.newRoom.private;
            pushRoomData.range =  $scope.newRoom.range;
            RoomService.createRoom(pushRoomData)
              .then(stopLoading);
            break;
        }
      }
      $scope.newRoom = {};

    };
    //modal for confirm message
    $ionicModal.fromTemplateUrl('successInfo.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
          $scope.modal = modal;
        });

    $scope.closeModal = function () {
      $timeout(function () {
        if ($state.is('tab.dash')) {
          $scope.modal.remove();
        }}, 300);
    };
    //stop loading icon
    function startLoading() {
      $ionicLoading.show({
        template: '<ion-spinner icon="ripple" class="spinner-energized"></ion-spinner>'
      });
    }
    function stopLoading() {
      $ionicLoading.hide();
      $scope.modal.show();

    }
    // Querying the room

    //$scope.options = {scrollwheel: false};

  }
}(window.angular));
