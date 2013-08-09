var util = require("util"),
    Writable = require("stream").Writable,
    messageBroker = require('../../message-broker');

function PublishLine(config) {
    Writable.call(this, {objectMode: true});

    this._config = config;
}

util.inherits(PublishLine, Writable);

PublishLine.prototype._write = function (chunk, encoding, done) {
    //this._config.amqp.publish.to
    messageBroker
        .create()
        .publish("DonnoQ", chunk.message, this._config.amqp.publish.options, done);
};

module.exports = function (config) {
    return new PublishLine(config);
};