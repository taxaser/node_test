function list(){
    var fs = require("fs");
    var dir = '.';
    if (process.argv[2]) dir = process.argv[2];
    var files = fs.readdirSync(dir);
    for (var fn in files) {
        console.log(files[fn]);
    }
}

exports.list = list;