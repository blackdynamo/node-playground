var path = require("path"),
    workerProcess = require('../../worker-process');

workerProcess.handshake(function (config, done) {
    var Mediator = require("./mediator");
    var mediator = new Mediator(config);
    mediator.init();

    done();
});