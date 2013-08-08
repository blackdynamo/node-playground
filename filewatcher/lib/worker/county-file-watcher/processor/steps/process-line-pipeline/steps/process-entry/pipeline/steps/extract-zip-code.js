module.exports = function (context, next) {
    context.message.Entry.PropertyZipCode = context.message.Entry.PropertyZipCode || "";

    if (context.message.Entry.PropertyZipCode.length > 5)
        context.message.Entry.PropertyZipCode = context.message.Entry.PropertyZipCode.substring(0, 5);
    
    next();
};