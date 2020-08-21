const https = require('https');

// This class performs a HTTPS GET request to an URL and returns obtained data.
class Pinger
{

    constructor( callbackSUCCESS, callbackERROR ) 
    {
        this.callbackSUCCESS = callbackSUCCESS;
        this.callbackERROR   = callbackERROR;

        this.status = -1 ;
        this.body   = '' ;
        this.timeMS = -1 ;
    }

    ping( url, initialUrl ) {
        this.status = 999;
        this.body   = '';
        
        let start = Date.now();

        // Performs the call
        https.get( url, ( response ) => 
        {
            response.on( 'data', ( chunk ) => this.body += chunk );
            response.on( 'end' , ( ) => {

                if ( response.statusCode === 302 ) {
                    this.ping( response.headers['location'], initialUrl );
                } else {
                    this.status = response.statusCode;
                    this.timeMS = Date.now() - start;
                    this.callbackSUCCESS( this, url, initialUrl );
                }
            });
        }).on("error", ( err ) => 
        {
            this.callbackERROR( err );
        });
    };

    toString() {
        return '[' + this.status + ', \'' + truncate( this.body, 5 ) + '\', ' + this.timeMS + ' ms]';
    }

}

// Basic truncate function which add hellip at the end if exceeding specified length
function truncate( str, n ){
    return (str.length > n) ? str.substr(0, n-1) + '…' : str;
};

// This function uses Pinger class to perform a request.
// If success, execute callbackSUCCESS function with the Pinger as param
// If error, execute callbackERROR function with the error as param
function ping( url, callbackSUCCESS, callbackERROR ) {
    _pinger = new Pinger( callbackSUCCESS, callbackERROR );

    _pinger.ping( url, url );
}

// Use example : 
// ping( 'https://perdu.com', ( pinger ) => console.log( 'OK : ' + pinger ), ( err ) => console.log( 'KO : ' + err ) );

exports.Pinger = Pinger;
exports.ping   = ping  ;
