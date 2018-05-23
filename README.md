# git-branch-description
the branch description generated by `git branch --edit-description` was saved in local config file which can not be pushed to remote repository. git-branch-desciption save branch description in its config file named branch-description.properties. it can be pushed to remote repository and pull down by others.

## Installation
global install
```bash
$ npm install -g git-branch-description
```
or local install
```
$ npm install git-branch-description --save-dev
```

## Usage
  Usage: gbrd [options] [command]

  Options:

    -V, --version            output the version number
    -h, --help               output usage information

  Commands:

    init                     initialize a git repository with a branch-description.properties
    view [options] [branch]  view branch description
    prune                    remove branch description in properties file but the branch has been deleted
    conflict                 resolve conflicts in properites file after branch merge
    edit                     edit branch description


