var path = require("path"),
    _ = require("underscore"),
    moment = require("moment"),
    Watcher = require("./watcher"),
    processor = require("./processor");

function Mediator(config){
    this._config = config.process;

    this._watcher = new Watcher(this._config.pathToWatch);
    this._watcher.on("file::new", _.bind(handleNewFile, this));
}

Mediator.prototype.init = function(){
    this._watcher.watch();
};

function handleNewFile(f, stats){
    var matchesFileType = !this._config.fileType || path.extname(f).replace(".", "") === this._config.fileType;
    if(matchesFileType){
        var context = {
            dateProcessed: moment().valueOf(),
            datePublished: moment(stats.mtime).valueOf(),
            path: f,
            type: getType(f)
        };

        processor.create(this._config.processingTypes, context).process();
    }
}

function getType(path){
    var items = path.split("/");
    return items[items.length-2];
}

module.exports = Mediator;