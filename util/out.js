var os = require('os');

var git = require('./git');

function renderPrefix(isCurrent) {
    return isCurrent ? '*' : ' ';
}
function colorName(name, isCurrent) {
    if (isCurrent) {
        return `\x1B[32m${name.replace('\x1B[39m', '\x1B[39m\x1B[32m')}\x1B[39m`;
    } else {
        return name;
    }
}
function colorDesc(desc) {
    if (desc) {
        return ` \x1B[36m${desc.replace('\x1B[39m', '\x1B[39m\x1B[36m')}\x1B[39m`;
    } else {
        return '';
    }
}

function isCurrentBranch(name) {
    const currentBranch = git.currentHead();
    name = name.replace(/\x1B\[\d+m/g, '');
    return name === currentBranch;
}


exports.outputDescription = function (descs) {
    let out = descs.map(({name, desc}) => {
        var isCurrent = isCurrentBranch(name);
        return `${renderPrefix(isCurrent)} ${colorName(name, isCurrent)} ${colorDesc(desc)}`;
    });
    console.log(out.join(os.EOL).toString());
}