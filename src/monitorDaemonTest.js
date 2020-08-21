const monitorManager = require( './monitor/monitorManager' );
const storeSite      = require( './store/storeSite' );
const { Console }    = require('console');

// Site
storeSite.store( 'https://budgetparticipatif.paris.fr', 'portlet', 1000, true, ( result ) => {
    storeSite.count( ( count ) => {
        console.log( 'Avant : ' + count );
        
        // Init monitors from DB
        monitorManager.initMonitors();
        
        storeSite.deleteAll( ( result ) => {
            storeSite.count( ( count ) => {
                console.log( 'Après : ' + count );
            });
        });
    });
});

// Monitor
// monitor.monitor( 'https://budgetparticipatif.paris.fr', 'portlet' );
// monitor.monitor( 'https://perdu.com', 'Perdu' );
// monitor.monitor( 'https://poirierje.github.io/cv/cv.html', 'Ackia' );

// storePing.count( ( count ) => { console.log( count ) } );

