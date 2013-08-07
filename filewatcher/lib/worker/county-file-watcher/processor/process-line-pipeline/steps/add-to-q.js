var messageBroker = require('../../../message-broker');

module.exports = function (context, next) {
    var borker = messageBroker.create();

//    borker.publish(context.config.amqp.publish.to, context.message, context.config.amqp.publish.options);
    borker.publish("DonnoQ", context.message, context.config.amqp.publish.options);

    next();
};