var fs = require('fs');
var os = require('os');
var exec = require('child_process').execSync;
var path = require('path');
var properties = require('properties');

var pwd = process.cwd();
var configFilePath = path.resolve(pwd, 'branch-description.properties')

module.exports = function() {
    if(!fs.existsSync(configFilePath)) {
        console.log(`branch-description.properties is not exists in ${pwd}`);
        process.exit(1);
    }

    var descConfig = properties.parse(fs.readFileSync(configFilePath, 'utf8'));

    var branches = exec(`git for-each-ref --format='%(refname)' refs/`).toString().replace(/refs\/heads\//g, '').replace(/refs\/remotes\/\w+\//g, '').split(os.EOL);
    for(let branch of Object.keys(descConfig)) {
        if(!branches.includes(branch)) {
            delete descConfig[branch];
        }
    }

    fs.writeFileSync(configFilePath, properties.stringify(descConfig), {encoding: 'utf8'});
}