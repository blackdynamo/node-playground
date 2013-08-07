var fs = require("fs"),
    amqp = require("amqp"),
    _ = require("underscore"),
    unzip = require("unzip"),
    byline = require("byline"),
    winston = require("winston"),
    ProcessLinePipeline = require("./process-line-pipeline");

function Processor(config, context) {
    this._config = config;
    this._context = context;
}

Processor.prototype.process = function () {
    var me = this;

    var readStream = fs.createReadStream(me._context.path);

    readStream
        .pipe(unzip.Parse())
        .on("entry", _.bind(processFile, me))
        .on("close", function () {
            console.log("DONE!");
        });
};

function processFile(entry) {
    var me = this;

    _.extend(me._context, {
        lineCount: 0,
        config: me._config
    });

    if (entry.type === "File") {
        var lineStream = new byline.LineStream();
        lineStream.on("data", _.bind(function (buffer) {
            me._context.line = buffer.toString();
            processLine.call(this, me._context);
        }, this));

        entry.pipe(lineStream);
    }
    else
        entry.autodrain();
}

function processLine(context) {
    context.lineCount++;

    new ProcessLinePipeline(context).execute(function (err, context) {
//        if (err) winston.error(err);
    });
}

module.exports = Processor;