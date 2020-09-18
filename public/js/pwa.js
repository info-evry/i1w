/* eslint-env browser */
if ( 'serviceWorker' in navigator ) {
	navigator.serviceWorker.register( 'service-worker.js' ).then( registration => {
		console.log( 'Service Worker Registered' );
		console.log(registration);
	} );

	navigator.serviceWorker.ready.then(  () => {
		console.log( 'Service Worker Ready' );
	} );
}