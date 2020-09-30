const helmet = require( 'helmet' );
const compression = require( 'compression' );
const express = require( 'express' );
const app = express();
const port = 3000;

// EJS
app.set( 'views', './views' );
app.set( 'view engine', 'ejs' );

// Security
function initHelmet( app, helmet ) {
	app.use( helmet.contentSecurityPolicy( {
		directives: {
			defaultSrc: ['\'self\''],
			baseUri: ['\'self\''],
			blockAllMixedContent: [],
			fontSrc: ['\'self\'', 'https:', 'data:'],
			frameAncestors: ['\'self\''],
			imgSrc: ['\'self\'', 'data:', 'edt.univ-evry.fr'],
			objectSrc: ['none'],
			scriptSrc: ['\'self\''],
			scriptSrcAttr: ['none'],
			styleSrc: ['\'self\'', 'https:', '\'unsafe-inline\''],
			upgradeInsecureRequests: []
		}
	} ) );
	app.use( helmet.dnsPrefetchControl() );
	app.use( helmet.expectCt() );
	app.use( helmet.frameguard() );
	app.use( helmet.hidePoweredBy() );
	app.use( helmet.hsts() );
	app.use( helmet.ieNoOpen() );
	app.use( helmet.noSniff() );
	app.use( helmet.permittedCrossDomainPolicies() );
	app.use( helmet.referrerPolicy() );
	app.use( helmet.xssFilter() );
}
initHelmet( app, helmet );

//Performance
app.use( compression( { level: 9 } ) );

// Static
app.use( express.static( 'public' ) );

// Parse URL-encoded bodies (as sent by HTML forms)
app.use( express.urlencoded( { extended: true } ) );

// Routes
app.get( '/', ( req, res ) => {
	res.render( 'home' );
} );

app.get( '/cours-profs', ( req, res ) => {
	res.render( 'cours-profs' );
} );

app.get( '/outils', ( req, res ) => {
	res.render( 'outils' );
} );

app.get( '/contact', ( req, res ) => {
	res.render( 'contact' );
} );

app.post( '/contact', ( req, res ) => {
	const name = req.body.name;
	const pathway = req.body.pathway;
	const subject = req.body.subject;
	const message = req.body.message;
	console.log( `Contact form:\n${name}\n${pathway}\n${subject}\n${message}` );
	res.redirect( '/contact' );
} );

// Search
app.get( '/search/:query?', ( req, res ) => {
	const { params: { query } } = req;
	res.json( { search: query } );
} );

// Error page not found
app.use( ( req, res, next ) => {
	res.status( 404 );
	res.render( 'errors/404' );
} );

app.listen( port, () => {
	console.log( `Server listening at http://localhost:${port}` );
} );