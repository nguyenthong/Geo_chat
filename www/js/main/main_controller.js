(function (angular) {
  'use strict';
  /*global Firebase*/
  angular.module('geo_chat')
    .controller('MainCtrl', ['$scope', '$rootScope', MainCtrl]);
  function MainCtrl($scope, $rootScope) {
    $rootScope.$on('badge_changed',function () {
        $scope.badges = $rootScope.notification.length;
        console.log($scope.badges);
      }
    );
  }
}(window.angular));
