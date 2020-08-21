// Verifies the body of the HTTPS reponse contains the specified string.
// The searched string must be keyed by 'containString' in args hashmap.
exports.verify = ( body, args, callbackTrue, callbackFalse ) => {
    if ( body.includes( args.get('containString') ) ) {
        callbackTrue();
    } else {
        callbackFalse();
    }
}