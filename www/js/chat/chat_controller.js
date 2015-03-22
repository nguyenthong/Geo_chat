(function (angular) {
  'use strict';

  angular.module('geo_chat')
    .controller('ChatCtrl', ['$scope', '$timeout', 'MessageService', '$rootScope', '$stateParams', ChatCtrl]);
    function ChatCtrl($scope, $timeout, MessageService, $rootScope, $stateParams) {

      //$scope.currentUser = null;
      $scope.currentText = null;
      $scope.messages = [];

      MessageService.childAdded(function (addedChild) {
        $scope.messages.push(addedChild);
      });
      //todo fix this with user profile
      $scope.sendMessage = function () {
        if ($rootScope.authData) {
          var newMessage = {
            user: $rootScope.authData.facebook.username,
            text: $scope.currentText,
            imgURL: $rootScope.authData.facebook.cacheUserProfile.profile.picture.data.url
          };
        }

        var promise = MessageService.add(newMessage);
        promise.then(function (data) {
          console.log(data.name());
        });
      };

      $scope.turnFeedOff = function () {
        MessageService.off();
      };

      $scope.pageNext = function () {
        var lastItem = $scope.messages[$scope.messages.length - 1];
        MessageService.pageNext(lastItem.name, 10).then(function (messages) {
          $scope.messages = messages;
        });
      };

      $scope.pageBack = function () {
        var firstItem = $scope.messages[0];
        MessageService.pageBack(firstItem.name, 10).then(function (messages) {
          $scope.messages = messages;
        });
      };

    }
}(window.angular));
