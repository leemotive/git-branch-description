var check = require('../util/check');

if (check.isGitDir()) {
    try {
        require('./init')();
    } catch (e) {
        
    }
}