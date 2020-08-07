// Verifies the body of the HTTPS reponse contains the specified string.
// The searched string must be keyed by 'containString' in args hashmap.
exports.verify = ( body, args ) => {
    return body.includes( args.get('containString') );
}