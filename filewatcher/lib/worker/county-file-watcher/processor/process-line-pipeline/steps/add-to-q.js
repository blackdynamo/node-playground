var messageBroker = require('../../../message-broker');

module.exports = function (context, next) {
    var borker = messageBroker.create();

//    borker.publish(context.config.amqp.publishTo, context.message, context.config.amqp.options);
    borker.publish("DonnoQ", context.message, context.config.amqp.options);
    next();
};