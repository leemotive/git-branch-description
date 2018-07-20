#!/usr/bin/env node

var program = require('commander');
var pkg = require('../package.json')
var os = require('os');
var exec = require('child_process').execSync;

var inquirer = require('inquirer');
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'))

var init = require('../command/init');
var view = require('../command/view');
var prune = require('../command/prune');
var conflict = require('../command/conflict');
var edit = require('../command/edit');
var find = require('../command/find');

var check = require('../util/check');
var git = require('../util/git');

program.version(pkg.version);

function checkGitDir() {
    check.invariantGitDir(check.isGitDir());
}

program.command('init')
    .description('initialize a git repository with a branch-description.properties')
    .action(function(cmd) {
        checkGitDir();
        init();
    });

program.command('view [branch]')
    .description('view branch description')
    .option('-r --remote', 'list remote remote-tracking branches description')
    .option('-a --all', 'list both remote-tracking and local branches description')
    .option('-c --clean', 'hide branches without description')
    .action(function(branch, cmd) {
        checkGitDir();
        let mode = cmd.all ? 'all' : cmd.remote ? 'remote' : 'local';
        let clean = cmd.clean;
        view(branch, mode, clean);
    });

program.command('prune')
    .description('remove branch description in properties file but the branch has been deleted')
    .action(function() {
        checkGitDir();
        prune();
    });

program.command('conflict')
    .description('resolve conflicts in properites file after branch merge')
    .action(function() {
        checkGitDir();
        conflict();
    });

program.command('edit')
    .description('edit branch description')
    .action(function() {
        checkGitDir();
        var currentBranch = exec('git rev-parse --abbrev-ref HEAD').toString().trim();
        var branches = git.localBranches();
        var index = branches.findIndex(function(br) {return br === currentBranch});
        branches.splice(index, 1);
        branches.unshift(currentBranch);
        inquirer.prompt([{
            type: 'autocomplete',
            name: 'branch',
            message: 'Which branch to set description: ',
            source: function(ans, input) {
                return new Promise(function(resolve, reject) {
                    resolve(branches.filter(function(br) {return !input || br.includes(input);}))
                });
            }
        }, {
            type: 'input',
            name: 'description',
            message: 'Please input branch description: ',
            validate: function(desc) {
                if (!desc.trim()) {
                    return 'description can not be empty!!!';
                }
                return true;
            }
        }]).then(function(answers) {
           edit(answers);
        })
    });

program.command('find <regex>')
    .description('find branch which name or descrition matches regex')
    .action(function(regex) {
        checkGitDir();
        find(regex);
    });


program.parse(process.argv);
