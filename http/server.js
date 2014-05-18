var qs = require('querystring');
require('http').createServer(function(req, res){
    if('/'==req.url){
        res.writeHead('200',{ 'Content-Type': 'text/html' });
        res.end([
            '<form method="POST" action="/url">',
            '<h1>My form</h1>',
            '<label>Personal information</label>',
            '<p>What is your name?</p>',
            '<input type="text" name="name">',
            '<p><button>Submit</button></p>',
            '</form>'
        ].join(''));
    }else if('/url' == req.url && req.method=='POST'){
        var body = '';
        req.on('data', function(chunk){
            body += chunk;
        });
        req.on('end', function() {
            res.writeHead('200',{ 'Content-Type': 'text/html' });
            //res.end('<p>Content-type: '+req.headers['content-type']+'</p>' + '<p>Data:</p><pre>' + body + '</pre>');
            res.end('<p>Your name is :<b>'+ qs.parse(body).name +'</b></p>')
        })
    }else{
        res.writeHead(404);
        res.end('Not found')
    }
}).listen(3000);

