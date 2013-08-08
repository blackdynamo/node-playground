var _ = require("underscore"),
    foo = require('jquery-deferred'),
    config = require('config'),
    amqp = require('amqp');

var defaultQueueOptions = {durable: true, autoDelete: false};
var defaultPublishOptions = {"contentType": "application/json", "deliveryMode": 2};

function MessageBroker(amqpConfig) {
    var me = this;
    me.config = amqpConfig || config.amqp;

    me._deferred = foo.Deferred();
    createConnection.call(me);
}

function createConnection() {
    var me = this;
    me._connection = amqp.createConnection(me.config);
    me._connection.on('ready', function () {
        me._deferred.resolve(me._connection);
    });
    me._connection.on('error', function (err) {
        me._deferred.reject(err);
    });
}

MessageBroker.prototype.publish = function (queueName, message, options, cb) {
    var me = this;

    me._deferred
        .done(function () {
            me._connection.queue(queueName, defaultQueueOptions, function () {
                me._connection.publish(queueName, {foo:"bar"}, _.extend({}, defaultPublishOptions, options));
            });
        })
        .fail(function (err) {
            throw err;
        });
};

var messageBroker;

module.exports = {
    create: function (config) {
        if (!messageBroker) messageBroker = new MessageBroker(config);

        return messageBroker;
    }
};


