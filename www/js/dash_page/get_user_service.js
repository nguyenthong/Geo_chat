(function (angular) {
  /* global Firebase */
  /*global GeoFire*/
  "use strict";
  angular.module('geo_chat')
   .service('GetProfileService', ['$firebase', '$firebaseAuth', 'USERURL','FBURL', 'USERLOCATIONURL', '$q', GetProfileService] );

    function GetProfileService($firebase, $firebaseAuth, USERURL, FBURL, USERLOCATIONURL, $q ) {
      var fbRef = new Firebase(FBURL);
      var authObj = $firebaseAuth(fbRef);

      var userLocationRef = new Firebase(USERLOCATIONURL);
      var geoFire = new GeoFire(userLocationRef);
      var geoRef = geoFire.ref();

      return {
        userProfile: function userProfile () {
          var deferred = $q.defer();

          authObj.$onAuth(function (authData) {
            if (authData) {
              //get the userID references
              var userID = USERURL.concat('/').concat(authData.uid);
              var userRef = new Firebase(userID);

              userRef.once("value", function (data) {
                var user = {
                  user_name: data.val().user_name,
                  picture: data.val().picture,
                  userKey: authData.uid
                };
                deferred.resolve(user);
              });

            } else {
              console.log("Logged out");
            }
          });
          return deferred.promise;
        },

        userLocationKey: function userLocationKey(userLocation) {
          //setting location for user
          var deferred = $q.defer();

          authObj.$onAuth(function (authData) {
            geoFire.set(authData.uid, userLocation);
            return authData.uid;
          });
          return deferred.promise;
        }

      };

    }
})(window.angular);