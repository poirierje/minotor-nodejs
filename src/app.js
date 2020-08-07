const pinger   = require( './pinger/pinger' );
const verifier = require( './verifier/verifier' );
const store    = require( './store/store' );
const { Console } = require('console');

const successCallBack = ( stringContent ) => {
    return ( pinger, url ) => {
        console.log( '-----------------------------' );
        console.log( 'Testing : ' + url );
        console.log( 'Response : ' + pinger );
        console.log( 'Verify : ' + verifier.verify( pinger.body, new Map( [[ 'containString', stringContent ]] ) ) );

        console.log( 'Storing ' + url );
        store.store( url, pinger.timeMS, pinger.status, 'OK', ( result ) => { } );
    }
};

const errorCallBack = ( err ) => {
    console.log( 'KO : ' + err );
    console.log();
};





pinger.ping( 'https://budgetparticipatif.paris.fr', successCallBack( 'portlet' ), errorCallBack );

pinger.ping( 'https://perdu.com', successCallBack( 'Perdu' ), errorCallBack );

pinger.ping( 'https://poirierje.github.io/cv/cv.html', successCallBack( 'Ackia' ), errorCallBack );

// store.find( ( result ) => { console.log( result ) } );
store.count( ( count ) => { console.log( count ) } );


