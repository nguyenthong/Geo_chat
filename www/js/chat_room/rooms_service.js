/*global Firebase*/
/*global GeoFire*/
(function (angular) {
  'use strict';

  angular.module('geo_chat')
    .service('RoomService', ['ROOMURL', 'MSGURL', 'MEMBERURL', 'LOCATIONURL', '$q', '$firebaseArray', RoomsService]);
    
  function RoomsService( ROOMURL, MSGURL, MEMBERURL, LOCATIONURL, $q, $firebaseArray) {
    var roomRef = new Firebase(ROOMURL);

    var geoRoomRef = new Firebase(LOCATIONURL);
    var geoFire = new GeoFire(geoRoomRef);
    var geoRef = geoFire.ref();

    var messageRef = new Firebase(MSGURL);

    var memberRef = new Firebase(MEMBERURL);
    var fireMember = $firebaseArray(memberRef);

    return {
      createRoom: function CreateRoom(newRoom) {
        var deferred = $q.defer();
        //todo fix the memberRef and MessageRef creation base on newRoomRef.key(()
        var newRoomRef = roomRef.push(newRoom, function(error) {
          if(error === null){
            var successMessage = "Your room is created";
            deferred.resolve(successMessage);
          }
        });
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
        return deferred.promise;
      },
      //todo function to add user to the room
      all: function allRooms(key,location, distance) {
        var rooms = [];
        var circles = [];
        var DISTANCE_ADDED = 1; //query more rooms than calculate to display
        var deferred = $q.defer();
        var geoQuery = geoFire.query({
          center: location,
          radius: distance + DISTANCE_ADDED
          //radius in kilometers
          });

        geoQuery.on("key_entered", function(key, location, distance) {
          roomRef.child(key).once("value", function (data) {
            console.log(key + " entered query at " + location + " (" + distance + " km from center)");
            var room = {};
            var circle = {};
            var radius = Number(data.val().range);
            userInCircleDetection();
          //  decorator function
            function userInCircleDetection() {
              if (distance*1000 <= radius){//distance comeback in kilometer
                room ={
                  roomID:  data.key(),
                  roomData: data.val()
                };
                circle = {
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
              }
            }
          });
        });
        return deferred.promise;
      },
      get: function getRoom(chatId) {

      },
      delete: function (room) {
      // todo adding remove method
      }
    };
  }

})(window.angular);
