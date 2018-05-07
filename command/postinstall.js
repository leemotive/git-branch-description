var path = require('path');
var check = require('../util/check');

var rootDir = path.resolve(process.env.INIT_CWD || path.resolve('../../', process.cwd()));

if (check.gitDir(true, rootDir)) {
    require('./init')(rootDir);
}