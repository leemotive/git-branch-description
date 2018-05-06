var fs = require('fs');
var path = require('path');

var pwd = process.cwd();

exports.gitDir = function() {
    if (!fs.existsSync(path.resolve(pwd, '.git'))) {
        console.error('Not a git repository.');
        process.exit(1);
    }
}