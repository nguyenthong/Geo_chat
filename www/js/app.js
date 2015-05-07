/* global angular*/

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('geo_chat', [
  //angular module dependencies
  'ionic',
  'ngCordova',
  'monospaced.elastic',
  //3rd parties modules
  'firebase',
  'uiGmapgoogle-maps',
  'ngAudio'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
//  todo remove this in production
//.run(['$state', 'stateWatcherService', function ($state, stateWatcherService) {
//  // Include $route to kick start the router.
//}])
  .run(function ($rootScope) {
    $rootScope.notification = [];
  })

.config(function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
  //angularUi-google-map config
  uiGmapGoogleMapApiProvider.configure({
    //key: 'AIzaSyBKC4Ti0xa6OnWBiPWgmlPR3trlVl2cQho',
    v: '3.17',
    libraries: 'weather,geometry,visualization'
  });

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
   .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    cache: false,
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

    .state('tab.createRoom', {
      url: '/createRoom',
      views: {
        'tab-dash': {
          templateUrl: 'templates/createRoom.html',
          controller: 'CreateRoomCtrl'
        }
      }
    })

  .state('tab.chats', {
      url: '/chats/:roomId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatCtrl'
        }
      }
    })
    //.state('tab.chat-detail', {
    //  url: '/chats/:chatId',
    //  views: {
    //    'tab-chats': {
    //      templateUrl: 'templates/chat-detail.html',
    //      controller: 'ChatDetailCtrl'
    //    }
    //  }
    //})

  .state('tab.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'templates/tab-friends.html',
          controller: 'FriendsCtrl'
        }
      }
    })
    .state('tab.friend-detail', {
      url: '/friend/:friendId',
      views: {
        'tab-friends': {
          templateUrl: 'templates/friend-detail.html',
          controller: 'FriendDetailCtrl'
        }
      }
    })

  .state('login', {
    url: '/login' ,
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

})
.constant('FBURL', 'https://nguyenthong1992.firebaseio.com/')
.constant('USERURL', 'https://nguyenthong1992.firebaseio.com/users')
.constant('USERLOCATIONURL', 'https://nguyenthong1992.firebaseio.com/users_location')
.constant('ROOMURL', 'https://nguyenthong1992.firebaseio.com/rooms')
.constant('MSGURL', 'https://nguyenthong1992.firebaseio.com/messages')
.constant('MEMBERURL', 'https://nguyenthong1992.firebaseio.com/members')
.constant('LOCATIONURL', 'https://nguyenthong1992.firebaseio.com/location');
