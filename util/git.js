var os = require('os');
var exec = require('child_process').execSync;

exports.localBranches = function() {
    var branches = exec(`git for-each-ref --format='%(refname)' refs/heads/`).toString().trim();
    
    branches = branches.replace(/(^|\n)refs\/heads\//g, '$1').split(os.EOL);

    return branches;
}

exports.remoteBranches = function(replaceRemoteName) {
    var branches = exec(`git for-each-ref --format='%(refname)' refs/remotes/`).toString().trim();
    
    branches = branches.replace(/(^|\n)refs\/remotes\//g, '$1');
    replaceRemoteName && (branches = branches.replace(/(^|\n)\w+\//g, '$1'));
    branches = branches.split(os.EOL);

    return branches;
}

exports.allBranches = function(replaceRemoteName) {
    let localBranches = this.localBranches();
    let remoteBranches = this.remoteBranches(replaceRemoteName);

    return Array.from(new Set(localBranches.concat(remoteBranches)));
}

exports.currentHead = function() {
    var currentBranch = exec('git rev-parse --abbrev-ref HEAD').toString().trim();
    return currentBranch;
}

exports.branchDescription = function(name) {
    let desc = '';
    try {
        desc = exec(`git config branch.${name}.description`).toString().trim();
    } catch (e) {
    }
    return desc;
}