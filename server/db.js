var mysql = require('mysql');

//a pool of connections 
let pool = mysql.createPool({
    host: '',
    user: 'admin',
    password: '',
    database: '' 
});
