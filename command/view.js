var path = require('path');
var os = require('os');
var exec = require('child_process').execSync;
var properties = require('properties');

module.exports = function() {

    var descConfig = properties.parse(fs.readFileSync(path.resolve(process.cwd(), 'branch-description.properties'), 'utf8'));
    var branch = exec('git branch').toString();
    
    var branchArr = branch.split(os.EOL);
    var lastBr = branchArr.pop();
    if (lastBr) {
        branchArr.push(lastBr);
    }
    
    branchArr = branchArr.map(function(br) {
        let brObj = {};
        var matches = br.match(/^(\*?\s*)(.+)/);
        if (!matches) {
            return brObj;
        }
        brObj.name = matches[2];
        brObj.active = !!matches[1].trim();
        var desc = '';
        try {
            desc = exec(`git config branch.${brObj.name}.description`).toString().trim();
        } catch (e) {
        }
        brObj.desc = descConfig[brObj.name] || desc || '';
        
        return brObj;
    }).map(function(br) {
        return br.name ? `${br.active ? '*' : ' '} ${colorName(br)}${colorDesc(br)}` : '';
    });
    
    function colorName(br) {
        if (br.active) {
            return `\x1B[32m${br.name}\x1B[39m`;
        } else {
            return br.name;
        }
    }
    function colorDesc(br) {
        if (br.desc) {
            return ` \x1B[36m${br.desc}\x1B[39m`;
        } else {
            return '';
        }
    }
    
    console.log(branchArr.join(os.EOL).toString());
}