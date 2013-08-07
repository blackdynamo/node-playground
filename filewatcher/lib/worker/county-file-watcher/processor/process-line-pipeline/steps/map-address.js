var _s = require("underscore.string");

module.exports = function (context, next) {
    context.message.City = context.message.Entry.PropertyCity;
    context.message.State = context.message.Entry.PropertyState;
    context.message.ZipCode = context.message.Entry.PropertyZipCode;
    context.message.Street = _s.clean(_s.sprintf("%(PrimaryNumber)s %(Predirectional)s %(StreetName)s %(Suffix)s %(Postdirectional)s", {
        PrimaryNumber: _s.sprintf("%(PropertyHouseNumberPrefix)s%(PropertyHouseNumber)s%(PropertyHouseNumberSuffix)s", context.message.Entry),
        Predirectional: context.message.Entry.PropertyDirection,
        StreetName: context.message.Entry.PropertyStreetName,
        Suffix: context.message.Entry.PropertyMode,
        Postdirectional: context.message.Entry.PropertyQuadrant
    }));
    context.message.Street2 = context.message.Entry.PropertyApartmentUnitNumber ? _s.sprintf("# %(PropertyApartmentUnitNumber)s", context.message.Entry) : "";
    
    next();
};