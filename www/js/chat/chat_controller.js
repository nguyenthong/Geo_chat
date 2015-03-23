(function (angular) {
  'use strict';
  /*global Firebase*/
  angular.module('geo_chat')
    .controller('ChatCtrl', ['$scope', '$timeout', 'MessageService', '$rootScope', '$stateParams', ChatCtrl]);
    function ChatCtrl($scope, $timeout, MessageService, $rootScope, $stateParams) {
      var roomId = $stateParams.roomId;
      $scope.message = "";
      $scope.messages = MessageService.messagesArray(roomId);

      //todo fix this with user profile
      $scope.sendMessage = function () {
        if ($rootScope.user !== undefined) {
          $scope.messages.$add({
            sender: $rootScope.user.userKey,
            text: $scope.message,
            picture: $rootScope.user.picture,
            timestamp: Firebase.ServerValue.TIMESTAMP
          });
        }else{
          console.log("message is missing");
          console.log($scope.message);
        }

        $scope.message = "";
      };

      $scope.turnFeedOff = function () {
        MessageService.off();
      };

      //$scope.pageNext = function () {
      //  var lastItem = $scope.messages[$scope.messages.length - 1];
      //  MessageService.pageNext(lastItem.name, 10).then(function (messages) {
      //    $scope.messages = messages;
      //  });
      //};
      //
      //$scope.pageBack = function () {
      //  var firstItem = $scope.messages[0];
      //  MessageService.pageBack(firstItem.name, 10).then(function (messages) {
      //    $scope.messages = messages;
      //  });
      //};

    }
}(window.angular));
