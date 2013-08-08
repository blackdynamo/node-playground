var util = require("util"),
    Writable = require("stream").Writable;

function PublishLine() {
    Writable.call(this, {objectMode: true});
}

util.inherits(PublishLine, Writable);

PublishLine.prototype._write = function (chunk, encoding, done) {
    console.log(chunk.message);

    done();
};

module.exports = function () {
    return new PublishLine();
};


/*

 var messageBroker = require('../../../message-broker');

 module.exports = function (context, next) {
 var borker = messageBroker.create();

 //    borker.publish(context.config.amqp.publish.to, context.message, context.config.amqp.publish.options);
 borker.publish("DonnoQ", context.message, context.config.amqp.publish.options);

 next();
 };
    */