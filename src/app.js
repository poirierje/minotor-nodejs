const express     = require( 'express' );
const sitesRouter = require( './api/routes/sites' );

const app     = express();

app.use( '/sites', sitesRouter );

app.use( '/', ( req, res ) => {
    res.status( 200 ).json( { message : 'Hello.' } );
});

module.exports = app;