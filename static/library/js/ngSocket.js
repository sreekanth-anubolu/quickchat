/**
 * @author Nirandas Thavorath <nirandas@gmail.com>
 * copyright 2014
 * MIT license
 */

angular.module("ng-socket", [])

.provider("$socket", function() {

    var options = {
        address: null,
        broadcastPrefix: "$socket.",
        reconnectInterval: 5000,
        receiveInterval: 500,
        parser: null,
        formatter: null,
        logger: function() {}
    };

    function parser(msg) {
        return angular.fromJson(msg);
    }

    function formatter(event, data) {
        return angular.toJson([event, data]);
    }

    var queue = [];
    var fireQueue = [];
    var firePromise = null;
    var socket;
    var socketConnected;

    function socketFactory($rootScope, $timeout) {

        /**
         * attaches listener on $rootScope or to the provided scope
         */
        function on(event, listener, scope) {
            return (scope || $rootScope).$on(options.broadcastPrefix + event, listener);
        }

        /**
sends the message if connected or queues it for later
*/
        function send(event, data) {
            var message = (options.formatter || formatter)(event, data);
            if (socketConnected) {
                socket.send(message);
            } else {
                queue.push(message);
            }
        }

        function newSocket() {
            socketConnected = false;
            socket = null;
            if (!window.SockJS) {
                return options.logger(new Error("Must include SockJS for ng-socket to work"));
            }
            if (!options.address) {
                return options.logger(new Error("Must configure the address"));
            }
            socket = new SockJS(options.address);
            socket.onopen = function() {
                socketConnected = true;
                $rootScope.$broadcast(options.broadcastPrefix + "open");
                for (var i in queue) {
                    socket.send(queue[i]);
                }
                queue = [];
            };

            socket.onmessage = function(msg) {
                msg = (options.parser || parser)(msg.data);
                if (!Array.isArray(msg) || msg.length !== 2) {
                    return options.logger(new Error("Invalid message " + msg.toString()));
                }

                fire(msg[0], msg[1]);
            };

            socket.onclose = function() {
                socketConnected = false;
                socket = null;
                $timeout(newSocket, options.reconnectInterval);
            };

        }

        function fireAll() {
            for (var i in fireQueue) {
                $rootScope.$broadcast(options.broadcastPrefix + fireQueue[i].event, fireQueue[i].data);
            }
            fireQueue = [];
        }

        function fire(event, data) {
            fireQueue.push({
                event: event,
                data: data
            });
            if (!firePromise) {
                firePromise = $timeout(fireAll, options.receiveInterval, true)['finally'](function() {
                    firePromise = null;
                });
            }
        }

        return {
            start: newSocket,
            send: send,
            on: on,
            socket: function() {
                return socket;
            }
        };
    }


    this.$get = socketFactory;

    this.configure = function(opt) {
        angular.extend(options, opt);
    };

});