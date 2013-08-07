var winston = require("winston");

function InvalidProcessor(context){
    this._context = context;
}

InvalidProcessor.prototype.process = function(){
    winston.error("Invalid Processor Context: ", this._context);
};

module.exports = InvalidProcessor;