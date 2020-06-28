var mysql = require('mysql');

//a pool of connections 
let pool = mysql.createPool({
    host: '',
    user: 'admin',
    password: '',
    database: ''
});

signUp = function(data, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        } else {
            sql = "INSERT INTO UserCredentials VALUES(";
            sql += email;
            sql += ",";
            sql += password;
            sql += ")";
            sql += ";";
            // FINISH THE QUERY ONCE DB IS CREATED
            connection.query(sql, function(err, result) {
                if (err) {
                    connection.release();
                    callback(true);
                    return;
                } else {
                    callback(false);
                }
            });
        }
    });
}
module.exports.signUp = signUp;

getCustomerAddress = function(email, callback) {

    pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        } else {
            let sql = "SELECT address_1, address_2, city, state, zipCode, FROM ClientInformation WHERE email = ";
            sql += email;
            // FINISH THE QUERY ONCE DB IS CREATED
            connection.query(sql, function(err, result) {
                connection.release();
                if (err) {
                    callback(true);
                    return;
                } else {
                    callback(false, result);
                }
            });
        }
    });
}
module.exports.getCustomerAddress = getCustomerAddress;

getCustomerHistory = function(email, callback) {

    pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        } else {
            let sql = "SELECT ClientInformation.*, FuelQoute.* FROM ClientInformation,FuelQoute WHERE (ClientInformation.email = ? AND FuelQoute.email=ClientInformation.email);"
            let res = sql.replace("?", email);
            // FINISH THE QUERY ONCE DB IS CREATED
            connection.query(res, function(err, result) {
                connection.release();
                if (err) {
                    callback(true);
                    return;
                } else {
                    callback(false, result);
                }
            });
        }
    });
}
module.exports.getCustomerHistory = getCustomerHistory;

requestQuote = function(data, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        } else {
            sql = "INSERT INTO FuelQoute VALUES(";
            sql += data.email;
            sql += ",";
            sql += data.requestedDate;
            sql += ",";
            sql += data.deliveryDate;
            sql += ",";
            sql += data.gallons;
            sql += ",";
            sql += data.price;
            sql += ")";
            sql += ";";
            // FINISH THE QUERY ONCE DB IS CREATED
            connection.query(sql, function(err, result) {
                connection.release();
                if (err) {
                    callback(true);
                    return;
                } else {
                    callback(false);
                }
            });
        }
    });
}
module.exports.requestQuote = requestQuote;