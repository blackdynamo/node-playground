var config = require("config"),
	fs = require("fs"),
	unzip = require("unzip"),
	byline = require("byline"),
	stream = require("stream"),
	messageBroker = require("./lib/worker/county-file-watcher/message-broker"),
	util = require("util"),
	path = require("path");

var resolved = path.resolve(__dirname, "toWatch/MAC25003.zip");

var readStream = fs.createReadStream(resolved),
	unzipParser = unzip.Parse();

function TimeoutWriter(options){
	stream.Writable.call(this, options);
}

util.inherits(TimeoutWriter, stream.Writable);

TimeoutWriter.prototype._write = function(chunk, encoding, callback){
	console.log(chunk.toString());
	setTimeout(function(){
		callback();
	}, 1000);
};

// note - this guy hasn't been tested at all, but should give
// you a reference point for writing your own rabbit writer stream
function RabbitWriter(options){
	stream.Writable.call(this, options);
	// todo - not sure if this is right
	this._messageBroker = messageBroker.create(config.amqp);
}

util.inherits(RabbitWriter, stream.Writable);

RabbitWriter.prototype._write = function(chunk, encoding, callback){
	// todo - you will probably need to do a JSON.parse here as this will be a binary
	// todo - there is a objectMode that you could use that would let it
	this._messageBroker.publish("someQ", JSON.parse(chunk), {}, callback);
};

unzipParser.on("entry", function (entry) {
	var wrapped = new stream.Readable().wrap(entry);
	// note - the byline.LineStream is not behaving properly as it doesn't fire
	// an end event properly making it impossible to know when the file has finished being processed
	// when byline is removed then the "close" event fires
	var lineStream = new stream.Readable().wrap(new byline.LineStream());
	var timeoutWriter = new TimeoutWriter();
	var rabbitWriter = new RabbitWriter();

	wrapped
		.pipe(lineStream)
		// note - can swap between rabbit writer and timeout writer
		// timeout writer is just to show how a delay on the writer (i.e. backpressure)
		// can be handled correctly
//		.pipe(rabbitWriter)
		.pipe(timeoutWriter);
});

readStream
	.pipe(unzipParser)
	.on("close", function () {
		console.log("closed");
	});
