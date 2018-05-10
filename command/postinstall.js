var check = require('../util/check');

if (check.gitDir(true)) {
    require('./init')();
}