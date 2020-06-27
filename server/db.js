var mysql = require('mysql');

//a pool of connections 
let pool = mysql.createPool({
    host: '',
    user: 'admin',
    password: '',
    database: '' 
});

signUp = function(data, callback)
{
    pool.getConnection(function(err, connection)
    {
        if(err)
        {
            callback(true);
            return;
        }
        else
        {
            sql = "INSERT INTO customer_info VALUES";
            // FINISH THE QUERY ONCE DB IS CREATED
            connection.query(sql, function(err, result)
            {
                if(err)
                {
                    connection.release();
                    callback(true);
                    return;
                }
                else
                {
                    callback(false);
                }
            });
        }
    });
}
module.exports.signUp = signUp;