var util = require("util"),
    Writable = require("stream").Writable,
    messageBroker = require('../../message-broker');

function PublishLine(config) {
    Writable.call(this, {objectMode: true});

    this._config = config;
}

util.inherits(PublishLine, Writable);

PublishLine.prototype._write = function (chunk, encoding, done) {
    var borker = messageBroker.create();
//
//    //    borker.publish(context.config.amqp.publish.to, context.message, context.config.amqp.publish.options);
    borker.publish("DonnoQ", chunk.message, this._config.amqp.publish.options, function(){
        console.log("here");
    });

    done();
};

module.exports = function (config) {
    return new PublishLine(config);
};