(function (angular) {
  /* global Firebase */
  "use strict";
  angular.module('geo_chat')
   .service('GetProfileService', ['$firebase', '$firebaseAuth', 'USERURL','FBURL', '$q', GetProfileService] );

    function GetProfileService($firebase, $firebaseAuth, USERURL, FBURL, $q ) {
      var fbRef = new Firebase(FBURL);
      var authObj = $firebaseAuth(fbRef);

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
                  picture: data.val().picture
                };
                deferred.resolve(user);
              });

            } else {
              console.log("Logged out");
            }
          });
          return deferred.promise;
        }
      };

    }
})(window.angular);