# git-branch-description

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
  Usage: ngbd [options] [command]

  Options:

    -V, --version  output the version number
    -h, --help     output usage information

  Commands:

    init           initialize a git repository with a branch-description.properties
    view           view all branch description
    prune          remove branch description in properties file but the branch has been deleted
    conflict       resole conficts in properites file after branch merge
    add            add branch description


