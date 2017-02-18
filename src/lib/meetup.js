'use strict';

const rp = require('request-promise');

const MEETUP_API_URL = process.env.MEETUP_API_URL;
const MEETUP_URL_NAME = process.env.MEETUP_URL_NAME;

const listEvents = (status, desc) => rp({
    method: 'GET',
    uri: `${MEETUP_API_URL}/${MEETUP_URL_NAME}/events`,
    qs: {
        status,
        desc: desc || false
    },
    json: true
}).then((result) => {
    const keys = Object.keys(result);
    return keys.map((k) => result[k]);
});


module.exports = {
    listEvents,
}
