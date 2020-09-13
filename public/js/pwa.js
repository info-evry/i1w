/* eslint-env browser */
if ( 'serviceWorker' in navigator ) {
	navigator.serviceWorker.register( '/service-worker.js', { scope: '/' } )
		.then( ( ) => {
			console.log( 'Service Worker Registered' );
		} );

	navigator.serviceWorker.ready.then(  () => {
		console.log( 'Service Worker Ready' );
	} );
}