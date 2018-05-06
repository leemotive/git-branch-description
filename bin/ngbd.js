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

var check = require('../util/check');

program.version(pkg.version);


check.gitDir();
program.command('init', 'initialize a git repository with a branch-description.properties')
    .action(function(cmd) {
        init();
    });

program.command('view', 'view all branch description')
    .action(function() {
        view();
    });

program.command('prune', 'remove branch description in properties file but the branch has been deleted')
    .action(function() {
        prune();
    });

program.command('conflict', 'resole conficts in properites file after branch merge')
    .action(function() {
        conflict();
    });

program.command('add', 'add branch description')
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
