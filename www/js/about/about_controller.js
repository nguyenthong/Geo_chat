(function (angular) {
  "use strict";
  angular.module('geo_chat')
    .controller('AboutCtrl', ['$scope', AboutCtrl]);
  function AboutCtrl($scope) {
    $scope.team = {
      developer: {
        name: 'Nguyen Thong',
        img: 'img/NguyenThong.jpg',
        description: 'Developer',
        link: 'https://fi.linkedin.com/in/nguyenthong1992'
      },
      business:{
        name: 'Hannes Huotari',
        img: 'img/HannesHuotari.jpg',
        description: 'CEO, Founder at Corpi Ltd.',
        link: 'http://www.corpi.fi/'
      }
    };
    console.log('Iam here');
  }
})(window.angular);
