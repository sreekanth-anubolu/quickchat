(function(){

angular.module('quickchat')
.config(['$routeProvider', function($routeProvider, $socketProvider){
  $routeProvider
    .when('/', { 
      templateUrl: "/static/templates/chatView.html",
      controller: "ChatCtrl",
      controllerAs: "ctrl"
    })
    .otherwise({redirectTo:'/'});

  //$socketProvider
  //  .configure({ address: 'http://localhost:9000/chat/' });
}]);

})();