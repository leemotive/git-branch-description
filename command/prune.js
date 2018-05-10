var fs = require('fs');
var os = require('os');
var exec = require('child_process').execSync;
var path = require('path');

var parser = require('../util/parser');
var git = require('../util/git');

var pwd = parser.getRootDir();

module.exports = function() {
    if(!parser.configFileExists()) {
        console.log(`branch-description.properties is not exists in ${pwd}`);
        process.exit(1);
    }

    var descConfig = parser.read();

    var branches = git.allBranches(true);
    for(let branch of Object.keys(descConfig)) {
        if(!branches.includes(branch)) {
            delete descConfig[branch];
        }
    }

    parser.write(descConfig);
}