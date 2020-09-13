/* eslint-env browser */

'use script';

function is( object ) {
	return object !== null && object !== undefined;
}

function isset( object ) {
	return is( object ) && object !== '';
}

function getGlobal() {
	const value = globalThis || self || window || global;
	if ( value ) {
		return value;
	}
	throw new Error( 'Unable to get global object.' );
}

function entries( object, func ) {
	for ( const key in object ) {
		if ( Object.prototype.hasOwnProperty.call( object, key ) ) {
			func( key, object[key] );
		}
	}
}

function isNumber( variable ) {
	return typeof variable === 'number' || variable instanceof Number;
}

function isString( variable ) {
	return typeof variable === 'string' || variable instanceof String;
}

function isBoolean( variable ) {
	return typeof variable === 'boolean';
}

function isFunction( object ) {
	return typeof object === 'function' || object instanceof Function ? object : false;
}

function isObject( object ) {
	return typeof object === 'object' || object instanceof Object;
}

function isURL( object ) {
	if ( isString( object ) ) {
		try {
			return new URL( object ) instanceof URL;
		} catch ( _ ) {
			return false;
		}
	} else {
		return object instanceof URL;
	}
}

function identifier( length ) {
	'use script';
	const values = [];
	const list = [];
	for ( let i = 0; i < 62; i += 1 ) {
		if ( i < 10 ) {
			values[i] = 48 + i;
		} else if ( i < 36 ) {
			values[i] = 65 + ( i - 10 );
		} else if ( i < 62 ) {
			values[i] = 97 + ( i - 36 );
		}
	}
	for ( let i = 0; i < ( length || 16 ); i += 1 ) {
		list[i] = values[Math.floor( Math.random() * 62 )];
	}
	return String.fromCharCode( ...list );
}

function inhibitEvent( event ) {
	event.preventDefault();
	event.stopPropagation();
}

function catchError( caughtError, customMessage ) {
	if ( typeof caughtError === 'string' ) {
		caughtError = new Error( caughtError );
	}
	setTimeout( () => {
		console.group( caughtError.name );
		console.warn( caughtError.name );
		console.warn( caughtError.message );
		console.warn( caughtError.stack );
		console.groupEnd( caughtError.name );
	}, 0 );
	return false;
}

function byId( string ) {
	return document.getElementById( string );
}

function byClass( string, element ) {
	return ( element || document ).getElementsByClassName( string );
}

function requestFrame() {
	const [func, ...args] = arguments;
	if ( isFunction( func ) ) {
		return window.requestAnimationFrame( timestamp => func( timestamp, ...args ) );
	}
	throw new Error( `${func} is not a function.` );
}

function cancelFrame( id ) {
	try {
		cancelAnimationFrame( id );
		return true;
	} catch ( error ) {
		catchError( error );
		return false;
	}
}

function hasClass( element, className ) {
	if ( is( element ) && isset( className ) ) {
		return element.classList.contains( className );
	} else {
		return catchError( `element:${element} or class:${className} is undefined.` );
	}
}

function addClass( element, className, doNotRequestFrame ) {
	doNotRequestFrame = doNotRequestFrame || true;
	if ( is( element ) && isset( className ) ) {
		if ( doNotRequestFrame ) {
			element.classList.add( className );
			return true;
		} else {
			return !!requestFrame( () => element.classList.add( className ) );
		}
	}
	return catchError( `element:${element} or class:${className} is undefined.` );
}

function removeClass( element, className, doNotRequestFrame ) {
	doNotRequestFrame = doNotRequestFrame || true;
	if ( is( element ) && isset( className ) ) {
		if ( doNotRequestFrame ) {
			element.classList.remove( className );
			return true;
		} else {
			return !!requestFrame( () => element.classList.remove( className ) );
		}
	}
	return catchError( `element:${element} or class:${className} is undefined.` );
}

function toggleClass( element, className ) {
	if ( is( element ) && isset( className ) ) {
		const boolean = hasClass( element, className );
		if ( isBoolean( boolean ) ) {
			requestFrame( () =>
				boolean ? !removeClass( element, className ) : addClass( element, className )
			);
			return !boolean;
		}
	}
	return catchError( `element:${element} or class:${className} is undefined.` );
}

function attr() {
	const [element, attrName, value] = arguments;
	if ( is( value ) ) {
		return element.setAttribute( attrName, value );
	}
	return element.getAttribute( attrName );
}

function data() {
	const [element, dataset, value] = arguments;
	if ( isset( dataset ) ) {
		if ( is( value ) ) {
			element.dataset[dataset] = value;
			return element.dataset[dataset];
		}
		return element.dataset[dataset];
	}
	return element.dataset;
}

class Easing {
	constructor () { }
	static linearTween( t, b, c, d ) {
		return c * t / d + b;
	}
	static easeInQuad( t, b, c, d ) {
		t /= d;
		return c * t * t + b;
	}
	static easeOutQuad( t, b, c, d ) {
		t /= d;
		return -c * t * ( t - 2 ) + b;
	}
	static easeInOutQuad( t, b, c, d ) {
		t /= d / 2;
		if ( t < 1 ) {
			return c / 2 * t * t + b;
		}
		t--;
		return -c / 2 * ( t * ( t - 2 ) - 1 ) + b;
	}
	static easeInCubic( t, b, c, d ) {
		t /= d;
		return c * t * t * t + b;
	}
	static easeOutCubic( t, b, c, d ) {
		t /= d;
		t--;
		return c * ( t * t * t + 1 ) + b;
	}
	static easeInOutCubic( t, b, c, d ) {
		t /= d / 2;
		if ( t < 1 ) {
			return c / 2 * t * t * t + b;
		}
		t -= 2;
		return c / 2 * ( t * t * t + 2 ) + b;
	}
	static easeInQuart( t, b, c, d ) {
		t /= d;
		return c * t * t * t * t + b;
	}
	static easeOutQuart( t, b, c, d ) {
		t /= d;
		t--;
		return -c * ( t * t * t * t - 1 ) + b;
	}
	static easeInOutQuart( t, b, c, d ) {
		t /= d / 2;
		if ( t < 1 ) {
			return c / 2 * t * t * t * t + b;
		}
		t -= 2;
		return -c / 2 * ( t * t * t * t - 2 ) + b;
	}
	static easeInQuint( t, b, c, d ) {
		t /= d;
		return c * t * t * t * t * t + b;
	}
	static easeOutQuint( t, b, c, d ) {
		t /= d;
		t--;
		return c * ( t * t * t * t * t + 1 ) + b;
	}
	static easeInOutQuint( t, b, c, d ) {
		t /= d / 2;
		if ( t < 1 ) {
			return c / 2 * t * t * t * t * t + b;
		}
		t -= 2;
		return c / 2 * ( t * t * t * t * t + 2 ) + b;
	}
	static easeInSine( t, b, c, d ) {
		return -c * Math.cos( t / d * ( Math.PI / 2 ) ) + c + b;
	}
	static easeOutSine( t, b, c, d ) {
		return c * Math.sin( t / d * ( Math.PI / 2 ) ) + b;
	}
	static easeInOutSine( t, b, c, d ) {
		return -c / 2 * ( Math.cos( Math.PI * t / d ) - 1 ) + b;
	}
	static easeInExpo( t, b, c, d ) {
		return c * Math.pow( 2, 10 * ( t / d - 1 ) ) + b;
	}
	static easeOutExpo( t, b, c, d ) {
		return c * ( -Math.pow( 2, -10 * t / d ) + 1 ) + b;
	}
	static easeInOutExpo( t, b, c, d ) {
		t /= d / 2;
		if ( t < 1 ) {
			return c / 2 * Math.pow( 2, 10 * ( t - 1 ) ) + b;
		}
		t--;
		return c / 2 * ( -Math.pow( 2, -10 * t ) + 2 ) + b;
	}
	static easeInCirc( t, b, c, d ) {
		t /= d;
		return -c * ( Math.sqrt( 1 - t * t ) - 1 ) + b;
	}
	static easeOutCirc( t, b, c, d ) {
		t /= d;
		t--;
		return c * Math.sqrt( 1 - t * t ) + b;
	}
	static easeInOutCirc( t, b, c, d ) {
		t /= d / 2;
		if ( t < 1 ) {
			return -c / 2 * ( Math.sqrt( 1 - t * t ) - 1 ) + b;
		}
		t -= 2;
		return c / 2 * ( Math.sqrt( 1 - t * t ) + 1 ) + b;
	}
}

function smoothScrollTo( selector, duration ) {
	const easing = Easing.easeInOutCubic;
	const target = document.querySelector( selector );
	if ( !( target instanceof HTMLElement ) ) {
		return;
	}
	const startPosition = window.pageYOffset;
	const targetPosition = startPosition + target.getBoundingClientRect().top;
	duration = duration || 1000;
	const distance = targetPosition - startPosition;
	let startTime = null;

	function animation( currentTime ) {
		startTime = is( startTime ) ? startTime : currentTime;
		const timeElapsed = currentTime - startTime;
		const run = easing( timeElapsed, startPosition, distance, duration );
		window.scrollTo( 0, run );
		if ( timeElapsed < duration ) {
			requestFrame( animation );
		}
	}
	requestFrame( animation );
}

/** @returns {HTMLElement} */
function ecs() {
	const ce = a => document.createElement( isset( a ) ? a : 'div' );
	const ac = ( a, b ) => {
		a.appendChild( b );
		return a;
	};
	const l = [...arguments].filter( isset );
	const ll = l.length;
	if ( ll === 0 ) {
		return ce();
	} else if ( ll !== 1 ) {
		const a = ce();
		for ( const b of l ) {
			ac( a, ecs( b ) );
		}
		return a;
	}
	let e = l.pop();
	if ( e instanceof Element ) {
		return ac( ce(), e );
	}
	const { attr: a, class: c, data, events, id, ns, style, actions, _, $ } = e;
	if ( id || c || $ ) {
		if ( ns ) {
			e = document.createElementNS( ns, $ );
		} else {
			e = ce( $ );
		}
		if ( id ) {
			e.id = id;
		}
		if ( c ) {
			e.classList.add( ...c );
		}
	} else {
		e = ce();
	}
	if ( a ) {
		entries( a, ( k, v ) => {
			attr( e, k, v );
		} );
	}
	if ( data ) {
		entries( data, ( k, v ) => {
			e.dataset[k] = v;
		} );
	}
	if ( events ) {
		events.forEach( ev => e.addEventListener( ...ev ) );
	}
	if ( style ) {
		entries( style, ( k, v ) => {
			e.style[k] = v;
		} );
	}
	if ( _ ) {
		for ( const i of _ ) {
			if ( i instanceof Element ) {
				ac( e, i );
			} else if ( ['string', 'number', 'bigint', 'boolean', 'symbol'].includes( typeof i ) ) {
				e.innerHTML += `${i}`;
			} else {
				try {
					ac( e, ecs( i ) );
				} catch ( _ ) {
					catchError( _ );
				}
			}
		}
	}
	if ( actions ) {
		entries( actions, ( k, v ) => {
			const a = k.split( /_\$/ );
			if ( a.length > 1 ) {
				e[a[0]]( ...v );
			} else {
				e[k]( ...v );
			}
		} );
	}
	return e;
}

function ecsScript() {
	const c = document.currentScript;
	if ( ![document.head, document.documentElement].includes( c.parentElement ) ) {
		for ( const b of arguments ) {
			c.insertAdjacentElement( 'beforebegin', ecs( b ) );
		}
		c.remove();
	}
}
class Wait {
	constructor () { }
	static time( time ) {
		return new Promise( resolve => setTimeout( resolve, time ) );
	}
	static async first() {
		return Promise.race( ...arguments );
	}
	static async delay() {
		const [func, timeout, ...args] = arguments;
		return setTimeout( func, timeout || 0, ...args );
	}
	static async async() {
		const [func, ...args] = arguments;
		return func( ...args );
	}
	static async asyncDelay() {
		const [func, ...args] = arguments;
		return Wait.delay( func, ...args );
	}
	static async loading() {
		const [func, ...args] = arguments;
		if ( document.readyState === 'loading' ) {
			func( ...args );
		}
	}
	static async interactive() {
		const [func, ...args] = arguments;
		if ( document.readyState !== 'loading' ) {
			func( ...args );
		} else {
			document.addEventListener( 'readystatechange', () => func( ...args ) );
		}
	}
	static async complete() {
		const [func, ...args] = arguments;
		if ( document.readyState === 'complete' ) {
			func( ...args );
		} else {
			document.addEventListener( 'readystatechange', () =>
				document.readyState === 'complete' ? func( ...args ) : null
			);
		}
	}
	static async DOMContentLoaded() {
		const [func, ...args] = arguments;
		if ( document.readyState === 'interactive' || document.readyState === 'complete' ) {
			func( ...args );
		} else {
			document.addEventListener( 'DOMContentLoaded', () => func( ...args ) );
		}
	}
	static async ready() {
		const [func, ...args] = arguments;
		if ( document.readyState !== 'loading' ) {
			func( ...args );
		} else {
			document.addEventListener( 'readystatechange', () =>
				document.readyState === 'complete' ? func( ...args ) : null
			);
		}
	}
	static async load() {
		const [func, ...args] = arguments;
		window.addEventListener( 'load', () => func( ...args ) );
	}
}
class Environment {
	constructor () {
		this.actions = [];
		this.properties = new Object( null );
	}
	async set( key, value ) {
		return this.properties[key] = value;
	}
	async parallel( array ) {
		try {
			return Promise.all( array );
		} catch ( _ ) {
			return array;
		}
	}
	has( key ) {
		return key in this.properties;
	}
	get( key ) {
		return this.properties[key];
	}
	assert( key, value ) {
		if ( this.has( key ) ) {
			if ( is( value ) ) {
				return this.get( key ) === value;
			}
			return is( this.get( key ) );
		}
		return false;
	}
	push() {
		for ( const func of arguments ) {
			if ( isFunction( func ) ) {
				this.actions.push( func );
			} else {
				catchError( `func:${func} is not a function.` );
			}
		}
	}
	async run() {
		try {
			return Promise.all( this.actions.map( Wait.interactive ) );
		} catch ( _ ) {
			return catchError( _ );
		}
	}
}
class Cookies {
	constructor () { }
	static get( string ) {
		return new Map(
			decodeURIComponent( document.cookie )
				.split( /;/ )
				.map( string => string.trim().split( /=/ ) )
		).get( string );
	}
	static has( string ) {
		return new Map(
			decodeURIComponent( document.cookie )
				.split( /;/ )
				.map( string => string.trim().split( /=/ ) )
		).has( string );
	}
	static set( cookieName, cookieValue, options ) {
		options = is( options ) && isObject( options ) ? options : {};
		let { expiration } = options;
		const { sameSite } = options;
		if ( !is( expiration ) ) {
			const newDate = new Date();
			const year = 365.244 * 24 * 3600 * 1000;
			newDate.setTime( newDate.getTime() + year );
			expiration = newDate.toGMTString();
		}
		const expirationString = `expires=${expiration}`;
		const sameSiteString = `SameSite=${sameSite || 'Strict'};Secure`;
		document.cookie =
			`${cookieName}=${encodeURIComponent( cookieValue )};path=/;${expirationString};${sameSiteString}`;
	}
	static delete( cookieName ) {
		const newDate = new Date();
		const year = 365.244 * 24 * 3600 * 1000;
		newDate.setTime( newDate.getTime() - year );
		const expirationString = `expires=${newDate.toGMTString()}`;
		document.cookie = `${cookieName}=${''};${expirationString};`;
	}
}
class PromiseWorker {
	constructor ( url ) {
		PromiseWorker.assert();
		this.worker = new Worker( url );
		this.worker.onmessage = PromiseWorker.onMessage;
	}
	get env() {
		return getGlobal().PromiseWorkers;
	}
	get onmessage() {
		return this.worker.onmessage;
	}
	postMessage( data ) {
		return PromiseWorker.postMessage( data, this.worker );
	}
	static assert() {
		const self = getGlobal();
		if ( !( 'PromiseWorkers' in self ) ) {
			self.PromiseWorkers = {
				resolves: [],
				rejects: []
			};
		} else if ( !( 'resolves' in self.PromiseWorkers && 'rejects' in self.PromiseWorkers ) ) {
			self.PromiseWorkers.resolves = [];
			self.PromiseWorkers.rejecs = [];
		}
	}
	static postMessage( data, worker ) {
		const messageId = PromiseWorker.id();
		const message = {
			id: messageId,
			data: data
		};
		return new Promise( ( resolve, reject ) => {
			PromiseWorker.resolves[messageId] = resolve;
			PromiseWorker.rejects[messageId] = reject;
			worker.postMessage( message );
		} );
	}
	static onMessage( message ) {
		const {
			id,
			err,
			data
		} = message.data;
		const resolve = PromiseWorker.resolves[id];
		const reject = PromiseWorker.rejects[id];
		if ( is( data ) ) {
			if ( resolve ) {
				resolve( data );
			}
		} else if ( is( reject ) ) {
			if ( err ) {
				reject( err );
			} else {
				reject( 'Got nothing' );
			}
		}
		PromiseWorker.delete( id );
	}
	static get resolves() {
		PromiseWorker.assert();
		return getGlobal().PromiseWorkers.resolves;
	}
	static get rejects() {
		return getGlobal().PromiseWorkers.rejects;
	}
	static delete( id ) {
		delete PromiseWorker.resolves[id];
		delete PromiseWorker.rejects[id];
	}
	static id( length ) {
		const values = [];
		const list = [];
		for ( let i = 0; i < 62; i += 1 ) {
			if ( i < 10 ) {
				values[i] = 48 + i;
			} else if ( i < 36 ) {
				values[i] = 65 + ( i - 10 );
			} else if ( i < 62 ) {
				values[i] = 97 + ( i - 36 );
			}
		}
		for ( let i = 0; i < ( length || 16 ); i += 1 ) {
			list[i] = values[Math.floor( Math.random() * 62 )];
		}
		return String.fromCharCode( ...list );
	}
}

function isToggled( element ) {
	return hasClass( element, 'toggled' );
}

function doToggle( element ) {
	return toggleClass( element, 'toggled' );
}

function addNoOpener( link ) {
	if ( link instanceof HTMLAnchorElement ) {
		const relAttr = attr( link, 'rel' ) || '';
		if ( !relAttr.includes( 'noopener' ) ) {
			attr( link, 'rel', isset( relAttr ) ? `${relAttr} noopener` : 'noopener' );
		}
	}
}

const blockScroll = () => { };
const freeScroll = () => { };

const aemi = new Environment();

aemi.parallel( [
	aemi.set( 'global', getGlobal() ),
	aemi.set( 'site-header', byId( 'site-header' ) ),
	aemi.set( 'site-loop', byId( 'site-loop' ) ),
	aemi.set( 'first-header', byClass( 'post-header' )[0] ),
	aemi.set( 'nav-toggle', byId( 'navigation-toggle' ) ),
	aemi.set( 'sea-toggle', byId( 'search-toggle' ) ),
	aemi.set( 'sea-input', byId( 'search-input-0' ) ),
	aemi.set( 'pro-bar', byId( 'site-progress-bar' ) ),
	aemi.set( 'csh-sel', byId( 'color-scheme-selector' ) ),
	aemi.set( 'csh-light', byId( 'light-scheme-option' ) ),
	aemi.set( 'csh-dark', byId( 'dark-scheme-option' ) ),
	aemi.set( 'csh-auto', byId( 'auto-scheme-option' ) )
] );

class ColorScheme {
	constructor () {
		this.scheme = ColorScheme.init();
	}

	static hasCookie() {
		return Cookies.has( 'color-scheme' );
	}

	static setCookie( scheme ) {
		Cookies.set( 'color-scheme', scheme );
		return ColorScheme.getCookiesState() === scheme;
	}

	static deleteCookie() {
		Cookies.delete( 'color-scheme' );
		return Cookies.has( 'color-scheme' ) === false;
	}

	static getOppositeState( scheme ) {
		return isset( scheme ) ? scheme === 'light' ? 'dark' : 'light' : null;
	}

	static getAutoState() {
		return hasClass( document.body, 'color-scheme-auto' );
	}

	static getClassState() {
		if ( hasClass( document.body, 'color-scheme-light' ) ) {
			return 'light';
		}
		if ( hasClass( document.body, 'color-scheme-dark' ) ) {
			return 'dark';
		}
		return null;
	}

	static getUserState() {
		if ( aemi instanceof Environment ) {
			return aemi.assert( 'csh-sel' );
		}
		return is( byId( 'color-scheme-selector' ) );
	}

	static getCookiesState() {
		const preference = Cookies.get( 'color-scheme' );
		return isset( preference ) ? preference : null;
	}

	static getBrowerState() {
		try {
			const matchMedia = window.matchMedia( '(prefers-color-scheme: light' );
			return matchMedia.matches !== 'not all' ? matchMedia.matches ? 'light' : 'dark' : null;
		} catch ( error ) {
			catchError( error );
			return null;
		}
	}

	static getState() {

		const classState = ColorScheme.getClassState();
		const userState = ColorScheme.getUserState();
		const cookieState = ColorScheme.getCookiesState();
		const browserState = ColorScheme.getBrowerState();

		if ( isset( classState ) ) {
			if ( userState ) {
				if ( isset( cookieState ) ) {
					return cookieState;
				}
			} else {
				ColorScheme.deleteCookie();
			}
			return classState;
		}
		if ( userState ) {
			if ( isset( cookieState ) ) {
				return cookieState;
			}
		} else {
			ColorScheme.deleteCookie();
		}
		if ( isset( browserState ) ) {
			return browserState;
		}
		return 'light';
	}

	static detect() {
		const colorScheme = new ColorScheme();
		getGlobal().colorScheme = colorScheme;
		return colorScheme.scheme;
	}

	static toLightScheme( element ) {
		if ( hasClass( element, 'color-scheme-dark' ) ) {
			removeClass( element, 'color-scheme-dark' );
			addClass( element, 'color-scheme-light' );
		}
	}

	static toDarkScheme( element ) {
		if ( hasClass( element, 'color-scheme-light' ) ) {
			removeClass( element, 'color-scheme-light' );
			addClass( element, 'color-scheme-dark' );
		}
	}

	static change( scheme, cookie ) {
		const env = getGlobal();
		switch ( scheme ) {
		case 'dark': {
			removeClass( document.body, 'color-scheme-light', false );
			addClass( document.body, 'color-scheme-dark', false );
			break;
		}
		case 'light': {
			removeClass( document.body, 'color-scheme-dark', false );
			addClass( document.body, 'color-scheme-light', false );
			break;
		}
		case 'auto': {
			const browserState = ColorScheme.getBrowerState() || ColorScheme.getClassState() || 'light';
			const oppositeState = ColorScheme.getOppositeState( browserState );
			removeClass( document.body, `color-scheme-${oppositeState}` );
			addClass( document.body, `color-scheme-${browserState}` );
			break;
		}
		default: {
			throw new Error( 'scheme is not defined.' );
		}
		}
		if ( 'colorScheme' in env ) {
			env.colorScheme.scheme = scheme;
		}
		if ( cookie ) {
			ColorScheme.setCookie( scheme );
		}
		return scheme;
	}

	static init() {
		const support = isset( ColorScheme.getBrowerState() );
		const matchMedia = window.matchMedia( '(prefers-color-scheme: light)' );
		if ( support && 'addEventListener' in matchMedia ) {
			matchMedia.addEventListener( 'change', ( event ) => {
				const autoState = ColorScheme.getAutoState();
				const classState = ColorScheme.getClassState();
				const userState = ColorScheme.getUserState();
				const cookieState = ColorScheme.getCookiesState();
				const browserState = ColorScheme.getBrowerState();
				if ( userState && isset( cookieState ) && cookieState === 'auto' || !( isset( classState ) && !autoState || userState ) ) {
					ColorScheme.change( browserState, false );
				}
			} );
		}
		return ColorScheme.change( ColorScheme.getState(), false );
	}
}

function isOnFirstHeader( element ) {
	const { bottom } = aemi.get( 'first-header' ).getClientRects()[0];
	const { top } = element.getClientRects()[0];
	return bottom > top;
}

function isWrapperToggled() {
	return aemi.assert( 'nav-toggle' ) && isToggled( aemi.get( 'nav-toggle' ) ) || aemi.assert( 'sea-toggle' ) && isToggled( aemi.get( 'sea-toggle' ) );
}

function schemeCoherenceCondition() {
	return hasClass( document.body, 'color-scheme-light' ) && hasClass( document.body, 'has-post-thumbnail' );
}

function changeHeaderScheme() {
	const header = aemi.get( 'site-header' );
	const bar = aemi.get( 'pro-bar' );
	const isBar = aemi.assert( 'pro-bar' );
	if ( schemeCoherenceCondition() ) {
		if ( !isWrapperToggled() ) {
			isOnFirstHeader( header ) ? ColorScheme.toDarkScheme( header ) : ColorScheme.toLightScheme( header );
			if ( isBar ) {
				isOnFirstHeader( bar ) ? ColorScheme.toDarkScheme( bar ) : ColorScheme.toLightScheme( bar );
			}
		} else {
			ColorScheme.toLightScheme( header );
			isBar && ColorScheme.toLightScheme( bar );
		}
	}
}
aemi.push( async function aemi_color_scheme() {
	const scheme = ColorScheme.detect();
	let support = false;
	if ( aemi instanceof Environment ) {
		support = aemi.assert( 'csh-sel' );
	} else {
		support = isset( byId( 'color-scheme-selector' ) );
	}
	if ( support ) {
		aemi.get( `csh-${scheme}` ).checked = true;
		aemi.get( 'csh-sel' ).addEventListener( 'input', () => {
			if ( aemi.get( 'csh-light' ).checked ) {
				ColorScheme.change( 'light', true );
			} else if ( aemi.get( 'csh-dark' ).checked ) {
				ColorScheme.change( 'dark', true );
			} else if ( aemi.get( 'csh-auto' ).checked ) {
				ColorScheme.change( 'auto', true );
			}
		} );
	}
} );

class Lightbox {
	constructor ( options, name ) {
		this.Pr = {
			na: name || 'lightbox',
			bo: document.body,
			te: null,
			Cu: {
				ir: null,
				gr: null,
				th: null,
				im: {},
				is: []
			},
			An: {
				el: null,
				in: null,
				ch: [],
				ti: null
			},
			Co: {
				nb: null,
				pb: null
			},
			Re: {
				mh: null,
				mw: null,
				nh: null,
				nw: null
			},
			St: { op: false }
		};
		this.Pr.te = ecs( {
			id: this.in( 'content-wrapper' ),
			class: [this.cn( 'content-wrapper' )]
		} );
		this.Pu = {
			op: options || {},
			bo: null,
			wr: null,
			th: []
		};
		Object.preventExtensions( this.Pr );
		Object.preventExtensions( this.Pu );
	}
	/** Lightbox Name */
	get name() {
		return this.Pr.na;
	}
	/** Document Body */
	get body() {
		return this.Pr.bo;
	}
	/** Template */
	get template() {
		return this.Pr.te;
	}
	/** Current Image Ratio */
	get currImgRatio() {
		return this.Pr.Cu.ir;
	}
	set currImgRatio( value ) {
		this.Pr.Cu.ir = value;
	}
	/** Current Group */
	get currGroup() {
		return this.Pr.Cu.gr;
	}
	set currGroup( value ) {
		this.Pr.Cu.gr = value;
	}
	/** First Clicked Image */
	get currThumbnail() {
		return this.Pr.Cu.th;
	}
	set currThumbnail( value ) {
		this.Pr.Cu.th = value;
	}
	/** Currently Shown Image */
	get currImage() {
		return this.Pr.Cu.im;
	}
	set currImage( value ) {
		this.Pr.Cu.im = value;
	}
	/** Images belonging to current group */
	get currImages() {
		return this.Pr.Cu.is;
	}
	/** Images belonging to current group */
	set currImages( value ) {
		this.Pr.Cu.is = value;
	}
	/** Reference to Animation Element */
	get animElement() {
		return this.Pr.An.el;
	}
	set animElement( value ) {
		this.Pr.An.el = value;
	}
	/** Animation Interval */
	get animInterval() {
		return this.Pr.An.in;
	}
	set animInterval( value ) {
		this.Pr.An.in = value;
	}
	/** Childs to Animate */
	get animChildren() {
		return this.Pr.An.ch;
	}
	/** Timeout until animation starts */
	get animTimeout() {
		return this.Pr.An.ti;
	}
	set animTimeout( value ) {
		this.Pr.An.ti = value;
	}
	/** Next Button */
	get nextButton() {
		return this.Pr.Co.nb;
	}
	set nextButton( value ) {
		this.Pr.Co.nb = value;
	}
	/** Previous Button */
	get prevButton() {
		return this.Pr.Co.pb;
	}
	set prevButton( value ) {
		this.Pr.Co.pb = value;
	}
	get maxHeight() {
		return this.Pr.Re.mh;
	}
	set maxHeight( value ) {
		this.Pr.Re.mh = value;
	}
	get maxWidth() {
		return this.Pr.Re.mw;
	}
	set maxWidth( value ) {
		this.Pr.Re.mw = value;
	}
	get newImageHeight() {
		return this.Pr.Re.nh;
	}
	set newImageHeight( value ) {
		this.Pr.Re.nh = value;
	}
	get newImageWidth() {
		return this.Pr.Re.nw;
	}
	set newImageWidth( value ) {
		this.Pr.Re.nw = value;
	}
	/** Is box opened ? */
	get isOpen() {
		return this.Pr.St.op;
	}
	set isOpen( value ) {
		this.Pr.St.op = value;
	}
	/** Lightbox Options */
	get options() {
		return this.Pu.op;
	}
	set options( value ) {
		this.Pu.op = value;
	}
	/** Lightbox */
	get box() {
		return this.Pu.bo;
	}
	set box( value ) {
		this.Pu.bo = value;
	}
	/** Lightbox Wrapper */
	get wrapper() {
		return this.Pu.wr;
	}
	set wrapper( value ) {
		this.Pu.wr = value;
	}
	/** List of Thumbnails */
	get thumbnails() {
		return this.Pu.th;
	}
	/** Window Height */
	get height() {
		return window.innerHeight;
	}
	/** Window Width */
	get width() {
		return window.innerWidth;
	}
	in( _ ) {
		return `${this.name}${isset( _ ) ? '-' + _ : ''}`;
	}
	cn( _ ) {
		return `${this.name}${isset( _ ) ? '-' + _ : ''}`;
	}
	dn( _ ) {
		return `data-${this.cn( _ )}`;
	}
	push() {
		for ( const el of arguments ) {
			el.addEventListener( 'click', ( event ) => {
				inhibitEvent( event );
				this.currGroup = attr( el, this.dn( 'group' ) ) || false;
				this.currThumbnail = el;
				this.open( el, false, false, false );
			} );
		}
		this.thumbnails.push( ...arguments );
	}
	getByGroup( g ) {
		return [
			...this.thumbnails.filter( ( t ) => attr( t, this.dn( 'group' ) ) === g )
		];
	}
	getPosition( t, g ) {
		const ts = this.getByGroup( g );
		for ( let i = 0, l = ts.length; i < l; i += 1 ) {
			const c1 = attr( t, 'src' ) === attr( ts[i], 'src' );
			const c2 =
				attr( t, this.dn( 'index' ) ) === attr( ts[i], this.dn( 'index' ) );
			const c3 = attr( t, this.dn() ) === attr( ts[i], this.dn() );
			if ( c1 && c2 && c3 ) {
				return i;
			}
		}
	}
	prepare( arg ) {
		const {
			wrapperSelectors: wsl,
			itemSelectors: isl,
			captionSelectors: csl
		} = arg;
		const jws = ( wsl[0] ? [...wsl] : [wsl] ).join( ',' );
		const jis = ( isl[0] ? [...isl] : [isl] ).join( ',' );
		const jcs = ( csl[0] ? [...csl] : [csl] ).join( ',' );
		const qws = [...document.querySelectorAll( jws )];
		if ( qws.length > 0 ) {
			qws.forEach( ( qwsi, i ) => {
				for ( const item of qwsi.querySelectorAll( jis ) ) {
					const el =
						item.getElementsByTagName( 'a' )[0] ||
						item.getElementsByTagName( 'img' )[0];
					if ( el.tagName === 'A' ) {
						if ( /\.(jpg|gif|png)$/.test( el.href ) ) {
							attr( el, this.dn(), el.href );
							attr( el, this.dn( 'group' ), i );
							const caption = item.querySelector( jcs );
							if ( is( caption ) ) {
								attr( el, this.dn( 'caption' ), caption.innerText );
							}
						}
					} else {
						attr( el, this.dn(), el.src );
						attr( el, this.dn( 'group' ), i );
						const caption = item.querySelector( jcs );
						if ( is( caption ) ) {
							attr( el, this.dn( 'caption' ), caption.innerText );
						}
					}
				}
			} );
			this.load();
			for ( const arg of qws ) {
				for ( const item of arg.querySelectorAll( jis ) ) {
					const caption = item.querySelector( jcs );
					if ( is( caption ) ) {
						caption.addEventListener( 'click', ( event ) => {
							inhibitEvent( event );
							item.querySelector( 'a, img' ).dispatchEvent(
								new Event( 'click' )
							);
						} );
					}
				}
			}
		}
	}
	preload() {
		const {
			currGroup: cg,
			currImages: cis,
			currThumbnail: ct
		} = this;
		if ( !cg ) {
			return false;
		}
		const prev = new Image();
		const next = new Image();
		const pos = this.getPosition( ct, cg );
		if ( pos === cis.length - 1 ) {
			prev.src =
				attr( cis[cis.length - 1], this.dn() ) || cis[cis.length - 1].src;
			next.src = attr( cis[0], this.dn() ) || cis[0].src;
		} else if ( pos === 0 ) {
			prev.src =
				attr( cis[cis.length - 1], this.dn() ) || cis[cis.length - 1].src;
			next.src = attr( cis[1], this.dn() ) || cis[1].src;
		} else {
			prev.src = attr( cis[pos - 1], this.dn() ) || cis[pos - 1].src;
			next.src = attr( cis[pos + 1], this.dn() ) || cis[pos + 1].src;
		}
	}
	startAnimation() {
		const { options: { loadingAnimation: lA } } = this;
		this.stopAnimation();
		this.animTimeout = setTimeout( () => {
			addClass( this.box, this.cn( 'loading' ) );
			if ( isNumber( lA ) ) {
				let index = 0;
				this.animInterval = setInterval( () => {
					addClass( this.animChildren[index], this.cn( 'active' ) );
					setTimeout( () => {
						removeClass(
							this.animChildren[index],
							this.cn( 'active' )
						);
					}, lA );
					index = index >= this.animChildren.length ? 0 : ++index;
				}, lA );
			}
		}, 500 );
	}
	stopAnimation() {
		const { options: { loadingAnimation: lA } } = this;
		removeClass( this.box, this.cn( 'loading' ) );
		if ( !isString( lA ) && lA ) {
			clearInterval( this.animInterval );
			for ( const child of this.animChildren ) {
				removeClass( child, this.cn( 'active' ) );
			}
		}
	}
	initializeControls() {
		if ( !this.nextButton ) {
			const ni = this.options.nextImage;
			this.nextButton = ecs( {
				$: 'span',
				class: [this.cn( 'next' ), ...!ni ? [this.cn( 'no-img' )] : []],
				_: [
					...ni ?
						[{
							$: 'img',
							attr: { src: this.options.nextImage }
						}] :
						[]
				],
				events: [
					[
						'click',
						( ev ) => {
							inhibitEvent( ev );
							this.next();
						}
					]
				]
			} );
			this.box.appendChild( this.nextButton );
		}
		addClass( this.nextButton, this.cn( 'active' ) );
		if ( !this.prevButton ) {
			const pi = this.options.prevImage;
			this.prevButton = ecs( {
				$: 'span',
				class: [this.cn( 'prev' ), ...!pi ? [this.cn( 'no-img' )] : []],
				_: [
					...pi ?
						[{
							$: 'img',
							attr: { src: this.options.prevImage }
						}] :
						[]
				],
				events: [
					[
						'click',
						( ev ) => {
							inhibitEvent( ev );
							this.prev();
						}
					]
				]
			} );
			this.box.appendChild( this.prevButton );
		}
		addClass( this.prevButton, this.cn( 'active' ) );
	}
	repositionControls() {
		if ( this.options.responsive && this.nextButton && this.prevButton ) {
			const shift = this.height / 2 - this.nextButton.offsetHeight / 2;
			this.nextButton.style.top = shift + 'px';
			this.prevButton.style.top = shift + 'px';
		}
	}
	setOptions( _ ) {
		_ = _ || {};

		function setBooleanValue( variable, def ) {
			return isBoolean( variable ) ? variable : def || false;
		}

		function setStringValue( variable, def ) {
			return isString( variable ) ? variable : def || false;
		}
		this.options = {
			boxId: _.boxId || false,
			controls: setBooleanValue( _.controls, true ),
			dimensions: setBooleanValue( _.dimensions, true ),
			captions: setBooleanValue( _.captions, true ),
			prevImage: setStringValue( _.prevImage, false ),
			nextImage: setStringValue( _.nextImage, false ),
			hideCloseButton: _.hideCloseButton || false,
			closeOnClick: setBooleanValue( _.closeOnClick, true ),
			nextOnClick: setBooleanValue( _.nextOnClick, true ),
			loadingAnimation: is( _.loadingAnimation ) ?
				_.loadingAnimation :
				true,
			animationElementCount: _.animationElementCount || 4,
			preload: setBooleanValue( _.preload, true ),
			carousel: setBooleanValue( _.carousel, true ),
			animation: isNumber( _.animation ) || _.animation === false ?
				_.animation :
				400,
			responsive: setBooleanValue( _.responsive, true ),
			maxImageSize: _.maxImageSize || 0.8,
			keyControls: setBooleanValue( _.keyControls, true ),
			hideOverflow: _.hideOverflow || true,
			onopen: _.onopen || false,
			onclose: _.onclose || false,
			onload: _.onload || false,
			onresize: _.onresize || false,
			onloaderror: _.onloaderror || false,
			onimageclick: isFunction( _.onimageclick ) ? _.onimageclick : false
		};
		let {
			boxId,
			controls,
			dimensions,
			captions,
			prevImage,
			nextImage,
			hideCloseButton,
			closeOnClick,
			nextOnClick,
			loadingAnimation,
			animationElementCount,
			preload,
			carousel,
			animation,
			responsive,
			maxImageSize,
			keyControls,
			hideOverflow,
			onopen,
			onclose,
			onload,
			onresize,
			onloaderror,
			onimageclick
		} = this.options;
		if ( boxId ) {
			this.box = byId( this.options.boxId );
			addClass( this.box, this.cn() );
		} else if ( !this.box ) {
			const el = byId( this.in() ) || ecs( { id: this.in() } );
			addClass( el, this.cn() );
			this.box = el;
			this.body.appendChild( this.box );
		}
		this.box.appendChild( this.template );
		this.wrapper = byId( this.in( 'content-wrapper' ) );
		if ( !hideCloseButton ) {
			this.box.appendChild(
				ecs( {
					$: 'span',
					id: this.in( 'close' ),
					class: [this.cn( 'close' )],
					_: ['&#x2717;'],
					events: [
						[
							'click',
							( ev ) => {
								inhibitEvent( ev );
								this.close();
							}
						]
					]
				} )
			);
		}
		if ( closeOnClick ) {
			this.box.addEventListener( 'click', ( ev ) => {
				inhibitEvent( ev );
				this.close();
			} );
		}
		if ( isString( loadingAnimation ) ) {
			this.animElement = new Image();
			this.animElement.src = loadingAnimation;
			addClass( this.animElement, this.cn( 'loading-animation' ) );
			this.box.appendChild( this.animElement );
		} else if ( loadingAnimation ) {
			loadingAnimation = isNumber( loadingAnimation ) ?
				loadingAnimation :
				200;
			this.animElement = ecs( { class: [this.cn( 'loading-animation' )] } );
			for ( let i = 0; i < animationElementCount; i += 1 ) {
				this.animChildren.push(
					this.animElement.appendChild( document.createElement( 'span' ) )
				);
			}
			this.box.appendChild( this.animElement );
		}
		if ( responsive ) {
			window.addEventListener( 'resize', () => {
				this.resize();
				if ( this.isOpen ) {
					blockScroll( this.options.env );
				}
			} );
		}
		if ( keyControls ) {
			document.addEventListener( 'keydown', ( ev ) => {
				if ( this.isOpen ) {
					inhibitEvent( ev );
					( {
						27: () => this.close(),
						37: () => this.prev(),
						39: () => this.next()
					}[ev.keyCode]() );
				}
			} );
		}
	}
	open( el, gr, callback, event ) {
		if ( el && gr ) {
			gr = false;
		}
		if ( !el && !gr ) {
			return false;
		}
		this.currGroup = gr || this.currGroup || attr( el, this.dn( 'group' ) );
		if ( this.currGroup ) {
			this.currImages = this.getByGroup( this.currGroup );
			if ( el === false ) {
				el = this.currImages[0];
			}
		}
		this.currImage.img = new Image();
		this.currThumbnail = el;
		let src;
		if ( isString( el ) ) {
			src = el;
		} else if ( attr( el, this.dn() ) ) {
			src = attr( el, this.dn() );
		} else {
			src = el.src;
		}
		this.currImgRatio = false;
		if ( !this.isOpen ) {
			if ( isNumber( this.options.animation ) ) {
				addClass( this.currImage.img, this.cn( 'animate-transition' ) );
				addClass( this.currImage.img, this.cn( 'animate-init' ) );
			}
			this.isOpen = true;
			if ( this.options.onopen ) {
				this.options.onopen( this.currImage );
			}
		}
		if (
			!this.options ||
			!is( this.options.hideOverflow ) ||
			this.options.hideOverflow
		) {
			blockScroll( this.body );
		}
		this.box.style.paddingTop = '0';
		this.wrapper.innerHTML = '';
		this.wrapper.appendChild( this.currImage.img );
		if ( this.options.animation ) {
			addClass( this.wrapper, this.cn( 'animate' ) );
		}
		const captionText = attr( el, this.dn( 'caption' ) );
		if ( captionText && this.options.captions ) {
			this.wrapper.appendChild(
				ecs( {
					$: 'p',
					class: [this.cn( 'caption' )],
					_: [captionText]
				} )
			);
		}
		addClass( this.box, this.cn( 'active' ) );
		if ( this.options.controls && this.currImages.length > 1 ) {
			this.initializeControls();
			this.repositionControls();
		}
		this.currImage.img.addEventListener( 'error', ( imageErrorEvent ) => {
			if ( this.options.onloaderror ) {
				imageErrorEvent._happenedWhile = event ? event : false;
				this.options.onloaderror( imageErrorEvent );
			}
		} );
		this.currImage.img.addEventListener( 'load', ( ev ) => {
			const { target } = ev;
			this.currImage.originalWidth = target.naturalWidth || target.width;
			this.currImage.originalHeight =
				target.naturalHeight || target.height;
			const checkClassInt = setInterval( () => {
				if ( hasClass( this.box, this.cn( 'active' ) ) ) {
					addClass( this.wrapper, this.cn( 'wrapper-active' ) );
					if ( isNumber( this.options.animation ) ) {
						addClass(
							this.currImage.img,
							this.cn( 'animate-transition' )
						);
					}
					if ( callback ) {
						callback();
					}
					this.stopAnimation();
					clearTimeout( this.animTimeout );
					if ( this.options.preload ) {
						this.preload();
					}
					if ( this.options.nextOnClick ) {
						addClass( this.currImage.img, this.cn( 'next-on-click' ) );
						this.currImage.img.addEventListener( 'click', ( ev ) => {
							inhibitEvent( ev );
							this.next();
						} );
					}
					if ( this.options.onimageclick ) {
						this.currImage.img.addEventListener( 'click', ( ev ) => {
							inhibitEvent( ev );
							this.options.onimageclick( this.currImage );
						} );
					}
					if ( this.options.onload ) {
						this.options.onload( event );
					}
					clearInterval( checkClassInt );
					this.resize();
				}
			}, 10 );
		} );
		this.currImage.img.src = src;
		this.startAnimation();
	}
	load( _ ) {
		_ = _ || this.options;
		this.setOptions( _ );
		this.push(
			...[...document.querySelectorAll( '[' + this.dn() + ']' )].map(
				( item, index ) => {
					if ( attr( item, this.dn() ) ) {
						attr( item, this.dn( 'index' ), index );
					}
					return item;
				}
			)
		);
	}
	resize() {
		if ( !this.currImage.img ) {
			return;
		}
		this.maxWidth = this.width;
		this.maxHeight = this.height;
		const boxWidth = this.box.offsetWidth;
		const boxHeight = this.box.offsetHeight;
		if (
			!this.currImgRatio &&
			this.currImage.img &&
			this.currImage.img.offsetWidth &&
			this.currImage.img.offsetHeight
		) {
			this.currImgRatio =
				this.currImage.img.offsetWidth /
				this.currImage.img.offsetHeight;
		}
		// Height of image is too big to fit in viewport
		if ( Math.floor( boxWidth / this.currImgRatio ) > boxHeight ) {
			this.newImageWidth = boxHeight * this.currImgRatio;
			this.newImageHeight = boxHeight;
		} else { // Width of image is too big to fit in viewport
			this.newImageHeight = boxWidth;
			this.newImageWidth = boxWidth / this.currImgRatio;
		}
		// decrease size with modifier
		this.newImageWidth = Math.floor(
			this.newImageWidth * this.options.maxImageSize
		);
		this.newImageHeight = Math.floor(
			this.newImageHeight * this.options.maxImageSize
		);
		// check if image exceeds maximum size
		if (
			this.options.dimensions &&
			this.newImageHeight > this.currImage.originalHeight ||
			this.options.dimensions &&
			this.newImageWidth > this.currImage.originalWidth
		) {
			this.newImageHeight = this.currImage.originalHeight;
			this.newImageWidth = this.currImage.originalWidth;
		}
		attr( this.currImage.img, 'width', this.newImageWidth );
		attr( this.currImage.img, 'height', this.newImageHeight );
		// reposition controls after timeout
		setTimeout( () => {
			this.repositionControls();
		}, 200 );
		if ( this.options.onresize ) {
			this.options.onresize( this.currImage );
		}
	}
	next() {
		if ( !this.currGroup ) {
			return;
		}
		const $0 = this.getPosition( this.currThumbnail, this.currGroup ) + 1;
		if ( this.currImages[$0] ) {
			this.currThumbnail = this.currImages[$0];
		} else if ( this.options.carousel ) {
			this.currThumbnail = this.currImages[0];
		} else {
			return;
		}
		if ( isNumber( this.options.animation ) ) {
			removeClass( this.currImage.img, this.cn( 'animating-next' ) );
			setTimeout( () => {
				this.open(
					this.currThumbnail,
					false,
					() => {
						setTimeout( () => {
							addClass(
								this.currImage.img,
								this.cn( 'animating-next' )
							);
						}, this.options.animation / 2 );
					},
					'next'
				);
			}, this.options.animation / 2 );
		} else {
			this.open( this.currThumbnail, false, false, 'next' );
		}
	}
	prev() {
		if ( !this.currGroup ) {
			return;
		}
		const $0 = this.getPosition( this.currThumbnail, this.currGroup ) - 1;
		if ( this.currImages[$0] ) {
			this.currThumbnail = this.currImages[$0];
		} else if ( this.options.carousel ) {
			this.currThumbnail = this.currImages[this.currImages.length - 1];
		} else {
			return;
		}
		if ( isNumber( this.options.animation ) ) {
			removeClass( this.currImage.img, this.cn( 'animating-next' ) );
			setTimeout( () => {
				this.open(
					this.currThumbnail,
					false,
					() => {
						setTimeout( () => {
							addClass(
								this.currImage.img,
								this.cn( 'animating-next' )
							);
						}, this.options.animation / 2 );
					},
					'prev'
				);
			}, this.options.animation / 2 );
		} else {
			this.open( this.currThumbnail, false, false, 'prev' );
		}
	}
	close() {
		this.currGroup = null;
		this.currThumbnail = null;
		const img = this.currImage;
		this.currImage = {};
		while ( this.currImages.length ) {
			this.currImages.pop();
		}
		this.isOpen = false;
		removeClass( this.box, this.cn( 'active' ) );
		removeClass( this.wrapper, this.cn( 'wrapper-active' ) );
		removeClass( this.nextButton, this.cn( 'active' ) );
		removeClass( this.prevButton, this.cn( 'active' ) );
		this.box.style.paddingTop = '0px';
		this.stopAnimation();
		if (
			!this.options ||
			!is( this.options.hideCloseButton ) ||
			this.options.hideOverflow
		) {
			freeScroll( this.body );
		}
		if ( this.options.onclose ) {
			this.options.onclose( img );
		}
	}
}

aemi.push( async function aemi_menu() {
	for ( const menu of byClass( 'menu' ) ) {
		if ( !['header-menu', 'header-social', 'footer-menu'].includes( menu.id ) ) {
			for ( const parent of byClass( 'menu-item-has-children', menu ) ) {
				if ( parent.getElementsByTagName( 'li' ).length > 0 ) {
					parent.insertBefore(
						ecs( {
							class: ['toggle'],
							_: [{ class: ['toggle-element'] }]
						} ),
						parent.childNodes[1]
					);
				}
			}
		}
	}
} );

aemi.push( async function aemi_loop() {
	if ( aemi.assert( 'site-loop' ) ) {
		const loop = aemi.get( 'site-loop' );
		const entries = loop.getElementsByClassName( 'entry' );
		for ( const entry of entries ) {
			const anchor = entry.getElementsByTagName( 'a' )[0];
			if ( is( anchor ) ) {
				entry.addEventListener( 'click', () => {
					anchor.click();
				} );
				entry.addEventListener( 'mouseenter', () => {
					addClass( entry, ':hover' );
				} );
				entry.addEventListener( 'mouseleave', () => {
					removeClass( entry, ':hover' );
				} );
			}
		}
	}
} );
aemi.push( async function aemi_form_fix() {
	for ( const form of document.getElementsByClassName( 'comment-form' ) ) {
		form.removeAttribute( 'novalidate' );
	}
} );
aemi.push( async function aemi_toggle() {
	for ( const toggler of byClass( 'toggle' ) ) {
		toggler.addEventListener( 'click', () => {
			const id = data( toggler, 'target' );
			if ( isset( id ) ) {
				doToggle( byId( id ) );
			}
			doToggle( toggler );
		} );
	}
} );
aemi.push( async function aemi_galleries() {
	return new Lightbox( { env: aemi } ).prepare( {
		wrapperSelectors: [
			'.gallery',
			'.blocks-gallery-grid',
			'.wp-block-gallery',
			'.justified-gallery'
		],
		itemSelectors: [
			'.gallery-item',
			'.blocks-gallery-item',
			'.jg-entry'
		],
		captionSelectors: [
			'figcaption',
			'.gallery-caption'
		]
	} );
} );
aemi.push( async function aemi_view_handler() {
	const classScrolled = 'page-scrolled';
	const classHidden = 'header-hidden';
	const aemi_header_auto_hide = autoHide =>
		requestFrame( ( startTime ) => {
			const currentState = {
				startTime: startTime,
				height: document.body.clientHeight,
				position: window.scrollY
			};
			setTimeout(
				( observable, currentState ) => requestFrame(
					( currentTime, observable, currentState ) => {
						const {
							startTime,
							height,
							position
						} = currentState;
						const currentPosition = window.scrollY;
						const menuToggler = aemi.get( 'nav-toggle' );
						const searchToggler = aemi.get( 'sea-toggle' );
						if ( position > 0 ) {
							addClass( observable, classScrolled );
						} else {
							removeClass( observable, classScrolled );
						}
						if (
							autoHide &&
							( !menuToggler || !isToggled( menuToggler ) ) &&
							( !searchToggler || !isToggled( searchToggler ) )
						) {
							const elapsedTime = currentTime - startTime;
							if ( elapsedTime > 100 ) {
								const elapsedDistance =
									currentPosition - position;
								const $11 = Math.round( 1000 * elapsedDistance / elapsedTime );
								if ( !hasClass( observable, classHidden ) ) {
									if ( $11 > 0 && position > 0 && position + window.innerHeight < height ) {
										addClass( observable, classHidden );
									}
								} else if (
									$11 < 0 && position > 0 && position + window.innerHeight < height ||
									position <= 0 || position + window.innerHeight >= height ) {
									removeClass( observable, classHidden );
								}
							}
						}
					},
					observable,
					currentState
				),
				100,
				document.body,
				currentState
			);
		} );
	const aemi_progress_bar = () =>
		requestFrame( () => {
			const totalHeight =
				document.body.clientHeight - window.innerHeight;
			const progress = window.scrollY / totalHeight;
			aemi.get( 'pro-bar' ).style.width = `${100 * ( progress > 1 ? 1 : progress )
			}vw`;
		} );
	const features = [{
		test: [aemi.assert( 'pro-bar' )],
		func: aemi_progress_bar,
		args: []
	},
	{
		test: [],
		func: aemi_header_auto_hide,
		args: [hasClass( document.body, 'header-auto-hide' )]
	},
	{
		test: [true],
		func: changeHeaderScheme,
		args: []
	}
	];

	features.forEach( ( { test, func, args } ) => {
		if ( test.every( ( t ) => t === true ) ) {
			for ( const type of ['scroll', 'resize'] ) {
				window.addEventListener( type, () => func( ...args ), { passive: true } );
			}
		}
	} );
} );

aemi.push( async function aemi_mutation_observer() {
	const toggleFilter = [aemi.get( 'nav-toggle' ), aemi.get( 'sea-toggle' )];

	function togglerHandler( mutationRecords ) {
		for ( const { target } of mutationRecords ) {
			const alts = toggleFilter.filter( e => e !== target );
			if ( isToggled( target ) ) {
				for ( const alt of alts.filter( e => isToggled( e ) ) ) {
					doToggle( byId( data( alt, 'target' ) ) );
					doToggle( alt );
				}
			}
			if ( target === aemi.get( 'sea-toggle' ) && aemi.assert( 'sea-input' ) ) {
				Wait.asyncDelay( () => {
					aemi.get( 'sea-input' ).focus();
				}, 200 );
			}
			changeHeaderScheme();
		}
	}
	const togglerObserver = new MutationObserver( togglerHandler );
	togglerObserver.observe( aemi.get( 'nav-toggle' ), {
		attributes: true,
		attributeFilter: ['class']
	} );
	togglerObserver.observe( aemi.get( 'sea-toggle' ), {
		attributes: true,
		attributeFilter: ['class']
	} );

	function colorSchemeHandler( mutationRecords ) {
		for ( const { target } of mutationRecords ) {
			if ( schemeCoherenceCondition() ) {
				changeHeaderScheme();
			} else if ( hasClass( document.body, 'has-post-thumbnail' ) ) {
				ColorScheme.toDarkScheme( aemi.get( 'site-header' ) );
				aemi.assert( 'pro-bar' ) && ColorScheme.toDarkScheme( aemi.get( 'pro-bar' ) );
			}
		}
	}
	const colorSchemeObserver = new MutationObserver( colorSchemeHandler );
	colorSchemeObserver.observe( document.body, {
		attributes: true,
		attributeFilter: ['class']
	} );
} );

aemi.push( async function aemi_link_tweaking() {
	for ( const link of document.getElementsByTagName( 'a' ) ) {
		let url;
		let hash;
		let scrollable;
		let external;
		try {
			url = new URL( link.href );
			hash = url.hash;
			external = window.location.origin !== url.origin;
			scrollable = !external &&
				window.location.pathname === url.pathname &&
				isset( hash );
		} catch ( _ ) {
			if ( link.href.indexOf( '#' ) >= 0 ) {
				hash = link.href.split( '?' )[0];
				scrollable = isset( hash );
			}
		}
		if ( external ) {
			addNoOpener( link );
		}
		if ( scrollable ) {
			link.addEventListener( 'click', () => {
				smoothScrollTo( hash );
			} );
		}
	}
} );

aemi.run();