var optimist = require("optimist");

var argv = optimist
    .usage("Launch a address validator.\n Usage: $0")
    .alias("s", "source")
    .describe("s", "Source to validate addresses from")
    .describe("single", "Run as a single instance")
    .argv;

exports.runInCluster = function(){
    return !argv.single;
};

exports.apply = function (config) {
    if(argv.source)
        config.AddressValidator.source = argv.source;
    return config;
}