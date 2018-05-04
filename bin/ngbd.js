#!/usr/bin/env node

var program = require('commander');
var pkg = require('../package.json')

var init = require('../command/init');
var view = require('../command/view');
var prune = require('../command/prune');
var conflict = require('../command/conflict');


program.version(pkg.version);


program.command('init')
    .action(function(cmd) {
        init();
    })

program.command('view')
    .action(function() {
        view();
    })

program.command('prune')
    .action(function() {
        prune();
    })

program.command('conflict')
    .action(function() {
        conflict();
    })

program.parse(process.argv);
