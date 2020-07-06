CREATE DATABASE OilCompany;

USE OilCompany;


CREATE TABLE UserCredentials
(
    email VARCHAR(50) NOT NULL,
    user_password VARCHAR(100) NOT NULL,
    PRIMARY KEY(email)
);

CREATE TABLE ClientInformation
(
    email VARCHAR(50) NOT NULL,
    fullName VARCHAR(50),
    address_1 VARCHAR(100),
    address_2 VARCHAR(100),
    city VARCHAR(100),
    user_state VARCHAR(2),
    zipCode VARCHAR(9),
    historyExists BOOL,
    PRIMARY KEY(email),
    FOREIGN KEY(email) REFERENCES UserCredentials(email)
);

CREATE TABLE FuelQoute
(
    quoteID INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL,
    dateRequested TIMESTAMP NOT NULL DEFAULT NOW(),
    deliveryDate DATE NOT NULL,
    gallonsRequested INT NOT NULL,
    pricePerGallon FLOAT NOT NULL,
    PRIMARY KEY(quoteID),
    FOREIGN KEY(email) REFERENCES UserCredentials(email)
);


CREATE TRIGGER insertIntoClientInfo AFTER INSERT ON UserCredentials
 FOR EACH ROW
	INSERT INTO ClientInformation(email) VALUES(NEW.email);