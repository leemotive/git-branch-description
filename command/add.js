var fs = require('fs');
var path = require('path');

var properties = require('properties');

var pwd = process.cwd();
var configFilePath = path.resolve(pwd, 'branch-description.properties')

module.exports = function({branch, description}) {
    var descConfig = {};
    if(fs.existsSync(configFilePath)) {
        descConfig = properties.parse(fs.readFileSync(configFilePath, 'utf8'));
    }

    descConfig[branch] = description;

    fs.writeFileSync(configFilePath, properties.stringify(descConfig), {encoding: 'utf8'});
}