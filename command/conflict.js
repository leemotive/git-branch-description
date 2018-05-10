var fs = require('fs');
var path = require('path');
var parser = require('../util/parser');

module.exports = function () {
    var contents = parser.readContents;
    contents = contents.replace(/(^|\n)<{7} \w+\n/g, '\n').replace(/\n>{7} \w+(\n|$)/g, '\n').replace(/\n={7}\n/g, '\n');
    
    parser.writeContents(contents);
}