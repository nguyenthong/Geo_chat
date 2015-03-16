/*global Firebase*/
/*global GeoFire*/
(function (angular) {
  'use strict';

  angular.module('geo_chat')
    .service('RoomService', ['ROOMURL', 'MSGURL', 'MEMBERURL', 'LOCATIONURL', '$q', '$firebase', RoomsService]);
    
  function RoomsService( ROOMURL, MSGURL, MEMBERURL, LOCATIONURL, $q, $firebase) {
    var roomRef = new Firebase(ROOMURL);

    var geoRoomRef = new Firebase(LOCATIONURL);
    var geoFire = new GeoFire(geoRoomRef);
    var geoRef = geoFire.ref();

    //todo fix this, not query all the room
    //var fireRoomArray = $firebase(roomRef).$asArray();

    //var geoRoom = new GeoFire(ROOMURL);
    ////var geoRoomRef = geoRoom.ref();

    var messageRef = new Firebase(MSGURL);

    var memberRef = new Firebase(MEMBERURL);
    var fireMember = $firebase(memberRef).$asArray();

    function onComplete(data, snapshot) {
      if (data === Error){
        console.log(Error);
      }else{
        //todo making ionic show success message
        var successMes = "Your Room is created";
        console.log(successMes);
      }
    }

    return {
      //todo make this only get the room inside radius
      //childAdded: function childAdded(cb) {
      //  fireRoomArray.once('child_added', function (data) {
      //    var val = data.snapshot.value;
      //    cb.call(this, {
      //      room_name : val.room_name,
      //      type      : val.type,
      //      location  : val.location,
      //      radius    : val.radius,
      //      name      : data.snapshot.name
      //    });
      //  });
      //},
      createRoom: function CreateRoom(newRoom) {
        //todo fix the memberRef and MessageRef creation base on newRoomRef.key(()
        var newRoomRef = roomRef.push(newRoom, onComplete);
        var newRoomID = newRoomRef.key();
        //using newRoomID to set ID for messages, locations, members
        memberRef.child(newRoomRef.key()).set({
          empty: true,
          info: {}
        });
        messageRef.child(newRoomRef.key()).set({
          empty: true,
          info: {}
        });
        //setting location for the room
        geoFire.set(newRoomRef.key(),newRoom.location);
        return console.log(newRoomID);
      },
      //todo function to add user to the room
      get: function GetRooms(roomId) {
        return $firebase(roomRef.child(roomId)).$asObject();
      },
      delete: function (room) {
      // todo adding remove method
      }
    };
  }

})(window.angular);
