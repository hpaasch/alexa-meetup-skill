'use strict';

const BbPromise = require('bluebird');
const moment = require('moment');

const meetup = require('../lib/meetup');

module.exports = {
    'NextEvent': () => {
        const emit = this.emit.bind(this);
        meetup
            .listEvents('upcoming', false)
            .then((events) => {
                const any = events.length > 0;
                if (!any) {
                    emit(':tell', 'There are no upcoming meetups');
                } else {
                    const nextEvent = events[0];
                    const time = moment(nextEvent.time).format('YYYYMMDD');
                    emit(':tell', `
                        The next meetup is on the
                        <say-as interpret-as="date">${time}</say-as>
                    `);
                }
            })
            .catch(() => {
                emit(':tell', 'Sorry. I am having trouble finding the next meetup.');
            });
    }
};
