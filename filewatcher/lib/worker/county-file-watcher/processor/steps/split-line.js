var byline = require("byline"),
    winston = require("winston");

module.exports = function () {
    winston.info("Splitting Lines");

    return new byline.LineStream();
};