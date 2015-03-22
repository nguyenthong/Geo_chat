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
      all: function GetRooms(key,location, distance) {
        var rooms = [];
        var circles = [];
        var deferred = $q.defer();
        var geoQuery = geoFire.query({
          center: location,
          radius: distance
          //radius in kilometers
          });

        geoQuery.on("key_entered", function(key, location, distance) {
          roomRef.child(key).once("value", function (data) {
            var room ={
              roomID:  data.key(),
              roomData: data.val()
            };
            var circle = {
              id: key,
                center: {
                    latitude: room.roomData.location[0],
                    longitude: room.roomData.location[1]
                },
                radius: Number(room.roomData.range),
                stroke: {
                    color: '#08B21F',
                    weight: 2,
                    opacity: 1
                },
                fill: {
                    color: '#08B21F',
                    opacity: 0.5
                }
            };

            rooms.push(room);
            circles.push(circle);
            var container = {
              rooms: rooms,
              circles: circles
            };
            deferred.resolve(container);
          });
        });
        return deferred.promise;
      },
      get: function(chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      },
      delete: function (room) {
      // todo adding remove method
      }
    };
  }

})(window.angular);
