var fs = require('fs');

fs.readdir('./', function(err, data){
    if (err) return console.log(err);
    console.log(data);

})