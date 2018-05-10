var path = require('path');
var os = require('os');
var fs = require('fs');
var exec = require('child_process').execSync;

var parser = require('parser');
var git = require('../util/git');

var currentBranch = git.currentHead();

function renderPrefix(isCurrent) {
    return isCurrent ? '*' : ' ';
}
function colorName(name, isCurrent) {
    if (isCurrent) {
        return `\x1B[32m${name}\x1B[39m`;
    } else {
        return name;
    }
}
function colorDesc(desc) {
    if (desc) {
        return ` \x1B[36m${desc}\x1B[39m`;
    } else {
        return '';
    }
}

function isCurrentBranch(name) {
    return name === currentBranch;
}

function outputDescription(descs) {
    let out = descs.map(({name, desc}) => {
        var isCurrent = isCurrentBranch(name);
        return `${renderPrefix(isCurrent)} ${colorName(name, isCurrent)} ${colorDesc(desc)}`;
    });
    console.log(out.join(os.EOL).toString());
}



module.exports = function(specifyBranch, mode) {

    var descConfig = parser.read();
    
    if (specifyBranch) {
        var desc = descConfig[specifyBranch] || git.branchDescription(specifyBranch);
        var br = {
            name: specifyBranch,
            desc
        };
        return outputDescription([br]);
    }

    let branches = []
    if (mode === 'local') {
        branches = git.localBranches();
    } else if (mode === 'remote') {
        branches = git.remoteBranches(true);
    } else if (mode === 'all') {
        branches = git.allBranches(true);
    }

    let out = branches.map(function(name) {
        let br = {};
        br[name] = descConfig[name] || git.branchDescription(name);

        return br;
    });

    outputDescription(out);
}