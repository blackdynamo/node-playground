var _ = require("underscore"),
    _s = require("underscore.string");

function parse(map, line) {
    var parsed = {};

    var items = line.split('|');

    _.each(map, function (index, name) {
        parsed[name] = _s.clean(items[index]);
    });

    return parsed;
}

module.exports = function (context, next) {
    var mappings = {
        "2580": {
            FipsCode: 0, FipsSubCode: 1, ApnUnformatted: 2, ApnSequenceNumber: 3, ApnFormatted: 4, OriginalApn: 5, AccountNumber: 6, MapReference1: 7, MapReference2: 8, CensusTract: 9, CensusBlockGroup: 10, CensusBlock: 11, CensusBlockSuffix: 12, Zoning: 13, BlockNumber: 14, LotNumber: 15, Range: 16, Township: 17, Section: 18, QuarterSection: 19, ThomasBrosMapNumber: 20, FloodZoneCommunityPanelId: 21, Latitude: 22, Longitude: 23, CentroidCode: 24, HomesteadExempt: 25, AbsenteeIndicatorCode: 26, TaxCodeArea: 27, UniversalLandUseCode: 28, CountyLandUse1: 29, CountyLandUse2: 30, PropertyIndicatorCode: 31, MunicipalityName: 32, View: 33, LocationInfluenceCode: 34, NumberOfBuildings: 35, SubdivisionTractNumber: 36, SubdivisionPlatBook: 37, SubdivisionPlatPage: 38, SubdivisionName: 39, PropertyAddressIndicator: 40, PropertyHouseNumberPrefix: 41, PropertyHouseNumber: 42, PropertyHouseNumberSuffix: 43, PropertyDirection: 44, PropertyStreetName: 45, PropertyMode: 46, PropertyQuadrant: 47, PropertyApartmentUnitNumber: 48, PropertyCity: 49, PropertyState: 50, PropertyZipCode: 51, PropertyCarrierRoute: 52, PropertyMatchCode: 53, OwnerCorporateIndicatorFlag: 54, OwnerName: 55, OwnerName2: 56, OwnerName_1: 57, OwnerName_2: 58, OwnerPhone: 59, OwnerPhoneOptOutFlag: 60, OwnerEtalIndicatorCode: 61, OwnerOwnershipRightsCode: 62, OwnerRelationshipTypeCode: 63, MailHouseNumberPrefix: 64, MailHouseNumber: 65, MailHouseNumberSuffix: 66, MailDirection: 67, MailStreetName: 68, MailMode: 69, MailQuadrant: 70, MailApartmentUnitNumber: 71, MailCity: 72, MailState: 73, MailZipCode: 74, MailCarrierRoute: 75, MailMatchCode: 76, MailOptOutFlag: 77, TotalValueCalculated: 78, LandValueCalculated: 79, ImprovementValueCalculated: 80, TotalValueCalculatedIndicator: 81, LandValueCalculatedIndicator: 82, ImprovementValueCalculatedCode: 83, AssdTotalValue: 84, AssdLandValue: 85, AssdImprovementValue: 86, MktTotalValue: 87, MktLandValue: 88, MktImprovementValue: 89, ApprTotalValue: 90, ApprLandValue: 91, ApprImprovementValue: 92, TaxAmount: 93, TaxYear: 94, BatchId: 95, BatchSeq: 96, DocumentYear: 97, DocumentNumber: 98, BookPage: 99, SalesDocumentTypeCode: 100, RecordingDate: 101, SaleDate: 102, SaleAmount: 103, SaleCode: 104, SellerName: 105, SalesTransactionTypeCode: 106, MultiApnFlagCode: 107, MultiApnCount: 108, TitleCompanyCode: 109, TitleCompanyName: 110, ResidentialModelIndicatorFlag: 111, FirstMortgageAmount: 112, FirstMortgageDate: 113, FirstMortgageLoanTypeCode: 114, FirstMortgageDeedTypeCode: 115, FirstMortgageTermCode: 116, FirstMortgageTerm: 117, FirstMortgageDueDate: 118, FirstMortgageAssumptionAmount: 119, FirstMortgageLenderCompanyCode: 120, FirstMortgageLenderName: 121, SecondMortgageAmount: 122, SecondMortgageLoanTypeCode: 123, SecondDeedTypeCode: 124, PriorSaleTransactionId: 125, PriorSaleDocumentYear: 126, PriorSaleDocumentNumber: 127, PriorSaleBookPage: 128, PriorSaleDocumentTypeCode: 129, PriorSaleRecordingDate: 130, PriorSaleDate: 131, PriorSaleAmount: 132, PriorSaleCode: 133, PriorSaleTransactionTypeCode: 134, PriorSaleMultiApnFlagCode: 135, PriorSaleMultiApnCount: 136, PriorSaleMortgageAmount: 137, PriorSaleDeedTypeCode: 138, FrontFootage: 139, DepthFootage: 140, Acres: 141, LandSquareFootage: 142, LotArea: 143, UniversalBuildingSquareFeet: 144, UniversalBuildingSquareFeetCode: 145, BuildingSquareFeet: 146, LivingSquareFeet: 147, GroundFloorSquareFeet: 148, GrossSquareFeet: 149, AdjustedGrossSquareFeet: 150, BasementSquareFeet: 151, GarageParkingSquareFeet: 152, YearBuilt: 153, EffectiveYearBuilt: 154, Bedrooms: 155, Rooms: 156, TotalBathsCalculated: 157, TotalBaths: 158, FullBaths: 159, HalfBaths: 160, OneQuarterBath: 161, ThreeQuarterBath: 162, BathFixtures: 163, AirConditioningCode: 164, BasementFinishCode: 165, BldgCode: 166, BldgImprovementCode: 167, ConditionCode: 168, ConstructionTypeCode: 169, ExteriorWallsCode: 170, FireplaceIndicatorFlag: 171, FireplaceNumber: 172, FireplaceTypeCode: 173, FoundationCode: 174, FloorCode: 175, FrameCode: 176, GarageCode: 177, HeatingCode: 178, MobileHomeIndicatorFlag: 179, ParkingSpaces: 180, ParkingTypeCode: 181, PoolFlag: 182, PoolCode: 183, QualityCode: 184, RoofCoverCode: 185, RoofTypeCode: 186, StoriesCode: 187, StoriesNumber: 188, StyleCode: 189, UnitsNumber: 190, ElectricEnergyCode: 191, FuelCode: 192, SewerCode: 193, WaterCode: 194, Legal1: 195, Legal2: 196, Legal3: 197, BasementFinish: 198, BasementBedrooms: 199, BasementFullBaths: 200, BasementHalfBaths: 201, BasementRooms: 202, BasementDescription: 203, BasementCode: 204
        },
        "1080": {
            FipsCode: 0, FipsSubCode: 1, MunicipalityCode: 2, ApnUnformatted: 3, ApnFormatted: 4, ApnSequenceNumber: 5, OriginalApn: 6, AccountNumber: 7, OwnerCorporateIndicator: 8, OwnerBuyerLastName: 9, OwnerBuyerFirstName: 10, OwnerEtalIndicatorCode: 11, OwnerCoName: 12, OwnerOwnershipRightsCode: 13, OwnerRelationshipTypeCode: 14, MailHouseNumberPrefix: 15, MailHouseNumber: 16, MailHouseNumberSuffix: 17, MailStreetDirection: 18, MailStreetName: 19, MailMode: 20, MailQuadrant: 21, MailApartmentUnitNumber: 22, MailCity: 23, MailState: 24, MailZipcode: 25, MailCarrierRoute: 26, MailMatchCode: 27, PropertyAddressIndicator: 28, PropertyHouseNumberPrefix: 29, PropertyHouseNumber: 30, PropertyHouseNumberSuffix: 31, PropertyStreetName: 32, PropertyMode: 33, PropertyDirection: 34, PropertyQuadrant: 35, PropertyApartmentUnitNumber: 36, PropertyCity: 37, PropertyState: 38, PropertyZipCode: 39, PropertyCarrierRoute: 40, BatchId: 41, BatchSeq: 42, DocumentYear: 43, SellerName: 44, SaleAmount: 45, MortgageAmount: 46, SaleDate: 47, RecordingDate: 48, DocumentTypeCode: 49, TransactionTypeCode: 50, DocumentNumber: 51, BookPage: 52, LenderLastName: 53, LenderFirstName: 54, LenderAddress: 55, LenderCity: 56, LenderState: 57, LenderZipcode: 58, LenderCompanyCode: 59, SaleCode: 60, OwnerBuyerMiddleInitial: 61, Filler01: 62, MultiApnFlagCode: 63, MultiApnCount: 64, TitleCompanyCode: 65, ResidentialModelIndicatorFlag: 66, MortgageDate: 67, MortgageLoanTypeCode: 68, MortgageDeedTypeCode: 69, MortgageTermCode: 70, MortgageTerm: 71, MortgageDueDate: 72, MortgageAssumptionAmount: 73, SecondMortgageAmount: 74, SecondMortgageLoanTypeCode: 75, SecondMortgageDeedTypeCode: 76, PriorDocYear: 77, PriorDocNumber: 78, PriorBookPage: 79, PriorSalesDocumentType: 80, PriorRecordingDate: 81, PriorSalesDate: 82, PriorSalesAmount: 83, PriorSalesCode: 84, PriorSalesTransactionType: 85, PriorMultiApnFlagCode: 86, PriorMultiApnCount: 87, PriorMortgageAmount: 88, PriorMortgageDeedTypeCode: 89, AbsenteeIndicatorCode: 90, PropertyIndicatorCode: 91, BuildingSquareFeet: 92, PartialInterestIndicatorFlag: 93, OwnershipTransferPercentage: 94, UniversalLandUseCode: 95, PrimarySaleCategoryCode: 96, MortgageInterestRateType: 97, TitleCompanyName: 98, SellerCarryBackFlag: 99, PrivatePartyLenderFlag: 100, ConstructionLoanFlag: 101, ResaleNewConstructionCode: 102, InterFamilyFlag: 103, CashMortgagePurchaseCode: 104, ForclosureCode: 105, RefiFlagCode: 106, EquityFlagCode: 107, CensusTract: 108, CensusBlockGroup: 109, CensusBlock: 110, CensusBlockSuffix: 111, Latitude: 112, Longitude: 113, RecordTypeCode: 114, Filler02: 115
        }
    };

    context.message.Entry = parse(mappings[context.type], context.message.EntrySource);
    next();
};