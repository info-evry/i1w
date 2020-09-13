/* eslint-env worker */

const version = '0.1.0';
const cacheName = `i1w-${version}`;
self.addEventListener( 'install', e => {
	const timeStamp = Date.now();
	e.waitUntil(
		caches.open( cacheName ).then( cache => {
			return cache.addAll( [
				'/',
				`/?timestamp=${timeStamp}`,
				`/cours-profs?timestamp=${timeStamp}`,
				`/outils?timestamp=${timeStamp}`,
				`/contact?timestamp=${timeStamp}`,
				`/css/standard.css?timestamp=${timeStamp}`,
				`/css/style.css?timestamp=${timeStamp}`,
				`/js/script.js?timestamp=${timeStamp}`,
				`/js/aemi.js?timestamp=${timeStamp}`,
				`/js/edt.js?timestamp=${timeStamp}`,
				`/img/infoevry-h-lsc.png.webp?timestamp=${timeStamp}`,
				`/img/infoevry-h-dsc.png.webp?timestamp=${timeStamp}`
			] )
				.then( () => self.skipWaiting() );
		} )
	);
} );

self.addEventListener( 'activate', event => {
	event.waitUntil( self.clients.claim() );
} );

self.addEventListener( 'fetch', event => {
	event.respondWith(
		caches.open( cacheName )
			.then( cache => cache.match( event.request, { ignoreSearch: true } ) )
			.then( response => {
				return response || fetch( event.request );
			} )
	);
} );