/*global Firebase*/
(function(angular) {
  'use strict';

  angular.module('geo_chat')
    .factory('MessageService', ['MSGURL', '$q', '$firebaseArray', MessageService]);
  function MessageService(MSGURL, $q, $firebaseArray) {
    return {
      messagesArray: function messagesArray(roomId) {
        var roomIdMessageURL = MSGURL.concat('/' + roomId);
        var messageRef = new Firebase(roomIdMessageURL);
        //todo create a query for the most recent 50 messages on the server
        console.log(roomIdMessageURL);
        return $firebaseArray(messageRef);
      }
      //off: function turnMessagesOff() {
      //  fireMessage.$off();
      //}
    };
  }

})(window.angular);
