var events = require("events"),
    _ = require("underscore"),
    winston = require("winston"),
    chokidar = require("chokidar");

function Watcher(path) {
    var options = {
        ignored: /\/\.[\/\w\d]*$/,
        persistent: true
    };

    this._watcher = chokidar.watch(path, options);
}

Watcher.prototype.watch = function () {
    var me = this;

    me._watcher
        .on('add', function (f, stats) {
            winston.info("New File Dropped");
            me.emit("file::new", f, stats);
        });
};

_.extend(Watcher.prototype, events.EventEmitter.prototype);

module.exports = Watcher;