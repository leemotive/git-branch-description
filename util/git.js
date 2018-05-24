var exec = require('child_process').execSync;
var parser = require('./parser');

function trimSingleQuote(br) {
    return ` ${br} `.replace(/(\s)'/g, '$1').replace(/'(\s)/g, '$1').trim();
}

exports.localBranches = function() {
    var branches = exec(`git for-each-ref --format='%(refname:short)' refs/heads/`, {
        cwd: parser.getRootDir()
    }).toString();
    branches = trimSingleQuote(branches);
    
    branches = branches.split(/\s+/);

    return branches;
}

exports.remoteBranches = function(replaceRemoteName) {
    var branches = exec(`git for-each-ref --format='%(refname:short)' refs/remotes/`).toString().trim();
    branches = trimSingleQuote(branches);

    replaceRemoteName && (branches = branches.replace(/(^|\n)\w+\//g, '$1'));
    branches = branches.split(/\s+/);

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
        desc = exec(`git config branch.${name}.description`, {
            cwd: parser.getRootDir()
        }).toString().trim();
    } catch (e) {
    }
    return desc;
}