var fs = require('fs');
var path = require('path');
var exec = require('child_process').execSync;
var os = require('os');
var properties = require('properties');

module.exports = function(installDir) {
    var pwd = installDir || process.cwd();
    var configExists = fs.existsSync(path.resolve(pwd, 'branch-description.properties'));

    var descConfig = {};
    if (configExists) {
        var contents = fs.readFileSync(path.resolve(pwd, 'branch-description.properties'), 'utf8');
        descConfig = properties.parse(contents);
    }

    var branches = exec(`git for-each-ref --format='%(refname)' refs/heads/`).toString().split(os.EOL);
    for(let branch of branches) {
        branch = branch.replace('refs/heads/', '');
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

    fs.writeFileSync(path.resolve(pwd, 'branch-description.properties'), properties.stringify(descConfig), {encoding: 'utf8'});
}
