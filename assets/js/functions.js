function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
module.exports.validateEmail = validateEmail;

function validateInput(email, password) {
    if ((validateEmail(email)) && (email !== "") && (password !== "") && (email) && (password))
        return true;
    else
        return false;
}

module.exports.validateInput = validateInput;

function validateRegisterProfile(dataObject) {
    if (!dataObject.fullName || dataObject.fullName === "" || dataObject.fullName.length > 50)
        return "Please enter a valid full name with appropiate length"

    if (!dataObject.address1 || dataObject.address1 === "" || dataObject.address1.length > 100)
        return "Please enter a valid street address 1 with appropiate length"

    if (dataObject.address2 && dataObject.address2.length > 100)
        return "Please enter a valid street address 2 with appropiate length"

    if (!dataObject.city || dataObject.city === "" || dataObject.city.length > 100)
        return "Please enter a valid city with appropiate length"

    if (!dataObject.state || dataObject.state === "" || dataObject.state.length > 2)
        return "Please enter a valid state"

    if (!dataObject.zipcode || dataObject.zipcode === "" || dataObject.zipcode.length < 5 || dataObject.zipcode.length > 9)
        return "Please enter a valid zip code with appropiate length"

    else
        return "true"

}

module.exports.validateRegisterProfile = validateRegisterProfile;

function validQouteRequested(gallons, deliveryDate) {
    if ((gallons !== "") && (Number(gallons) > 0) && (deliveryDate !== ""))
        return true;
    else
        return false;
}
module.exports.validQouteRequested = validQouteRequested;