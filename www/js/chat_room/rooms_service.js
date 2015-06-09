/*global Firebase*/
/*global GeoFire*/
(function (angular) {
  'use strict';

  angular.module('geo_chat')
    .service('RoomService', ['ROOMURL', 'MSGURL', 'MEMBERURL', 'LOCATIONURL', '$q', '$firebaseArray', 'uiGmapGoogleMapApi', RoomsService]);
    
  function RoomsService(ROOMURL, MSGURL, MEMBERURL, LOCATIONURL, $q, $firebaseArray, uiGmapGoogleMapApi) {
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
          if (error === null) {
            var successMessage = "Your room is created";
            deferred.resolve(successMessage);
          }
        });
        var newRoomID = newRoomRef.key();
        //using newRoomID to set ID for messages, locations, members
        memberRef.child(newRoomRef.key()).set({
          info: {}
        });
        messageRef.child(newRoomRef.key()).set({
          info: {}
        });
        //setting location for the room
        geoFire.set(newRoomRef.key(), newRoom.location);
        return deferred.promise;
      },
      //todo function to add user to the room
      //all function for querying all the rooms
      all: function allRooms(key, location, distance, user_location, range) {
        var rooms = [];
        var circles = [];
        var DISTANCE_ADDED = 1; //query more rooms than calculate to display
        var deferred = $q.defer();
        var geoQuery = geoFire.query({
          center: location,
          radius: distance + DISTANCE_ADDED
          //radius in kilometers
        });

        uiGmapGoogleMapApi.then(function(maps) {
          geoQuery.on("key_entered", function(key, location, distance) {
            roomRef.child(key).once("value", function (data) {
              //todo remove this in production
              //console.log(key + " entered query at " + location + " (" + distance + " km from center)");
              //console.log(data.val());
              var room = {};
              var circle = {};
              var radius = Number(data.val().range);
              var room_location = data.val().location;
              var user_locationObj = new maps.LatLng(user_location[0], user_location[1]);
              var room_locationObj = new maps.LatLng(room_location[0], room_location[1]);
              var distanceToRoom = maps.geometry.spherical.computeDistanceBetween(user_locationObj, room_locationObj);
              userInCircleDetection();
              //  decorator function
              function userInCircleDetection() {
                if (distanceToRoom <= radius) {//distance comeback in kilometer
                  room = {
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
                        color: '#08B21F', //green color indicate for accessible rooms
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
                }
                else {
                  room = {
                    roomID:  data.key(),
                    roomData: data.val()
                  };
                  var outOfRangeCircle = {
                    id: key,
                    center: {
                        latitude: room.roomData.location[0],
                        longitude: room.roomData.location[1]
                      },
                    radius: Number(room.roomData.range),
                    stroke: {
                        color: '#ff4081', //red color indicate for non-accessible rooms
                        weight: 2,
                        opacity: 1
                      },
                    fill: {
                        color: '#ff4081',
                        opacity: 0.5
                      }
                  };
                  circles.push(outOfRangeCircle);
                }
              }
            });
          });
          var container = {
            rooms: rooms,
            circles: circles
          };
          deferred.resolve(container);
          return deferred.promise;
        });
        return deferred.promise;
      },
      delete: function (room) {
        var deferred = $q.defer();
        //todo fix the memberRef and MessageRef creation base on newRoomRef.key(()
        var deleteRoomRef = roomRef.remove(room, onComplete);
        //using newRoomID to set ID for messages, locations, members
        memberRef.child(room).remove();
        messageRef.child(room).remove();
        //setting location for the room
        geoFire.remove(room);
        //
        function onComplete(error) {
          if (error === null) {
            var successMessage = "Your room is deleted";
            deferred.resolve(successMessage);
          }
        }
        return deferred.promise;
      }
    };
  }

})(window.angular);
