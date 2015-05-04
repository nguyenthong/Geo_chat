(function (angular) {
  'use strict';
  /*global Firebase*/
  angular.module('geo_chat')
    .controller('ChatCtrl', ['$scope', '$timeout', 'MessageService',
      '$rootScope', '$stateParams', '$ionicScrollDelegate', 'MSGURL', ChatCtrl]);
  function ChatCtrl($scope, $timeout, MessageService,
                    $rootScope, $stateParams, $ionicScrollDelegate, MSGURL) {

    var roomId = $stateParams.roomId;
    $scope.message = "";

    //query message in the room and mark it as seen
    MessageService.messagesArray(roomId).$loaded()
      .then(function (messages) {
        $ionicScrollDelegate.scrollBottom(true);
        $scope.messages = messages;

        var unSeenMessages = messages
          .filter(function (message) {
            var hasSeen = _.include(message.seen, $rootScope.user.userKey);
            if (!hasSeen) {
              return message;
            }
          })
          .map(function (message) {
            if (message.seen !== undefined) {
              var ref = message.$id;
              var url = MSGURL.concat('/' + roomId).concat('/' + ref);
              message.seen.push($rootScope.user.userKey);
              messages.$save(url)
                .then(function () {
                  console.log('saving successed');
                })
                .catch(function (error) {
                  console.log('Error:', error);
                });
            }
          });

        console.log(unSeenMessages);
      })
      .catch(function(error) {
        console.log("Error:", error);
      });
    //todo make callback when the array has been loaded

    //todo fix this with user profile
    $scope.sendMessage = function () {
        if ($rootScope.user !== undefined) {
          $scope.messages.$add({
            sender: $rootScope.user.userKey,
            text: $scope.message,
            picture: $rootScope.user.picture,
            timestamp: Firebase.ServerValue.TIMESTAMP,
            seen: [$rootScope.user.userKey]
          });
          $ionicScrollDelegate.scrollBottom(true);
        }else {
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
