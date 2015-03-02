(function (angular) {
  angular.module('geo_chat')

    .controller('DashCtrl', function($scope, uiGmapGoogleMapApi) {
      // Do stuff with your $scope.
      // Note: Some of the directives require at least something to be defined originally!
      // e.g. $scope.markers = []
      $scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14 };
      $scope.options = {scrollwheel: false};
      // uiGmapGoogleMapApi is a promise.
      // The "then" callback function provides the google.maps object.
      uiGmapGoogleMapApi.then(function(maps) {

      });
    })

    .controller('ChatsCtrl', function($scope, Chats) {
      $scope.chats = Chats.all();
      $scope.remove = function(chat) {
        Chats.remove(chat);
      }
    })

    .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
      $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('FriendsCtrl', function($scope, Friends) {
      $scope.friends = Friends.all();
    })

    .controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
      $scope.friend = Friends.get($stateParams.friendId);
    })

    .controller('AccountCtrl', function($scope) {
      $scope.settings = {
        enableFriends: true
      };
    });

})(window.angular);

