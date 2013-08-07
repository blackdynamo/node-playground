var pipeline = require("simple-pipeline"),
    steps = require("./steps");

function Pipeline(context) {
    this._context = context;

    this._pipeline = pipeline()
        .use(steps.processEntry)
        .use(steps.appendDiagnostics)
        .use(steps.mapAddress)
        .use(steps.addToQ);
}

Pipeline.prototype.execute = function (cb) {
    this._pipeline.execute(this._context, cb);
};


module.exports = Pipeline;