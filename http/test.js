require('http').createServer(function(req,res){
    console.log(req.headers);
    res.writeHead(200,{ 'Content-Type': 'text/html' });
    res.write('Hello');
    setTimeout(function(){
        res.end(' World')
    },5000);

}).listen(3000)


