var registerProfileCheck = require('../../assets/js/functions.js');
var appConstructor = require('../../app')

describe("Registering Profile Verification tests ", function() {
    var dataobject = {
        fullName: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipcode: ""
    };

    it("Should return Please enter a valid full name with appropiate length if invalid fullName", function() {
        var result = registerProfileCheck.validateRegisterProfile(dataobject);
        expect(result).toEqual("Please enter a valid full name with appropiate length");
    });

    it("Should return Please enter a valid full name with appropiate length if invalid fullName", function() {
        dataobject.fullName = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        var result = registerProfileCheck.validateRegisterProfile(dataobject);

        expect(result).toEqual("Please enter a valid full name with appropiate length");
    });


    it("Should return Please enter a valid street address 1 with appropiate length if invalid street address 1", function() {
        dataobject.fullName = "aaa"
        var result = registerProfileCheck.validateRegisterProfile(dataobject);
        expect(result).toEqual("Please enter a valid street address 1 with appropiate length");
    });

    it("Should return Please enter a valid street address 1 with appropiate length if invalid street address 1", function() {
        dataobject.fullName = "aaa"
        dataobject.address1 = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        var result = registerProfileCheck.validateRegisterProfile(dataobject);
        expect(result).toEqual("Please enter a valid street address 1 with appropiate length");
    });

    it("Should return Please enter a valid street address 2 with appropiate length if invalid street address 2", function() {
        dataobject.fullName = "aaa"
        dataobject.address1 = "aaa"
        dataobject.address2 = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        var result = registerProfileCheck.validateRegisterProfile(dataobject);
        expect(result).toEqual("Please enter a valid street address 2 with appropiate length");
    });

    it("Should return Please enter a valid city with appropiate length if invalid city", function() {
        dataobject.fullName = "aaa"
        dataobject.address1 = "aaa"
        dataobject.address2 = "aaa"
        dataobject.city = ""
        var result = registerProfileCheck.validateRegisterProfile(dataobject);
        expect(result).toEqual("Please enter a valid city with appropiate length");
    });

    it("Should return Please enter a valid city with appropiate length if invalid city", function() {
        dataobject.fullName = "aaa"
        dataobject.address1 = "aaa"
        dataobject.address2 = "aaa"
        dataobject.city = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        var result = registerProfileCheck.validateRegisterProfile(dataobject);
        expect(result).toEqual("Please enter a valid city with appropiate length");
    });

    it("Should return Please enter a valid state if invalid state", function() {
        dataobject.fullName = "aaa"
        dataobject.address1 = "aaa"
        dataobject.address2 = "aaa"
        dataobject.city = "aaa"
        dataobject.state = ""
        var result = registerProfileCheck.validateRegisterProfile(dataobject);
        expect(result).toEqual("Please enter a valid state");
    });

    it("Should return Please enter a valid state if invalid state", function() {
        dataobject.fullName = "aaa"
        dataobject.address1 = "aaa"
        dataobject.address2 = "aaa"
        dataobject.city = "aaa"
        dataobject.state = "TAA"
        var result = registerProfileCheck.validateRegisterProfile(dataobject);
        expect(result).toEqual("Please enter a valid state");
    });

    it("Should return Please enter a valid zip code with appropiate length", function() {
        dataobject.fullName = "aaa"
        dataobject.address1 = "aaa"
        dataobject.address2 = "aaa"
        dataobject.city = "aaa"
        dataobject.state = "TX"
        dataobject.zipcode = ""
        var result = registerProfileCheck.validateRegisterProfile(dataobject);
        expect(result).toEqual("Please enter a valid zip code with appropiate length");
    });

    it("Should return Please enter a valid zip code with appropiate length", function() {
        dataobject.fullName = "aaa"
        dataobject.address1 = "aaa"
        dataobject.address2 = "aaa"
        dataobject.city = "aaa"
        dataobject.state = "TX"
        dataobject.zipcode = "01"
        var result = registerProfileCheck.validateRegisterProfile(dataobject);
        expect(result).toEqual("Please enter a valid zip code with appropiate length");
    });

    it("Should return Please enter a valid zip code with appropiate length", function() {
        dataobject.fullName = "aaa"
        dataobject.address1 = "aaa"
        dataobject.address2 = "aaa"
        dataobject.city = "aaa"
        dataobject.state = "TX"
        dataobject.zipcode = "01000000000000000000000000"
        var result = registerProfileCheck.validateRegisterProfile(dataobject);
        expect(result).toEqual("Please enter a valid zip code with appropiate length");
    });


    it("Should return true if valid inputs for all fields", function() {
        dataobject.fullName = "aaa"
        dataobject.address1 = "aaa"
        dataobject.address2 = "aaa"
        dataobject.city = "aaa"
        dataobject.state = "TX"
        dataobject.zipcode = "111111"
        var result = registerProfileCheck.validateRegisterProfile(dataobject);
        expect(result).toEqual("true");
    });

});

describe("App Constructor Test", function() {
    it("Should return nothing", function() {
        var result = new appConstructor.user("123@gmail.com", "Mayoor", 1, 1);
        expect(result).isNot(null);
    })
});