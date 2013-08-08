var util = require("util"),
    Transform = require("stream").Transform,
    _ = require("underscore"),
    uuid = require("node-uuid"),
    winston = require("winston"),
    byline = require("byline"),
    ProcessLinePipeline = require("./process-line-pipeline");

function ParseLine(context) {
    this._context = context;

    Transform.call(this, {objectMode: true});
}

util.inherits(ParseLine, Transform);

ParseLine.prototype._transform = function (chunk, encoding, done) {
    var me = this;

    me._context.lineCount++;

    var pipelineContext = _.extend({
        message: {
            TransactionId: uuid.v1(),
            ExactMatch: false,
            EntrySource: chunk.toString()
        }
    }, me._context);

    new ProcessLinePipeline(pipelineContext).execute(function (err) {
        if (err)
            winston.info(err);
        else
            me.push(pipelineContext);


        done();
    });
};

module.exports = function (context) {
    return new ParseLine(context);
};