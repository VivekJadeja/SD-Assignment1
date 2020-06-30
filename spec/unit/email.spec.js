var emailCheck = require('../../app.js');

describe("Email Verification tests ", function() {
    var email

    it("Should return true if valid email with prefix@.com", function() {
        email = "a@a.com"
        var result = emailCheck.validateEmail(email);

        expect(result).toEqual(true);
    });

    it("should return undefined for numberB equals 0", function() {
        email = "bbb"
        var result = emailCheck.validateEmail(email);

        expect(result).toEqual(false);
    });
});