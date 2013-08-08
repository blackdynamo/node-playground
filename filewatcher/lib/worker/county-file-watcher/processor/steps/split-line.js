var byline = require("byline");

module.exports = function () {
    console.log("splitting the line!");
    return new byline.LineStream();
};