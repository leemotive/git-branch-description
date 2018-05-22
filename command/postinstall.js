var check = require('../util/check');

if (check.gitDir(true)) {
    try {
    require('./init')();
    } catch (e) {
        
    }
}