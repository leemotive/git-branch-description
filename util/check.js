var fs = require('fs');
var path = require('path');

var pwd = process.cwd();

exports.gitDir = function(rv, installDir) {
    var isGitDir = fs.existsSync(path.resolve(installDir || pwd, '.git'));
    if (!rv && !isGitDir) {
        console.error('\x1B[31mNot a git repository.\x1B[39m');
        process.exit(1);
    } else {
        return isGitDir;
    }
}