var parser = require('../util/parser');

module.exports = function({branch, description}) {
    var descConfig = parser.read();

    descConfig[branch] = description;

    parser.write(descConfig);
}