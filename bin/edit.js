var Chalk = require('chalk');
var Cli = require('structured-cli');
var Open = require('opn');
var node4Migration = require('../lib/node4Migration');


module.exports = Cli.createCommand('edit', {
    description: 'Edit this webtask in your browser',
    plugins: [
        require('./_plugins/profile'),
    ],
    params: {
        'name': {
            description: 'The named webtask you want to edit',
            type: 'string',
            required: false
        },
    },
    optionGroups: {
        'Editor options': {
            'editor-version': {
                description: 'Open the webtask in a specific version of the Webtask Editor',
                dest: 'editorVersion',
                choices: ['v1', 'v2'],
                type: 'string',
            },
            'canary': {
                description: 'Open the canary build of the Webtask Editor',
                dest: 'canary',
                type: 'boolean',
            },
            'node8': {
                description: 'Edit a copy of the webtask in Node 8',
                dest: 'node8',
                type: 'boolean',                
            }
        }
    },
    handler: handleEdit,
});


// Command handler
function handleEdit(args) {
    var profile = args.profile;

    if (args.node8) {
        if (node4Migration.isNode4Profile(profile)) {
            args.profile.url = node4Migration.node8BaseUrl;
        }
        else {
            throw new Cli.error.invalid('The --node8 option can only be used with webtasks created in the legacy Node 4 webtask.io environment.');
        }
    }

    var wtName  = args.name ? args.name + '/' : '';
    var url     = profile.url + '/edit/' + profile.container + '#/' + wtName + profile.token;

    if (args.editorVersion) {
        url = profile.url + '/edit/' + args.editorVersion + '/' + profile.container + '#/' + wtName + profile.token;
    }

    if (args.canary) {
        url = profile.url + '/edit/canary/' + profile.container + '#/' + wtName + profile.token;
    }

    console.log('Attempting to open the following url in your browser: ');
    console.log();
    console.log(Chalk.underline(url));
    console.log();
    console.log('If the webtask editor does not automatically open, please copy this address and paste it into your browser.');
    
    return Open(url, { wait: false });
}