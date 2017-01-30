module.exports = function(app, dbPool){
    
    app.get('/', function (req, res) {
                
        res.render('index.html');
    });
    
    app.get('/signin', function(req, res) {
    
        res.render('signin.html'); 
    });
    
    app.get('/main', function(req, res) {
        console.log(req.session.userNid);
        
        if(!req.session.userNid){
            res.redirect('/');
            return;
        }
        else {
            res.render('main.html');
        }
    });
    
    //INSERT INTO USER_INFO(USER_ID, USER_PW, REG_DTM) VALUES('admin', '2020', now())
    app.post('/submit.do', function(req, res) {
       
        dbPool.getConnection(function(err, connection){
            
            connection.query("INSERT INTO USER_INFO(USER_ID, USER_PW, REG_DTM, USER_NAME) VALUES('"+req.body.id+"', '"+req.body.pw+"', NOW(), '"+req.body.name+"')", 
                             function(err, rows, fields){
                connection.release();
                
                if(!err){
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify('success'));
                }
                else{
                    res.writeHead(210, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify('fail'));
                }
                
            });
        });
        console.log(req.body);
    });
    
    app.post('/checkid.do' , function(req, res) {
        dbPool.getConnection(function(err, connection){
            
            connection.query("SELECT USER_ID FROM USER_INFO WHERE USER_ID = '"+req.body.id+"'", function(err, rows, fields){
                if(!err){
                    console.log(rows.length);
                    
                    var result = true;
                    
                    if(rows.length > 0){
                        result = false;
                    }
                    
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(result));
                } 
                else {
                    console.log(err);
                    connection.release();
                    res.writeHead(210, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify('fail'));
                }

            });
        });
        
    });
    
    app.post('/login.do' , function(req, res) {
        dbPool.getConnection(function(err, connection){
            
            console.log("SELECT USER_NID FROM USER_INFO WHERE USER_ID = '"+req.body.id+"' AND USER_PW = '"+req.body.pw+"'");
            
            connection.query("SELECT USER_NID FROM USER_INFO WHERE USER_ID = '"+req.body.id+"' AND USER_PW = '"+req.body.pw+"'", function(err, rows, fields){
                if(!err){
                    console.log(rows);
                    
                    var result = false;
                    
                    if(rows.length > 0){
                        req.session.userNid = rows[0].USER_NID;
                        result = true;
                    }
                    
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(result));
                } 
                else {
                    console.log(err);
                    connection.release();
                    res.writeHead(210, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify('fail'));
                }

            });
        });
        
    });
    
    
}