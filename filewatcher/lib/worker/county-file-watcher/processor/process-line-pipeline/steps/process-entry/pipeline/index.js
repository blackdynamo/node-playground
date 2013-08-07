var pipeline = require("simple-pipeline"),
    steps = require("./steps");

function Pipeline(context) {
    this._context = context;

    this._pipeline = pipeline()
        .use(steps.createMessage)
        .use(steps.parseLine)
        .use(steps.cleanEntry)
        .use(steps.validateEntry)
        .use(steps.extractZipCode)
        .use(steps.cleanUnformatedApn)
        .use(steps.cleanHouseNumberSuffix);
}

Pipeline.prototype.execute = function (cb) {
    this._pipeline.execute(this._context, cb);
};


module.exports = Pipeline;