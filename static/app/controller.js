(function(){

angular.module('quickchat.controllers')
  .controller('ChatCtrl', ChatCtrl);

function ChatCtrl(
  $scope,
  Messages,
  $http
  ){

    var self = this;

    self.username = 'anonymous';

    self.Messages = Messages;

    self.msgs = [];

    function getData(){
        var msgs = $http.get('/message/').success(function(res){
            if(res.success){
                self.msgs = res.data;
            }
        });
    };

    getData();

    self.submit = function(new_message) {
      if (!new_message) { return; }
      Messages.send({
                    type: 'message',
                    text: new_message
                });
      var csrfmiddlewaretoken = $('input[name="csrfmiddlewaretoken"]').val();
      $http.defaults.headers.common["x-csrftoken"] = csrfmiddlewaretoken
      var data = JSON.stringify({type: 'message',message: new_message})
      $http.post("/message/", data).success( function(response) {
            self.new_message = '';
       });
    };

    self.keyPress = function(event){
        if(event.keyCode == 13){
            self.submit(self.new_message);
        }
    }

    self.clearChat = function(){
        var csrfmiddlewaretoken = $('input[name="csrfmiddlewaretoken"]').val();
        $http.defaults.headers.common["x-csrftoken"] = csrfmiddlewaretoken
        var data = $.param({'csrfmiddlewaretoken' : csrfmiddlewaretoken})
        $http.put("/clear/", data).success( function(response) {
          if(response.success){
            Messages.clear();
            self.msgs = [];
          }

       });
    }

}

})();
