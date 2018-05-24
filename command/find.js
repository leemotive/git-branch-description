const os = require('os');

const parser = require('../util/parser');
const git = require('../util/git');
const output = require('../util/out');

module.exports = function(re) {
    const descConfig = parser.read();

    const branches = git.allBranches(true);
    let out = [], br, regex = new RegExp(re);
    for(let name of branches) {
        br = {};
        br.name = name;
        br.desc = descConfig[name] || git.branchDescription(name);
        if (br.desc.match(regex) || br.name.match(regex)) {
            br.desc = br.desc.replace(regex, function(str) {
                return `\x1B[31m${str}\x1B[39m`;
            });
            br.name = br.name.replace(regex, function(str) {
                return `\x1B[31m${str}\x1B[39m`;
            });
            out.push(br);
        }
    }
    output.outputDescription(out);
}