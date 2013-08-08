var fs = require("fs"),
    _ = require("underscore"),
    Throttle = require("throttle"),
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

                var throttle = new Throttle(300000);
                throttle.on("error", function(err){
                    console.log(err);
                });

                entry
                    .pipe(throttle)
                    .pipe(steps.splitLine())
                    .pipe(steps.processLine(context))
                    .pipe(steps.publishLine(me._config))
                    .on("error", function(err){
                        console.log(err);
                    })
                    .on("finish", function () {
                        console.log("finish");
                    });
            }
            else
                entry.autodrain();

        });
};

module.exports = Processor;