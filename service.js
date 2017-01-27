
module.exports = function(app, dbPool){
    
    app.get('/', function (req, res) {
        dbPool.getConnection(function(err, connection){
            
            connection.query('SELECT * FROM USER_INFO', function(err, rows, fields){
                if(!err){
                    console.log(rows);
                    connection.release();
                } else {
                    connection.release();
                }
            });
        });
        
        res.render('index.html');
    });
}