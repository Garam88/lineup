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
    
    app.get('/signin', function(req, res) {
    
        res.render('signin.html'); 
    });
    
    app.post('/submit.do', function(req, res) {
       
        console.log(req.body);
    });
}