var path = require("path"),
    _ = require("underscore");

var exports = {
    cli: require("./cli"),
    WorkerProcess: require("./worker-process").WorkerProcess,
    getWorkerFile: function (name) {
        return path.resolve(__dirname, "worker", name, "spawn");
    }
};

module.exports = exports;