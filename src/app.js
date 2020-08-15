const express     = require( 'express' );
const sitesRouter       = require( './api/routes/sites' );
const pingResultsRouter = require( './api/routes/pingresults' );

const monitorManager = require( './monitor/monitorManager' );

// Create REST API request handler
const app     = express();

app.use( '/sites', sitesRouter );
app.use( '/ping-results', pingResultsRouter );

app.use( '/', ( req, res ) => {
    res.status( 200 ).json( { message : 'Hello.' } );
});

module.exports = app;

// Launch monitors
monitorManager.initMonitors();