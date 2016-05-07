(function(){

angular.module('quickchat')
.factory('Messages', function($websocket) {
  var ws = $websocket('ws://'+location.host+'/chat/main');
  var collection = [];

  ws.onMessage(function(event) {
    var res;
    try {
      res = JSON.parse(event.data);
    } catch(e) {
      res = {'username': 'anonymous', 'message': event.data};
    }
    collection.push({
      username: res.user,
      content: res.text,
      timeStamp: event.timeStamp,
      type: res.type
    });
  });

  ws.onError(function(event) {
    console.log('connection Error', event);
  });

  ws.onClose(function(event) {
    console.log('connection closed', event);
  });

  ws.onOpen(function() {
    console.log('connection open');
    ws.send(JSON.stringify({
                        type: 'connect',
                        username: window.username
                    }))
  });

  return {
    collection: collection,
    status: function() {
      return ws.readyState;
    },
    send: function(message) {
      if (angular.isString(message)) {
        ws.send(message);
      }
      else if (angular.isObject(message)) {
        ws.send(JSON.stringify(message));
      }
    },
    clear: function(){
        collection.length = 0;
    }
  };
})

})();