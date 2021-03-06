var mysql = require('mysql');

//a pool of connections 
let pool = mysql.createPool({
    host: 'oilcompany.c8nymykjozrb.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'alladmin',
    database: 'OilCompany'
});

signUp = function(data, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        } else {
            sql = "INSERT INTO UserCredentials VALUES('";
            sql += data.email;
            sql += "', '";
            sql += data.password;
            sql += "')";
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
            let sql = "SELECT address_1, address_2, city, user_state, zipCode FROM ClientInformation WHERE email = '";
            sql += email;
            sql += "';";

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
            let para = "'" + email + "'";
            let res = sql.replace("?", para);
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
            sql = "INSERT INTO FuelQoute VALUES('null','";
            sql += data.email;
            sql += "','";
            sql += data.requestedDate;
            sql += "','";
            sql += data.deliveryDate;
            sql += "','";
            sql += data.gallons;
            sql += "','";
            sql += data.price;
            sql += "')";
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

loginAndGetInfo = function(data, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        } else {
            let sql = "SELECT UserCredentials.email, UserCredentials.user_password, ClientInformation.fullName, ClientInformation.historyExists FROM UserCredentials, ClientInformation WHERE UserCredentials.email = ClientInformation.email AND UserCredentials.email = '"
            sql += data.email;
            sql += "';"
                // when a user signs up, we should automatically create and entry into CleintInformation for their email, while everything else
                //is blank.";
                // FINISH THE QUERY ONCE DB IS CREATED
            connection.query(sql, function(err, result) {
                connection.release(); //release connection after it is used in order to not keep it open
                if (err) {
                    callback(true);
                    return;
                } else {
                    callback(false, result);
                    return;
                }
            });
        }
    });
}
module.exports.loginAndGetInfo = loginAndGetInfo;

emailCheck = function(email, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        } else {
            let sql = "SELECT COUNT(*) AS result FROM UserCredentials WHERE email = '"
            sql += email;
            sql += "';"
                // we are checking whether or not an email is being used
                // FINISH THE QUERY ONCE DB IS CREATED
            connection.query(sql, function(err, result) {
                connection.release(); //release connection after it is used in order to not keep it open
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
module.exports.emailCheck = emailCheck;

saveInfo = function(data, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        } else { //hello
            let history = data.historyExists==1? "1":"0";
            let sql = "UPDATE ClientInformation SET fullName ='";
            sql += data.fullName;
            sql += "', address_1 = '";
            sql += data.address1;
            if (data.address2 !== "") {
                sql += "', address_2 = '";
                sql += data.address2;
            }
            sql += "', city = '";
            sql += data.city;
            sql += "', user_state = '";
            sql += data.state;
            sql += "', zipCode = '";
            sql += data.zipcode;
            sql += "', historyExists = '";
            sql +=history;
            sql += " 'WHERE email = '";
            sql += data.email;
            sql += "';"
                // FINISH THE QUERY ONCE DB IS CREATED
            connection.query(sql, function(err, result) {
                connection.release(); //release connection after it is used in order to not keep it open
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
module.exports.saveInfo = saveInfo;

getProfileInfo = function(email, callback)
{
    pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        } else {
            let sql = "SELECT * FROM ClientInformation WHERE email = '"
            sql += email;
            sql += "';"
                // we are checking whether or not an email is being used
                // FINISH THE QUERY ONCE DB IS CREATED
            connection.query(sql, function(err, result) {
                connection.release(); //release connection after it is used in order to not keep it open
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
module.exports.getProfileInfo = getProfileInfo;