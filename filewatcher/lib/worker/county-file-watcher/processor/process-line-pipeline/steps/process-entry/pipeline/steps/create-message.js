var uuid = require("node-uuid");

module.exports = function (context, next) {
    context.message = {
        TransactionId: uuid.v1(),
        ExactMatch: false,
        EntrySource: context.line
    };

    delete context.line;

    next();
};