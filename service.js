module.exports = function(app, dbPool){
    
    app.get('/', function (req, res) {
                
        res.render('index.html');
    });
    
    app.get('/signin', function(req, res) {
    
        res.render('signin.html'); 
    });
    
    app.get('/main', function(req, res) {
                
        if(!req.session.userNid){
            res.redirect('/');
            return;
        }
        else {
            res.render('main.html');
        }
    });
    
    app.get('/regist', function(req, res) {
                
        if(!req.session.userNid){
            res.redirect('/');
            return;
        }
        else {
            res.render('regist.html');
        }
    });
    
    app.get('/history', function(req, res) {
                
        if(!req.session.userNid){
            res.redirect('/');
            return;
        }
        else {
            res.render('history.html');
        }
    });
    
    app.get('/manage', function(req, res) {
                
        if(!req.session.userNid){
            res.redirect('/');
            return;
        }
        else {
            res.render('manage.html');
        }
    });
    
    app.get('/logout', function(req, res) {
                
        req.session.destroy();
        res.redirect('/');
        
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
                        
                        if(rows[0].USER_NID == 2){
                            req.session.userAuth = 1;
                        }
                        else {
                            req.session.userAuth = 2;
                        }
                        
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
    
    app.post('/registSchedule.do' , function(req, res) {
        
        var queryString = "INSERT INTO TEAM_SCHEDULE(NAME, CATEGORY, SCHDATE, SCHTIME, REGDATE) " +
                            "VALUES('"+req.body.name+"', '"+req.body.category+"', '"+req.body.date+"', '"+req.body.time+"', NOW())";
        console.log(queryString);
        
        dbPool.getConnection(function(err, connection){
           connection.query(queryString, function(err, rows, fields){
               
                connection.release();

                if(!err){
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify('success'));
                }
                else{
                    console.log(err);
                    res.writeHead(210, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify('fail'));
                }
            });
        });
    });
    
}