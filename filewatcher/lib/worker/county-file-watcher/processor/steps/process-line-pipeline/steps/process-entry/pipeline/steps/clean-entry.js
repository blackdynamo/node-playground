var _ = require("underscore"),
    _s = require("underscore.string");

function clean(entry, map) {
    _.each(map, function (value, key) {
        entry[key] = _s.lstrip(entry[key], value);
    });
}

module.exports = function (context, next) {
    var trimmings = {
        "2580": {
            PropertyStreetName: '0', PropertyHouseNumber: '0', PropertyHouseNumberSuffix: '0', PropertyApartmentUnitNumber: '0', FrontFootage: '0', DepthFootage: '0', Acres: '0', LandSquareFootage: '0', BuildingSquareFeet: '0', LivingSquareFeet: '0', BasementSquareFeet: '0', GarageParkingSquareFeet: '0', Rooms: '0', Bedrooms: '0', FullBaths: '0', HalfBaths: '0', BasementRooms: '0', BasementBedrooms: '0', BasementFullBaths: '0', BasementHalfBaths: '0', AssdImprovementValue: '0', AssdLandValue: '0', AssdTotalValue: '0', YearBuilt: '0', EffectiveYearBuilt: '0', TaxAmount: '0', TaxYear: '0', RecordingDate: '0', SaleDate: '0', SaleAmount: '0', PriorSaleRecordingDate: '0', PriorSaleDate: '0', PriorSaleAmount: '0', BatchSeq: '0'
        },
        "1080": {
            PropertyApartmentUnitNumber: '0', PropertyHouseNumber: '0', PropertyHouseNumberSuffix: '0', PropertyHouseNumberPrefix: '0', PropertyStreetName: '0', BatchSeq: '0', SaleAmount: '0', MortgageAmount: '0', MultiApnCount: '0', MortgageDate: '0', MortgageTerm: '0', MortgageDueDate: '0', MortgageAssumptionAmount: '0', SecondMortgageAmount: '0', PriorSalesAmount: '0', PriorMortgageAmount: '0', BuildingSquareFeet: '0'
        }
    };

    clean(context.message.Entry, trimmings[context.type]);

    next();
};