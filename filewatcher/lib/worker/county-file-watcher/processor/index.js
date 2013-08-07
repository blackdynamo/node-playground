var Processor = require("./processor"),
    InvalidProcessor = require("./invalid-processor");

module.exports = {
    create: function (config, context) {
        config = config[context.type];
        if (!config) return new InvalidProcessor(context);

        return new Processor(config, context);
    }
};