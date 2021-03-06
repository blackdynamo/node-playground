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

var queues = {};

MessageBroker.prototype._getQ = function (queueName) {
    var me = this;

    if (!queues[queueName]) {
        queues[queueName] = foo.Deferred();
        me._deferred
            .done(function () {
                me._connection.queue(queueName, defaultQueueOptions, function () {
                    queues[queueName].resolve();
                });
            })
            .fail(function (err) {
                throw err;
            });
    }

    return queues[queueName];
};

MessageBroker.prototype.publish = function (queueName, message, options, cb) {
    var me = this;

    me._getQ(queueName)
        .done(function () {
            me._connection.publish(queueName, message, _.extend({}, defaultPublishOptions, options));
            cb();
        });
};

var messageBroker;

module.exports = {
    create: function (config) {
        if (!messageBroker) messageBroker = new MessageBroker(config);

        return messageBroker;
    }
};


