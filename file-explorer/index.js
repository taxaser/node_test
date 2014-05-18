/*
var fs = require("fs");
fs.readdir(process.cwd(), function(err, files){
    console.log(' ');

    if(!files.length){
        return console.log('  \033[31m No files to show!\033[39m\n');
    }

    console.log('  Select which file or directory you wan to see\n');

    function file(i){
        var filename = files[i];
        fs.stat(__dirname + '/' + filename, function(err, stat){
            if (stat.isDirectory()) {
                console.log('   '+i+'   \033[36m' + filename + '/\033[39m');
            }else{
                console.log('   '+i+'   \033[90m' + filename + '/\033[39m');
            }

            i++;
            if (i == files.length) {
                console.log(' ');
                process.stdout.write(' \033[33mEnter your choice: \033[39m');
                process.stdin.setEncoding('utf8');
                process.stdin.resume();
            }else{
                file(i);
            }
        })
    }
    file(0);
})*/

var fs = require("fs"),
    stdout = process.stdout,
    stdin = process.stdin,
    stats = [];

fs.readdir(process.cwd(), function(err, files){
    if(!files.length){
        return console.log('    \033[31m No files to show! \033[39m\n')
    }
    function file(i){
        var filename = files[i];

        fs.stat(__dirname + '/' + filename, function(err, stat){
            stats[i] = stat;
            if (stat.isDirectory()) {
                console.log('   '+i+'   \033[36m' + filename + '/\033[39m');
            }else{
                console.log('   '+i+'   \033[90m' + filename + '/\033[39m');
            }

            if(++i == files.length){
                read(files);
            } else {
                file(i);
            }
        })
    }

    function read () {
        console.log(" ");
        stdout.write(' \033[33mEnter your choice: \033[39m');
        stdin.setEncoding('utf8');
        stdin.resume();
        stdin.on('data', option);
    }

    function option (data){
        var filename = files[Number(data)];
        if(!filename){
            stdout.write(' \033[33mEnter your choice: \033[39m');
        } else {
            stdin.pause();
            console.log(filename);
            if(stats[Number(data)].isDirectory()){
                fs.readdir(__dirname + '/' + filename, function (err, files) {
                    console.log(" ");
                    console.log('   (' + files.length + 'files)');
                    files.forEach(function(file){
                        console.log(' - ' + file);
                    })
                    console.log(' ');
                    if(files.length!=0){
                        read();
                    }
                })

            }else{
                fs.readFile(__dirname + '/' + filename,'utf8', function (err , data){
                    console.log('');
                    console.log('\033[90m' + data.replace(/(.*)/g, '$1') + '\033[39m');
                })
            }
        }



    }
    file(0);
})