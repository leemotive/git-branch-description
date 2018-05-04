#!/usr/bin/env node

var program = require('commander');
var pkg = require('../package.json')
var os = require('os');
var exec = require('child_process').execSync;

var inquirer = require('inquirer');

var init = require('../command/init');
var view = require('../command/view');
var prune = require('../command/prune');
var conflict = require('../command/conflict');
var add = require('../command/add');


program.version(pkg.version);


program.command('init')
    .action(function(cmd) {
        init();
    });

program.command('view')
    .action(function() {
        view();
    });

program.command('prune')
    .action(function() {
        prune();
    });

program.command('conflict')
    .action(function() {
        conflict();
    });

program.command('add')
    .action(function() {
        var currentBranch = exec('git rev-parse --abbrev-ref HEAD').toString().trim();
        var branches = exec(`git for-each-ref --format='%(refname)' refs/heads/`).toString().replace(/refs\/heads\//g, '').split(os.EOL);
        inquirer.prompt([{
            type: 'list',
            name: 'branch',
            message: 'Which branch to set description: ',
            choices: branches,
            default: branches.indexOf(currentBranch)
        }, {
            type: 'input',
            name: 'description',
            message: "Please input branch description: "
        }]).then(function(answers) {
           add(answers);
        })
    })

program.parse(process.argv);
