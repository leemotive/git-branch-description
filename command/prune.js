var fs = require('fs');
var os = require('os');
var exec = require('child_process').execSync;
var path = require('path');

var pwd = process.cwd();
var configFilePath = path.resolve(pwd, 'branch-description.json')

module.exports = function() {
    if(!fs.existsSync(configFilePath)) {
        console.log(`branch-description.json is not exists in ${pwd}`);
        process.exit(1);
    }

    var descConfig = require(configFilePath);

    var branches = exec(`git for-each-ref --format='%(refname)' refs/`).toString().replace(/refs\/heads\//g, '').replace(/refs\/remotes\/\w+\//g, '').split(os.EOL);
    for(let branch of Object.keys(descConfig)) {
        if(!branches.includes(branch)) {
            delete descConfig[branch];
        }
    }

    fs.writeFileSync(configFilePath, JSON.stringify(descConfig, null, 2), {encoding: 'utf8'});
}