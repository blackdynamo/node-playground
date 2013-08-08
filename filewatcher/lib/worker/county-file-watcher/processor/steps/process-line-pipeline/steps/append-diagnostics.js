var path = require("path");

module.exports = function (context, next) {
    context.message.Diagnostics = {
        datePublished: context.datePublished,
        dateProcessed: context.dateProcessed,
        path: context.path,
        type: context.type,
        File: getFile(context.path),
        LineNumber: context.lineCount
    };

    next();
};

function getFile(filePath) {
    return path.basename(filePath);
}