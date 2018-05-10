var fs = require('fs');
var path = require('path');
var properties = require('properties');

function getRootDir() {
    return process.env.INIT_CWD || process.cwd();
}

let filePath = path.resolve(getRootDir(), 'branch-description.properties');

exports.read = function() {
    let descConfig = {};
    try {
        if (fs.existsSync(filePath)) {
            descConfig = properties.parse(fs.readFileSync(filePath, 'utf8'));
        }
    } catch (e) {
    }
    return descConfig;
}

exports.readContents = function() {
    let descContents = '';
    try {
        if (fs.existsSync(filePath)) {
            descContents = fs.readFileSync(filePath, 'utf8');
        }
    } catch (e) {
    }
    return descContents;
}

exports.write = function(desc) {

    if (desc && Object.keys(desc).length) {
        fs.writeFileSync(filePath, properites.stringify(desc), {encoding: 'utf8'});
    }
}
exports.writeContents = function(contents) {
    fs.writeFileSync(filePath, contents, {encoding: 'utf8'});
}

exports.configFileExists = function() {
    return fs.existsSync(filePath);
}

exports.getRootDir = getRootDir;