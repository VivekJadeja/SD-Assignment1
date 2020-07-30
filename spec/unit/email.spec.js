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

    it("should return true if an valid email and password is used", function() {
        email = "bbb@b.com"
        password = "123"
        var result = emailCheck.validateInput(email, password);

        expect(result).toEqual(true);
    });

    it("should return false if no email is used", function() {
        email = "";
        var result = emailCheck.validateEmail(email);

        expect(result).toEqual(false);
    });

});