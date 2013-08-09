var fs = require("fs"),
    _ = require("underscore"),
    winston = require("winston"),
    unzip = require("unzip"),
    steps = require("./steps");

function Processor(config, context) {
    this._config = config;
    this._context = context;
}

Processor.prototype.process = function () {
    var me = this;

    var readStream = fs.createReadStream(me._context.path);

    readStream
        .pipe(unzip.Parse())
        .on("entry", function (entry) {
            if (entry.type === "File") {

                var context = _.extend({}, me._context, {
                    lineCount: 0
                });

                entry
                    .pipe(steps.splitLine())
                    .pipe(steps.processLine(context))
                    .pipe(steps.publishLine(me._config))
                    .on("error", function(err){
                        winston.error(err);
                    })
                    .on("finish", function () {
                        winston.info("Done");
                    });
            }
            else
                entry.autodrain();

        });
};

module.exports = Processor;