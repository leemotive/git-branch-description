var fs = require('fs');
var path = require('path');
var exec = require('child_process').execSync;
var os = require('os');

module.exports = function() {
    var pwd = process.cwd();
    var configExists = fs.existsSync(path.resolve(pwd, 'branch-description.json'));

    var descConfig = {};
    if (configExists) {
        descConfig = require(path.resolve(pwd, 'branch-description.json'));
    }

    var branches = exec(`git for-each-ref --format='%(refname)' refs/heads/ | sed 's|refs/heads/||'`).toString().split(os.EOL);
    for(let branch of branches) {
        if (descConfig[branch] || !branch) {
            continue;
        }
        var desc = '';
        try {
            desc = exec(`git config branch.${branch}.description`).toString().trim();
        } catch (e) {
        }
        if (desc) {
            descConfig[branch] = desc;
        }
    }

    fs.writeFileSync(path.resolve(pwd, 'branch-description.json'), JSON.stringify(descConfig, null, 2), {encoding: 'utf8'});
}
