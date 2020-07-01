var emailCheck = require('../../assets/js/functions.js');

describe("Email Verification tests ", function() {
    var email

    it("Should return true if valid email with prefix@.com", function() {
        email = "a@a.com"
        var result = emailCheck.validateEmail(email);

        expect(result).toEqual(true);
    });

    it("should return false if an invalid email is used", function() {
        email = "bbb"
        var result = emailCheck.validateEmail(email);

        expect(result).toEqual(false);
    });
});