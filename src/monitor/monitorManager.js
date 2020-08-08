const storeSite = require( '../store/storeSite' );
const monitor   = require( './monitor' );

// Current running monitors (key = url, value = interval)
const monitors = new Map();

// This function launches an unlimited monitor process.
exports.addMonitor = ( site, callbackSuccess ) => {

    console.log( 'Adding monitor process : ' + site._url );

    monitors.set( 
        site._url,
        setInterval( () => {
            monitor.monitor( site._url, site._content );    
        }, site._delayMS )
    );

    callbackSuccess();
};

// This function stops a monitor process.
exports.removeMonitor = ( site ) => {

    console.log( 'Removing monitor process : ' + site._url );

    clearInterval( monitors.get( site._url ) );
};

// This function launches all unlimited monitor process.
exports.initMonitors = ( ) => {
    storeSite.find( ( result ) => {
        result.forEach( ( site ) => {
            this.addMonitor( site, () => console.log( 'Init monitor : ' + site._url ) );
        });
    });
};

