
/**
 * Module dependencies.模块依赖
 */

var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path'),
    ejs = require('ejs');

var app = express();

app.engine('.html', ejs.__express);


// all environments 环境变量
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
//app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only  开发模式
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//路径解析
app.get('/', routes.index);
app.get('/login', routes.login);
app.post('/login', routes.doLogin);
app.get('/logout', routes.logout);
app.get('/home', routes.home);
app.get('/users', user.list);

app.get('/hello',function(req,res){
    var body = 'hello world';
    /*res.setHeader('Cotent-Type', 'text/plain');
    res.setHeader('Cotent-length', body.length);
    res.end(body);*/
    res.send('hello everyone!');
})

//启动及端口

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
