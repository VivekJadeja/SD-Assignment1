CREATE DATABASE OilCompany;

USE OilCompany;


CREATE TABLE ClientInformation
(
    email VARCHAR(50) NOT NULL,
    fullName VARCHAR(50) NOT NULL,
    address_1 VARCHAR(100) NOT NULL,
    address_2 VARCHAR(100),
    city VARCHAR(100) NOT NULL,
    user_state VARCHAR(2) NOT NULL,
    zipCode VARCHAR(9) NOT NULL,
    historyExists int(1) NOT NULL,
    PRIMARY KEY(email),
    FOREIGN KEY(email) REFERENCES UserCredentials(email)
);

CREATE TABLE UserCredentials
(
    email VARCHAR(50) NOT NULL,
    user_password VARCHAR(100) NOT NULL,
    PRIMARY KEY(email)
);