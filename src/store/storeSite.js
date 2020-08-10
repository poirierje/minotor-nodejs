// This library stores sites into MongoDB.

const mongoose = require('mongoose');
mongoose.connect( 'mongodb://localhost/monitor', { useNewUrlParser : true, useUnifiedTopology: true } );

const db = mongoose.connection;
db.on  ( 'error', ( err ) => { console.log( 'Error accessing MongoDB : ' + err ); } );
db.once( 'open' , (     ) => { console.log( 'Connected to MongoDB.'); } );

// Creates and compiles ping result schema.
const siteSchema = new mongoose.Schema( {
        _url     : String,
        _content : String, // String content the presence of which is to check in the body
        _delayMS : Number,
        _active  : Boolean
    },
    { toObject: { getters: true } 
} );

const siteModel = mongoose.model( 'Site', siteSchema );

// Function to store site
exports.store = ( url, content, delayMS, active, callbackSuccess ) => {
    const data = new siteModel( {
        _url     : url,
        _content : content,
        _delayMS : delayMS,
        _active  : active
    } );

    data.save( ( err, result ) => {
        if ( err ) {
            console.log( 'Error saving site : ' + err );
        } else {
            callbackSuccess( result );
        }
    } );
}

// Function to count records
exports.count = ( callbackSuccess ) => {
    siteModel.countDocuments( ( err, count ) => {
        if ( err ) {
            console.log( 'Error counting site : ' + err );
        } else {
            callbackSuccess( count );
        };
    });        
}

// Function to find all records
exports.find = ( callbackSuccess ) => {

    siteModel.find( ( err, result ) => {
        if ( err ) {
            console.log( 'Error finding site : ' + err );
        } else {
            callbackSuccess( result );
        };
    });        
}

// Function to delete all records
exports.deleteAll = ( callbackSuccess ) => {
    siteModel.deleteMany( { }, ( err, result ) => {
        if ( err ) {
            console.log( 'Error deleting all sites : ' + err );
        } else {
            callbackSuccess( result );
        };
    });        
}