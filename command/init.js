var parser = require('../util/parser');
var git = require('../util/git');

module.exports = function() {
    var descConfig = parser.read();

    var branches = git.localBranches();

    let desc = '';
    for(let name of branches) {
        if (!name || descConfig[name]) {
            continue;
        }
        
        desc = git.branchDescription(name);

        desc && (descConfig[name] = desc);
    }

    parser.write(descConfig);
}
