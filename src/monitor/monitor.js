const pinger    = require('../pinger/pinger');
const verifier  = require('../verifier/verifier');
const storePing = require('../store/storePing');

// This function performs a single monitor process : ping, verify, store.
exports.monitor = ( url, content ) => {

    console.log( 'Monitoring : ' + url );

    pinger.ping( 
        url, 
        ( pinger, url, initialUrl ) => {
            verifier.verify(
                pinger.body,
                new Map( [[ 'containString', content ]] ),
                () => { storePing.store( initialUrl, pinger.timeMS, pinger.status, 'OK', ( result ) => { } ); },
                () => { storePing.store( initialUrl, pinger.timeMS, pinger.status, 'KO', ( result ) => { } ); }
            );
        },
        ( error ) => { console.log( 'Error when monitoring ' + url + ' : ' + error ); }
    );
};