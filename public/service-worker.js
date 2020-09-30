/* eslint-env worker */

const version = '0.1.0';
const cacheName = `i1w-${version}`;
self.addEventListener( 'install', event => {
	event.waitUntil(
		caches.open( cacheName ).then( cache => {
			return cache.addAll( [
				'./',
				'./cours-profs',
				'./outils',
				'./contact',
				'./css/standard.css',
				'./css/style.css',
				'./js/script.js',
				'./js/pwa.js',
				'./js/app.js',
				'./img/infoevry-h-lsc.png.webp',
				'./img/infoevry-h-dsc.png.webp'
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