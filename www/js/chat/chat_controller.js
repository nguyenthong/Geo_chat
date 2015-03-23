(function (angular) {
  'use strict';
  /*global Firebase*/
  angular.module('geo_chat')
    .controller('ChatCtrl', ['$scope', '$timeout', 'MessageService', '$rootScope', '$stateParams', ChatCtrl]);
    function ChatCtrl($scope, $timeout, MessageService, $rootScope, $stateParams) {
      //$scope.chat = Chats.get($stateParams.chatId);

      //$scope.currentUser = null;
      var roomId = $stateParams.roomId;
      $scope.currentText = null;
      $scope.messages = MessageService.messagesArray(roomId);

      //todo fix this with user profile
      $scope.sendMessage = function () {
        console.log($scope.messages);
        $scope.messages.$add({
          sender: $rootScope.user.userKey,
          text: $scope.message,
          imgURL: $rootScope.user.picture,
          timestamp: Firebase.ServerValue.TIMESTAMP
        });

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
