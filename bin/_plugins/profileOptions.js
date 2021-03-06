'use strict';

const _ = require('lodash');


module.exports = {
    onBeforeConfigure,
};


function onBeforeConfigure(context) {
    const node = context.node;
    const options = {
        profile: {
            alias: 'p',
            description: 'Default to the webtask container, token, and URL from a stored profile.',
            type: 'string',
        },
        container: {
            alias: 'c',
            description: 'Set the webtask container. This can be combined with --profile if you want to override the container or can be used with --url and --token to specify the webtask profile inline.',
            type: 'string',
        },
        url: {
            description: 'Set the webtask server url. Defaults to https://sandbox.auth0-extend.com',
            type: 'string',
        },
        token: {
            description: 'Set your authorizing webtask token. If you do not have a webtask token, one can be provisioned using `wt init`.',
            type: 'string',
        },
        runtime: {
            description: 'Runtime version used during execution and persisting of webtasks. Example: node8|node12',
            type: 'string'
        },
    };

    node.addOptionGroup('Webtask profile', _.omit(options, _.get(context.node.config, 'profileOptions.hide', [])));
}
