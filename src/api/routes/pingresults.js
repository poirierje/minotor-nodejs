const express           = require( 'express' );
const pingResultsRouter = express.Router();

const storePing      = require( '../../store/storePing');
const monitorManager = require( '../../monitor/monitorManager' );

// Get all ping results
pingResultsRouter.get( '/', ( req, res, next ) => {
    storePing.find( ( result ) => { 
        res.status( 200 ).json( result ) 
    });
}); 

module.exports = pingResultsRouter;