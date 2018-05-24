var fs = require('fs');
var path = require('path');
var parser = require('./parser');

var pwd = parser.getRootDir();

exports.isGitDir = function() {
    return fs.existsSync(path.resolve(pwd, '.git'));
}

exports.invariant = function(val, message) {
    if (!val) {
        console.log(`\x1B[31m${message}\x1B[39m`);
        process.exit(1);
    }
}

exports.invariantGitDir = function(val) {
    if (!val) {
        this.invariant(false, 'Not a git repository');
    }
}


