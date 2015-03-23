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
          console.log(roomIdMessageURL);
          //fireMessage.$add(function (data) {
          //  var val = data.value;
          //  console.log(data);
            //cb.call(this, {
            //  user: val.user,
            //  text: val.text,
            //  name: data.name
            //});
          //});
        }
      };
    }

})(window.angular);
