var path = require("path");

process.env.NODE_CONFIG_DIR = path.resolve(__dirname, "config");

var CONFIG = require("config"),
    cloudServices = require("./lib"),
    _ = require("underscore"),
    cli = cloudServices.cli;

var winston = require("winston");

winston.cli();
winston.remove(winston.transports.Console);
if (!CONFIG.silent) {
    winston.add(winston.transports.Console, {
        level:CONFIG.logLevel,
        colorize:true,
        handleExceptions:false,
        timestamp:true
    });
}

if (CONFIG.fileLogging) {
    winston.add(winston.transports.File, {
        filename:CONFIG.fileLogging.file,
        level:CONFIG.fileLogging.logLevel,
        colorize:true,
        handleExceptions:true,
        timestamp:true
    });
}

var workers = CONFIG.workers || {};

_(workers).each(function(config, worker){

    if(!config.enabled)
        return;

    winston.info("starting:", worker);

    var workerProcess = new cloudServices.WorkerProcess(worker, cloudServices.getWorkerFile(worker));
    workerProcess.setConfig(config.options)
        .setGlobalConfig(CONFIG)
        .forever()
        .start();
});

winston.info("Server:", process.pid);