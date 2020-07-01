var validateRequestQouteCheck = require('../../app.js');
describe("Registering Profile Verification tests ", function() {
    var dataobject = {
        gallons: "",
        deliveryDate: ""
    };

    it("Should return false if gallons are 0", function() {
        dataobject.gallons = 0;
        dataobject.deliveryDate = "06/30/2020"
        var result = validateRequestQouteCheck.validQouteRequested(dataobject.gallons, dataobject.deliveryDate);
        expect(result).toEqual(false);
    });

    it("Should return false if gallons are 0", function() {
        dataobject.gallons = "";
        dataobject.deliveryDate = "06/30/2020"
        var result = validateRequestQouteCheck.validQouteRequested(dataobject.gallons, dataobject.deliveryDate);
        expect(result).toEqual(false);
    });

    it("Should return false if gallons are 0", function() {
        dataobject.gallons = 0;
        dataobject.deliveryDate = ""
        var result = validateRequestQouteCheck.validQouteRequested(dataobject.gallons, dataobject.deliveryDate);
        expect(result).toEqual(false);
    });

    it("Should return false if gallons are 0", function() {
        dataobject.gallons = 1;
        dataobject.deliveryDate = "06/30/2020"
        var result = validateRequestQouteCheck.validQouteRequested(dataobject.gallons, dataobject.deliveryDate);
        expect(result).toEqual(true);
    });

});