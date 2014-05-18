/*
* 模块依赖
* */

var net = require('net');

/*
* 创建服务器
* */

var count = 0,
    users = {}

var server = net.createServer(function( conn ){
    //handle connection



    conn.setEncoding('utf8')

    var nickname;

    conn.write(
        '\n > welcome to \033[92mnode-chat\033[39m!'
        +'\n > '+ count + ' other people are connected at this time.'
        +'\n > please write your name and press enter:'
    );
    count++;

    conn.on('data',function(data){
        data = data.replace('\r\n','');
        if(!nickname){
            if(users[data]){
                conn.write('\033[93m> nickname already in use. try again:\033[39m ');
                return;
            }else{
                nickname = data;
                users[nickname] = conn;

                for(var i in users ){
                    users[i].write('\033[90m > '+ nickname + ' joined the room \033[39m\n');
                }
            }
        }else{
            for(var i in users){

                if(i !== nickname){
                    users[i].write('\033[96m > ' + nickname +':\033[39m ' + data + '\n');
                }
            }
        }
        console.log(data);
    })

    conn.on('close', function(){

        count--;
        delete users[nickname];
    })


    //console.log('\033[90m new connection !\033[39m');

})

/*
* 监听
* */

server.listen(3000, function(){
    console.log('\033[96m server listening on *: 3000\033[39m')
})