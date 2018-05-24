var parser = require('../util/parser');
var git = require('../util/git');
var output = require('../util/out');


module.exports = function(specifyBranch, mode, clean) {

    var descConfig = parser.read();
    
    if (specifyBranch) {
        var desc = descConfig[specifyBranch] || git.branchDescription(specifyBranch);
        var sbr = {
            name: specifyBranch,
            desc
        };
        return output.outputDescription([sbr]);
    }

    let branches = []
    if (mode === 'local') {
        branches = git.localBranches();
    } else if (mode === 'remote') {
        branches = git.remoteBranches(true);
    } else if (mode === 'all') {
        branches = git.allBranches(true);
    }

    let out = [], br;
    for(let name of branches) {
        br = {};
        br.name = name;
        br.desc = descConfig[name] || git.branchDescription(name);
        if (br.desc || !clean) {
            out.push(br);
        }
    }

    output.outputDescription(out);
}