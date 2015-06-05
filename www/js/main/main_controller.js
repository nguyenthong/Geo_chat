(function (angular) {
  'use strict';
  /*global Firebase*/
  angular.module('geo_chat')
    .controller('MainCtrl', ['$scope', '$rootScope', '$stateParams', 'appId', 'clientKey', MainCtrl]);
  function MainCtrl($scope, $rootScope, $stateParams, appId, clientKey) {
    $rootScope.$on('badge_changed', function () {
        $scope.badges = $rootScope.notification.length;
        console.log($scope.badges);
      }
    );
    //sending notification to system when user put it in background
    document.addEventListener("pause", onPause, false);

    function onPause() {
      // moving the notification through Parse
      //create Parse channel by $rootScope.user.userKey;
      // making listener for messages
      $rootScope.$on('badge_changed', function () {
        Parse.Push.send({
          channels: [$rootScope.user.userKey],
          data: {
            alert: 'New message in room:' + $stateParams.roomId
          }}, 
          {
            success: function () {
              console.log('Sending push message sucess');
            },
            error: function () {
              console.log('Sending push message failed');
            }
          }
        );
        window.parsePlugin.initialize(appId, clientKey, function () {
            console.log('Parse initialized successfully on Pause.');

            window.parsePlugin.subscribe($rootScope.user.userKey, function () {
              console.log('Successfully subscribed to $rootScope.user.userKey on Pause.');

            }, function (e) {
              console.log('Failed trying to subscribe to SampleChannel.');
            });

          }, function (e) {
            console.log('Failure to initialize Parse.');
          });
      });
    }

    document.addEventListener("resume", onResume, false);

    function onResume() {
      // remove the notification receive from Parse
    }
  }
}(window.angular));
