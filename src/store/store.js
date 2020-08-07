// This library stores pings into MongoDB.

const mongoose = require('mongoose');
mongoose.connect( 'mongodb://localhost/monitor', { useNewUrlParser : true, useUnifiedTopology: true } );

const db = mongoose.connection;
db.on  ( 'error', ( err ) => { console.log( 'Error accessing MongoDB : ' + err ); } );
db.once( 'open' , (     ) => { console.log( 'Connected to MongoDB.'); } );

// Creates and compiles ping result schema.
const pingResultSchema = new mongoose.Schema( {
        _time : { type : Date, default: Date.now },
        _url : String,
        _durationMS : Number,
        _responseCode : String,
        _verifyResult : String
    },
    { toObject: { getters: true } 
} );

const pingResultModel = mongoose.model( 'PingResult', pingResultSchema );

// Function to store ping result
exports.store = ( url, durationMS, responseCode, verifyResult, callbackSuccess ) => {
    const data = new pingResultModel( {
        _url : url,
        _durationMS : durationMS,
        _responseCode : responseCode,
        _verifyResult : verifyResult
    } );

    data.save( ( err, result ) => {
        if ( err ) {
            console.log( 'Error saving : ' + err );
        } else {
            callbackSuccess( result );
        }
    } );
}

// Function to count records
exports.count = ( callbackSuccess ) => {
    pingResultModel.countDocuments( ( err, count ) => {
        if ( err ) {
            console.log( 'Error finding : ' + err );
        } else {
            callbackSuccess( count );
        };
    });        
}

// Function to find all records
exports.find = ( callbackSuccess ) => {
    pingResultModel.find( ( err, result ) => {
        if ( err ) {
            console.log( 'Error finding : ' + err );
        } else {
            callbackSuccess( result );
        };
    });        
}