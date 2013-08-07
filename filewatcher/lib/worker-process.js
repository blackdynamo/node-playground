var childProcess = require('child_process'),
    events = require('events'),
    _ = require("underscore"),
    os = require('os'),
    util = require('util');

var winston = require("winston");

WorkerState = {
    NOTSTARTED:'notstarted',
    READY:    'ready',
    STARTING: 'starting',
    STARTED:'started',
    ABORT:'abort',
    EXIT: "exit"
};
exports.WorkerState = WorkerState;

exports.handshake = function(launcher){

    process.on("uncaughtException", function(err){
        winston.error('Process ' + process.pid + " " + err.stack);
        process.send(WorkerState.ABORT);
    });

    process.on("message", function(config){
        config = JSON.parse(config);
        process.env = config.global.env;
        configLog(config.global);
        launcher(config, function(){
            process.send(WorkerState.STARTED);
        });
    });

    process.send(WorkerState.READY);
};

function configLog(config){
    winston.remove(winston.transports.Console);
    winston.add(winston.transports.Console, {
        level:config.logLevel,
        colorize:true,
        handleExceptions:false
    });
};

/**
 * Encapsulates a worker process. Manages state and notifying listeners of
 * changes in state.
 */
function WorkerProcess(name, workerScript) {
    var self = this;
    self.name = name;
    this.workerScript = workerScript;
    this.config = {
        retryAfter:10000
    };
    this.status = WorkerState.NOTSTARTED;

    self.on(WorkerState.READY, function(){
        self.send(JSON.stringify(self.config));
    });

    events.EventEmitter.call(self);
}
util.inherits(WorkerProcess, events.EventEmitter);

WorkerProcess.prototype.setConfig = function(config){
    var self = this;
    self.config.process = _.extend({
        retryAfter:10000
    }, config);
    return self;
};

WorkerProcess.prototype.setGlobalConfig = function(config){
    var self = this;
    self.config.global = _.extend({}, {
        env:process.env
    }, config);
    return self;
};

WorkerProcess.prototype.start = function(){
    var self = this;
    self.process = childProcess.fork(self.workerScript);
    self.pid = self.process.pid;
    self.status = WorkerState.STARTING;

    winston.info('Started: ' + self.name +  " " + self.process.pid);

    self.process.on("message", function(message){
        if(message === WorkerState.READY || message === WorkerState.STARTED || message === WorkerState.STARTING || message === WorkerState.EXIT || message === WorkerState.ABORT)
            self.emit(message);
        else
            self.emit('message', message);
    });

    self.process.on('exit', function(code){
        console.log('child exited', code);
    });

    return self;
};

WorkerProcess.prototype.forever = function(){
    var self = this;

    self.on(WorkerState.ABORT, function(message){
        var pid = self.process ? self.process.pid : "unknown";
        winston.info("Aborted: " + self.name + " " + pid);
        if(self.process) {
            self.process.kill();
            delete self.process;
        }

        setTimeout(function(){
            self.start();
        },self.config.process.retryAfter);
    });
    return self;
};

WorkerProcess.prototype.send = function (message) {
    this.process.send(message);
};

exports.WorkerProcess = WorkerProcess;