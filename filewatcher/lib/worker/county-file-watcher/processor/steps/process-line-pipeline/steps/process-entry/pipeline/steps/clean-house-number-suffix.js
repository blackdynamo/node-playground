var _s = require("underscore.string");

module.exports = function (context, next) {
    if (_s.contains(context.message.Entry.PropertyHouseNumber, '-')) {
        if (_s.endsWith(context.message.Entry.PropertyHouseNumber, context.message.Entry.PropertyHouseNumberSuffix))
            _s.rstrip(context.message.Entry.PropertyHouseNumber, "-" + context.message.Entry.PropertyHouseNumberSuffix);

    }

    next();
};