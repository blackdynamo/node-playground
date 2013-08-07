module.exports = function (context, next) {
    if (!context.message.Entry.PropertyHouseNumber)
        return next('Missing primary number');

    if (!context.message.Entry.PropertyStreetName)
        return next('Missing property street name');

    next();
};