#!/usr/bin/env node

var program = require('commander');
var pkg = require('../package.json')

var init = require('../command/init');
var view = require('../command/view');

program.version(pkg.version);


program.command('init')
    .action(function(cmd) {
        init();
    })

program.command('view')
    .action(function() {
        view();
    })

program.parse(process.argv);
