var fs = require('fs');
var path = require('path');
var properties = require('properties');


var pwd = process.cwd();
var configFilePath = path.resolve(pwd, 'branch-description.properties')

module.exports = function () {
    var contents = fs.readFileSync(configFilePath, 'utf8');
    contents = contents.replace(/(^|\n)<{7} \w+\n/g, '\n').replace(/\n>{7} \w+(\n|$)/g, '\n').replace(/\n={7}\n/g, '\n');
    var descConfig = properties.parse(contents);
    fs.writeFileSync(configFilePath, properties.stringify(descConfig), {encoding: 'utf8'});
}