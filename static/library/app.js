(function () {
  'use strict';

    angular.module('quickchat', ['ui.router', 'ng-socket'])

    .config(function($stateProvider, $urlRouterProvider, $socketProvider,  $httpProvider) {

        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
      $stateProvider.state('main', {
        url: '/',
        templateUrl: 'static/templates/index.html',
        controller: 'MainCtrl'
      });

      $urlRouterProvider.otherwise('/');
      $socketProvider.configure({ address: 'http://localhost:9999/echo' });
    })

   .controller('MainCtrl', function($scope, $socket, $http) {
     $scope.messages = [];
     $scope.participants = [];

     $scope.sendMessage = function(){

            var url = 'channel/message?id='
            var data = {
                         'participants': $scope.participants,
                         'message':$scope.textMessage
                       }

            return $http.post(url, data).success(function(result){
                console.log(result);
                $scope.textMessage = null;
            });

     };

     $socket.on("send_message", function(event, data){
        $scope.messages.push(JSON.parse(data));
     });

     $socket.on("someone_joined", function(event, data){
        var id = data['id']
        if($.inArray(id, $scope.participans)<0) {
        //$.inArray() returns the index of the item if it is found, and -1 otherwise
          $scope.participans.push(id);
        }
        console.log($scope.participans);
     });

     $socket.on("someone_left", function(event, data){
        var id = data['id']
        if($.inArray(id, $scope.participans)>0) {
           // remove element
           $scope.participans.splice($.inArray(id, $scope.participans),1);
        }
        console.log($scope.participans);
     });


     $socket.start();
     $scope.sessionId = document.cookie.match(/csrftoken=[^;]+/)[0];
     $socket.send('connect',JSON.stringify({room_id: $scope.sessionId}));

})

})();