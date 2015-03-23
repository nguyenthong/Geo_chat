/*global Firebase*/
(function(angular) {
  'use strict';

  angular.module('geo_chat')
    .factory('MessageService', ['MSGURL', '$q', '$firebaseArray', MessageService]);
    function MessageService( MSGURL, $q, $firebaseArray) {
      return {
        childAdded: function childAdded(roomId, cb) {
          var roomIdMessageURL = MSGURL.concat('/' + roomId);
          var messageRef = new Firebase(roomIdMessageURL);
          var fireMessage = $firebaseArray(messageRef);
          //todo fix this bug ?????
          fireMessage.$add(function (data) {
            var val = data.snapshot.value;
            cb.call(this, {
              user: val.user,
              text: val.text,
              name: data.snapshot.name
            });
          });
        }
      };
    }

})(window.angular);
