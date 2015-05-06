(function (angular) {
  'use strict';
  /*global Firebase*/
  angular.module('geo_chat')
    .controller('ChatCtrl', ['$scope', '$timeout', 'MessageService',
      '$rootScope', '$stateParams', '$ionicScrollDelegate', 'MSGURL', 'ngAudio', ChatCtrl]);
  function ChatCtrl($scope, $timeout, MessageService,
                    $rootScope, $stateParams, $ionicScrollDelegate, MSGURL, ngAudio) {
    $rootScope.notification = [];
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
              var messageId = message.$id;
              var record = messages.$getRecord(messageId);
              message.seen.push($rootScope.user.userKey);
              messages.$save(record)
                .then(function () {
                  console.log('saving successed');
                })
                .catch(function (error) {
                  console.log('Error:', error);
                });
              return message;
            }
          });
        console.log(unSeenMessages);
        //watching the event in the synced array to get event child_added to the array
        $scope.messages.$watch(function (event) {
          //todo solve async problem
          console.log(event);
          if (event.event === 'child_added') {
            var record = messages.$getRecord(event.key);
            console.log(record);
            var seen = _.include(record.seen, $rootScope.user.userKey);
            if (!seen) {
              var sound = ngAudio.load('img/music_marimba_chord.wav'); // returns NgAudioObject
              sound.play();
              $rootScope.notification.push(record);
            }
          }
        });
        //mark seen for those message in notification array
        $scope.markSeen = function () {
          var length = $rootScope.notification.length;
          console.log(length);
        };
      })
      .catch(function(error) {
        console.log("Error:", error);
      });
    //callback when child item added to the array
    $scope.$on('$ionicView.leave', function() {
      console.log('leave');
    });

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
