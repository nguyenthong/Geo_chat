/*global Firebase*/
(function(angular) {
  'use strict';

  angular.module('geo_chat')
    .service('RoomsService', function( ROOMURL, $q, $firebase) {
      var roomRef = new Firebase(ROOMURL);
      var fireRoom = $firebase(roomRef).$asArray();
      
      return {
        childAdded: function childAdded(cb) {
          fireRoom.$on('child_added', function(data) {
            var val = data.snapshot.value;
            cb.call(this, {
              room_name : val.room_name,
              type      : val.type,
              location  : val.location,
              radius    : val.radius,
              name      : data.snapshot.name
            });
          });
        },
        create: function CreateRoom(room) {
          return fireRoom.$add(room);
        },
        get: function GetRooms(roomId) {
          return $firebase(ref.child('posts').child(postId)).$asObject();
        }
      };
    });

})(window.angular);
