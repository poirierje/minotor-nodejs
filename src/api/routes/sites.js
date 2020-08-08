const express        = require( 'express' );
const siteRouter     = express.Router();

const storeSite      = require( '../../store/storeSite');
const monitorManager = require( '../../monitor/monitorManager' );

// Get all sites
siteRouter.get( '/', ( req, res, next ) => {
    res.status( 200 ).json( storeSite.find( () => { } ) );
}); 

// Add a site
siteRouter.post( '/:url/:content/:delayMS', ( req, res, next ) => {
    const url     = req.params.url;
    const content = req.params.content;
    const delayMS = req.params.delayMS;
    
    // Store new site, then add monitor
    storeSite.store( url, content, delayMS, true, ( result ) => {
        monitorManager.addMonitor( result, () => {
            res.status( 200 ).json({
                message: 'Created site : ' + url               
            });
        } );
    })
    
}); 

module.exports = siteRouter;