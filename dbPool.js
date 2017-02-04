var mysql = require('mysql');
module.exports = mysql.createPool({
    host     : 'us-cdbr-iron-east-04.cleardb.net',
    user     : 'bd803165ddeaf9',
    password : '28a7a71c',
    database : 'heroku_fa4c2875999f3d0',
    connectionLimit : 20,
    waitForConnections : false,
    timezone: 'utc'
});