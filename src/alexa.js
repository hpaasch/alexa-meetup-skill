'use strict';

const Alexa = require('alexa-sdk');
const handlers = require('./handlers');

const APP_ID = process.env.ALEXA_APP_ID;

module.exports.handler = (event, context) => {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
