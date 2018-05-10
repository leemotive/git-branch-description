var path = require('path');
var os = require('os');
var fs = require('fs');
var exec = require('child_process').execSync;
var properties = require('properties');

module.exports = function(specifyBranch) {

    var descConfig = properties.parse(fs.readFileSync(path.resolve(process.cwd(), 'branch-description.properties'), 'utf8'));
    var branch = exec('git branch').toString();
    
    var branchArr = branch.trim().split(os.EOL);
    
    var activeBranch = '';
    branchArr.forEach(function(br) {
        let brObj = {};
        var matches = br.match(/^(\*?\s+)([^\(\)]+)/);
        if (!matches) {
            return;
        }
        let bName = matches[2];
        !!matches[1].trim() && (activeBranch = bName);
        if (!descConfig[bName]) {
            var desc = '';
            try {
                desc = exec(`git config branch.${brObj.name}.description`).toString().trim();
            } catch (e) {
            }
            descConfig[bName] = desc || ''
        }
    });

    let branches = specifyBranch ? [specifyBranch] : Object.keys(descConfig);
    
    let descs = branches.map(function(name) {
        var isCurrent = name === activeBranch;
        return `${renderPrefix(isCurrent)} ${colorName(name, isCurrent)}${colorDesc(descConfig[name])}`;
    })
    
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
    
    console.log(descs.join(os.EOL).toString());
}