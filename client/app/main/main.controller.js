'use strict';

angular.module('kinleyImagesearchApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
    var cx = '017728127643810685442:oziarnalkb8';
    var apikey = 'AIzaSyBFD5kTrogjexv2AQPjtSA3KETTd2_6Cwk';
      var url = 'https://www.googleapis.com/customsearch/v1?key='+apikey+'&q=funny&searchType=image&cx='+cx;//&searchType=image';//&cx='+cx;

//    var url = 'https://www.googleapis.com/customsearch/v1?key=INSERT_YOUR_API_KEY&cx=017576662512468239146:omuauf_lfve&q=lectures';
$http.get(url).success(function (result) {
  console.log("Result is " + JSON.stringify(result,undefined, 2));
}).error(function (err) {
  console.log("Error " +err);
});
    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
  });
