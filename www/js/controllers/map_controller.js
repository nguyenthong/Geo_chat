(function (angular) {
  angular.module('geo_chat')
    .controller('MapCtr', function ($scope, uiGmapGoogleMapApi) {
      // Do stuff with your $scope.
      // Note: Some of the directives require at least something to be defined originally!
      // e.g. $scope.markers = []

      // uiGmapGoogleMapApi is a promise.
      // The "then" callback function provides the google.maps object.
      uiGmapGoogleMapApi.then(function(maps) {

      });
    });
})(window.angular);/**
 * Created by development on 2/27/15.
 */
