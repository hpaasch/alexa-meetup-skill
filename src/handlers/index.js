'use strict';

const moment = require('moment');

const meetup = require('../lib/meetup');

module.exports = {
    'NextEvent': function() {
        const emit = this.emit.bind(this);
        meetup
            .listEvents('upcoming', false)
            .then((events) => {
                const any = events.length > 0;
                if (!any) {
                    emit(':tell', 'There are no upcoming meetups');
                } else {
                    const nextEvent = events[0];
                    const time = moment(nextEvent.time);
                    emit(
                        ':tell',
                        `The next meetup is on
                        <say-as interpret-as="date">${time.format('YYYYMMDD')}</say-as>.
                        ${time.diff(moment(), 'days')} days from now.`
                    );
                }
            })
            .catch(() => {
                emit(':tell', 'Sorry. I am having trouble finding the next meetup.');
            });
    }
};
