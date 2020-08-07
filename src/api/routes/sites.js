const express    = require( 'express' );
const siteRouter = express.Router();

const storeSite = require( '../../store/storeSite')

siteRouter.get( '/', ( req, res, next ) => {
    res.status( 200 ).json( storeSite.find( () => { } ) );
}); 

siteRouter.post( '/', ( req, res, next ) => {
    res.status( 200 ).json( { message : 'POST Sites !' } );
}); 

module.exports = siteRouter;