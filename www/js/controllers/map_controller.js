(function (angular) {
  angular.module('geo_chat')
    .controller('LocationCtrl', function ($scope, uiGmapGoogleMapApi) {
      // Do stuff with your $scope.
      // Note: Some of the directives require at least something to be defined originally!
      // e.g. $scope.markers = []
      $scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14 };
      $scope.options = {scrollwheel: false};
      // uiGmapGoogleMapApi is a promise.
      // The "then" callback function provides the google.maps object.
      uiGmapGoogleMapApi.then(function(maps) {

      });
    });
})(window.angular);
