module.exports = function(context, next) {
    context.message.Entry.ApnUnformatted = context.message.Entry.ApnUnformatted.replace(/\s/gi,'');

    next();
};