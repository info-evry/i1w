/* eslint-env browser */

function getGlobal() {
	const value = globalThis || self || window || global;
	if ( value ) {
		return value;
	}
	throw new Error( 'Unable to get global object.' );
}

function entries( object, func ) {
	for ( let key in object ) {
		if ( Object.prototype.hasOwnProperty.call( object, key ) ) {
			func( key, object[key] );
		}
	}
}

class Chars {
	constructor () {
		this.values = Object.create( null );

		for ( let i = 0; i < 62; i++ ) {
			if ( i < 10 ) {
				this.values[i] = 48 + i;
			} else if ( i < 36 ) {
				this.values[i] = 65 + i - 10;
			} else if ( i < 62 ) {
				this.values[i] = 97 + i - 36;
			}
		}
	}
	get( x ) {
		return this.values[x < 62 ? x : x % 62];
	}
	static get( x ) {
		const gl = getGlobal();
		if ( !( 'CharsList' in gl ) ) {
			gl.CharsList = new Chars();
		}
		return gl.CharsList.get( x );
	}
}
/**
 * Measure Execution Time of a Function
 * @param {Function} func
 * @param  {...any} args
 * @returns {Promise} A Promise
 */
function measure( func, ...args ) {
	const perf = getGlobal().performance;
	const start = perf.now();
	const res = func( ...args );
	const end = perf.now();
	return new Promise( function ( resolve, reject ) {
		if ( res instanceof Promise ) {
			res.then( function ( response ) {
				const end = perf.now();
				console.info( `${func.name} Execution Time : ${end - start}` );
				resolve( response );
			} ).catch( function ( _ ) {
				const end = perf.now();
				console.error( `${func.name} Execution Time : ${end - start}` );
				reject( _ );
			} );
		} else {
			console.info( `${func.name} Execution Time : ${end - start}` );
			resolve( res );
		}
	} );
}
/**
 * Randomly Generate a String
 * @param {Number} length Number
 * @returns {String} Randomly generated string of length size
 */
function identifier( length ) {
	const res = [];
	for ( let i = 0, l = length || 16; i < l; i += 1 ) {
		res[i] = String.fromCharCode( Chars.get( Math.floor( Math.random() * 124 ) & Math.ceil( Math.random() * 124 ) ) );
	}
	return res.join( '' );
}
/**
 * Inhibit Propagation and Default Behavior of an Event
 * @param {Event} event
 */
function inhibitEvent( event ) {
	event.preventDefault();
	event.stopPropagation();
}

function requestFrame() {
	const [func, ...args] = arguments;
	if (typeof func === 'function' || func instanceof Function ) {
		return window.requestAnimationFrame(timestamp => func(timestamp, ...args));
	}
	throw new Error(`${func} is not a function.`);
}

/**
 * Return true if classname is present, false otherwise.
 * @param {HTMLElement} element
 * @param {String} className
 * @returns {Boolean}
 */
function hasClass( element, className ) {
	if ( element && !!className && typeof className === 'string' ) {
		return element.classList.contains( className );
	} else {
		throw new Error(
			'SyntaxError: element and/or classname is/or undefined.'
		);
	}
}
function addClass( element, className, requireFrame ) {
	requireFrame = requireFrame || false;
	if ( element && !!className && typeof className === 'string' ) {
		if ( !requireFrame ) {
			element.classList.add( className );
			return true;
		} else {
			return !!window.requestAnimationFrame( function () {
				element.classList.add( className );
			} );
		}
	} else {
		throw new Error( 'element or/and className is/are undefined.' );
	}
}
/**
 * Remove classname from element and request a frame before removing it
 * @param {HTMLElement} element
 * @param {String} className
 * @param {Boolean} [requireFrame]
 * @returns {Boolean}
 */
function removeClass( element, className, requireFrame ) {
	requireFrame = requireFrame || false;
	if ( element && !!className && typeof className === 'string' ) {
		if ( !requireFrame ) {
			element.classList.remove( className );
			return true;
		} else {
			return !!window.requestAnimationFrame( function () {
				element.classList.remove( className );
			} );
		}
	} else {
		throw new Error( 'element or/and className is/are not valid.' );
	}
}
/**
 * Toggle classname from element and request a frame before toggling it
 * @param {HTMLElement} element
 * @param {String} className
 * @param {Boolean} [window.requestAnimationFrame]
 * @returns {Boolean}
 */
function toggleClass( element, className, requireFrame ) {
	requireFrame = requireFrame || false;
	if ( element && !!className && typeof className === 'string' ) {
		const boolean = hasClass( element, className );
		if ( typeof boolean === 'boolean' ) {
			if ( boolean ) {
				return !removeClass( element, className, requireFrame );
			} else {
				return addClass( element, className, requireFrame );
			}
		}
	} else {
		throw new Error( 'element or/and className is/are not valid.' );
	}
}
/**
 * Get or set attribute of Element
 * @param {HTMLElement} element
 * @param {String} attrName
 * @param {Any} [value]
 * @returns {String}
 */
function attr( element, attrName, value ) {
	if ( value === 0 ? true : !!value ) {
		return element.setAttribute( attrName, value );
	}
	return element.getAttribute( attrName );
}
function data() {
	const [element, dataset, value] = arguments;
	if ( !!dataset && typeof dataset === 'string' ) {
		if ( value === 0 ? true : !!value ) {
			element.dataset[dataset] = value;
			return element.dataset[dataset];
		}
		return element.dataset[dataset];
	}
	return Object.assign( Object.create( null ), element.dataset );
}

function useInter( force = false ) {
	if ( force || window && 'navigator' in window &&
		!['MacIntel', 'iPhone', 'iPod', 'iPad'].includes(
			window.navigator.platform
		)
	) {
		return addClass( document.body, 'inter', true );
	}
	return false;
}

/**
 * Element Creation Shorthand
 * @param {...({attr:{String:String},data:{String:String},events:[type:String,listener:Function,options:Boolean|AddEventListenerOptions][],id:String,ns:String,style:{String:String}t:String,_:(Any[]|Any)})}
 * @returns {HTLMElement}
 */
function ecs() {
	const l = [];
	let ll = arguments.length;
	if ( ll === 0 ) { return document.createElement( 'div' ); }
	for ( let x = 0, n = ll; x < n; x += 1 ) {
		const y = arguments[x];
		if ( y ) { l[x] = y; } else { ll -= 1; }

	}
	if ( ll === 0 ) {
		return document.createElement( 'div' );
	} else if ( ll !== 1 ) {
		const a = document.createElement( 'div' );
		for ( const b of l ) {
			a.appendChild( ecs( b ) );
		}
		return a;
	}
	let e = l.pop();
	if ( e instanceof Element ) {
		return e;
	}
	const {
		actions: a,
		attr: t,
		class: c,
		data: d,
		_: h,
		events: v,
		id,
		ns: n,
		style: s,
		t: g
	} = e;
	if ( id || c || g ) {
		if ( !!n && typeof n === 'string' ) {
			e = document.createElementNS( n, !!g && typeof g === 'string' ? g : 'div' );
		} else { e = document.createElement( !!g && typeof g === 'string' ? g : 'div' ); }
		if ( id ) {
			e.id = id;
		}
		if ( c ) {
			if ( typeof c === 'string' ) {
				e.classList.add( c );
			} else {
				e.classList.add( ...c );
			}
		}
	} else {
		e = document.createElement( 'div' );
	}
	if ( t ) {
		entries( t, function ( k, v ) {
			if ( v instanceof Promise ) {
				v.then( function ( r ) {
					attr( e, k, r );
				} );
			} else {
				attr( e, k, v );
			}
		} );
	}
	if ( d ) {
		entries( d, function ( k, v ) {
			if ( v instanceof Promise ) {
				v.then( function ( r ) {
					e.dataset[k] = r;
				} );
			} else {
				e.dataset[k] = v;
			}
		} );
	}
	if ( v ) {
		for ( const ev of v ) {
			e.addEventListener( ...ev );
		}
	}
	if ( s ) {
		entries( s, function ( k, v ) {
			e.style[k] = v;
		} );
	}
	if ( h ) {
		for ( const i of !( typeof h === 'string' ) && Symbol.iterator in h ? h : [h] ) {
			if ( i instanceof Element ) {
				e.appendChild( i );
			} else if ( typeof i === 'string' ) {
				e.innerHTML += i;
			} else if ( i instanceof Promise ) {
				const a = document.createElement( 'template' );
				e.appendChild( a );
				i.then( function ( r ) {
					if ( typeof r === 'string' ) {
						a.outerHTML += r;
						a.remove();
					} else {
						e.replaceChild( ecs( r ), a );
					}
				} ).catch( function ( _ ) {
					console.error( 'ecs error: ', _ );
				} );
			} else if (
				['number', 'bigint', 'boolean', 'symbol'].includes( typeof i )
			) {
				e.innerHTML += `${i}`;
			} else {
				e.appendChild( ecs( i ) );
			}
		}
	}
	if ( a ) {
		entries( a, function ( k, v ) {
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
/**
 * Execute ecs in an inline script an replace script by ecs' result
 * @param {...({attr:{String:String},data:{String:String},events:[type:String,listener:Function,options:Boolean|AddEventListenerOptions][],id:String,ns:String,style:{String:String}t:String,_:(Any[]|Any)})}
 */
function ecsr() {
	const { currentScript: c } = document;
	const { parentElement: p } = c;
	if ( ![document.head, document.documentElement].includes( p ) ) {
		p.replaceChild( ecs( ...arguments ), c );
	}
}
class WebPTest {
	constructor () { }
	static get data() {
		return [
			[
				'lossy',
				'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA'
			],
			['lossless', 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA=='],
			[
				'alpha',
				'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA=='
			],
			[
				'animation',
				'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA'
			]
		];
	}
	static save( features ) {
		return new Promise( function ( resolve ) {
			const gl = getGlobal();
			gl.WebPTestResult = features.reduce( function ( acc, [feature, bool] ) {
				if ( !( feature in acc ) ) {
					acc[feature] = bool;
					return acc;
				}
			}, Object.create( null ) );
			return resolve( gl.WebPTestResult );
		} );
	}
	static imageLoading( data, feature ) {
		return new Promise( function ( resolve ) {
			const img = new Image();
			img.onload = function () {
				resolve( [feature, img.width > 0 && img.height > 0] );
			};
			img.onerror = function () {
				resolve( [feature, false] );
			};
			img.src = data;
		} );
	}
	static test() {
		const gl = getGlobal();
		return new Promise( function ( resolve ) {
			if ( 'WebPTestResult' in gl ) {
				resolve( gl.WebPTestResult );
			} else {
				Promise.all(
					WebPTest.data.map( function ( [feature, data] ) {
						return WebPTest.imageLoading(
							`data:image/webp;base64,${data}`,
							feature
						);
					} )
				).then( function ( response ) {
					resolve( WebPTest.save( response ) );
				} );
			}
		} );
	}
	static get passed() {
		const gl = getGlobal();
		let wtr;
		return new Promise( async function ( resolve ) {
			if ( 'WebPTestResult' in gl ) {
				wtr = gl.WebPTestResult;
			} else {
				wtr = await WebPTest.test();
			}
			return resolve( wtr.lossy && wtr.lossless && wtr.alpha && wtr.animation );
		} );
	}
}
class Cookies {
	constructor () { }
	static get( string ) {
		return new Map(
			decodeURIComponent( document.cookie )
				.split( /;/ )
				.map( function ( string ) {
					return string.trim().split( /=/ );
				} )
		).get( string );
	}
	static has( string ) {
		return new Map(
			decodeURIComponent( document.cookie )
				.split( /;/ )
				.map( function ( string ) {
					return string.trim().split( /=/ );
				} )
		).has( string );
	}
	static set( cookieName, cookieValue, options ) {
		options = options && typeof options === 'object' ? options : Object.create( null );
		let { expiration, sameSite } = options;
		if ( !expiration ) {
			const newDate = new Date();
			const year = 365.244 * 24 * 3600 * 1000;
			newDate.setTime( newDate.getTime() + year );
			expiration = newDate.toGMTString();
		}
		const expirationString = `expires=${expiration}`;
		const sameSiteString = `SameSite=${sameSite || 'Strict'};Secure`;
		document.cookie = `${cookieName}=${encodeURIComponent(
			cookieValue
		)};path=/;${expirationString};${sameSiteString}`;
	}
	static delete( cookieName ) {
		const newDate = new Date();
		const year = 365.244 * 24 * 3600 * 1000;
		newDate.setTime( newDate.getTime() - year );
		const expirationString = `expires=${newDate.toGMTString()}`;
		document.cookie = `${cookieName}=${''};${expirationString};`;
	}
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
/**
 *
 * @param {String} selector
 * @param {Number} duration
 */
function smoothScrollTo( event, selector, duration ) {
	inhibitEvent( event );
	const easing = Easing.easeInOutCubic;
	let target = document.querySelector( selector );
	if ( !( target instanceof HTMLElement ) ) { return; }
	let startPosition = window.pageYOffset;
	let targetPosition = startPosition + target.getBoundingClientRect().top;
	duration = duration || 1000;
	let distance = targetPosition - startPosition;
	let startTime = null;
	function animation( currentTime ) {
		startTime = startTime ? startTime : currentTime;
		let timeElapsed = currentTime - startTime;
		let run = easing( timeElapsed, startPosition, distance, duration );
		window.scrollTo( 0, run );
		if ( timeElapsed < duration ) {
			window.requestAnimationFrame( animation );
		}
	}
	window.requestAnimationFrame( animation );
}
class Wait {
	constructor () { }
	static register() {
		const gl = getGlobal();
		if ( 'WaitRegister' in gl ) {
			return gl.WaitRegister;
		} else {
			const wr = Object.assign( Object.create( null ), {
				interactive: [],
				complete: [],
				DOMContentLoaded: [],
				load: []
			} );
			gl.WaitRegister = wr;
			document.addEventListener( 'readystatechange', function () {
				Wait.all( document.readyState );
			} );
			document.addEventListener( 'DOMContentLoaded', function () {
				Wait.all( 'DOMContentLoaded' );
			} );
			window.addEventListener( 'load', function () {
				Wait.all( 'load' );
			} );
			return gl.WaitRegister;
		}
	}
	static set( type, options ) {
		const { resolve, reject, func, args } = options;
		const wr = Wait.register();
		let exec = false;
		const { readyState } = document;
		switch ( type ) {
			case 'interactive':
			case 'DOMContentLoaded': {
				if ( readyState !== 'loading' ) {
					exec = true;
					try {
						resolve( func( ...args ) );
					} catch ( _ ) {
						reject( _ );
					}
				}
				break;
			}
			case 'complete':
			case 'load': {
				if ( readyState === 'complete' ) {
					exec = true;
					try {
						resolve( func( ...args ) );
					} catch ( _ ) {
						reject( _ );
					}
				}
				break;
			}
		}
		if ( exec === false ) {
			wr[type].push( function () {
				return new Promise( function ( res, rej ) {
					try {
						return res( resolve( func( ...args ) ) );
					} catch ( _ ) {
						rej( reject( _ ) );
					}
				} );
			} );
		}
	}
	static all( type ) {
		return Promise.all( Wait.register()[type].map( function ( e ) {
			return e();
		} ) );
	}
	static time( time ) {
		return new Promise( function ( resolve ) {
			return setTimeout( resolve, time );
		} );
	}
	static race() {
		return Promise.race( ...arguments );
	}
	static delay() {
		const [func, timeout, ...args] = arguments;
		return setTimeout( func, timeout || 0, ...args );
	}
	static async() {
		const [func, ...args] = arguments;
		return new Promise( function ( resolve, reject ) {
			try {
				return resolve( func( ...args ) );
			} catch ( _ ) {
				return reject( _ );
			}
		} );
	}
	static promiseDelay() {
		const [func, timeout, ...args] = arguments;
		return new Promise( function ( resolve, reject ) {
			return setTimeout( function ( ...args ) {
				try {
					return resolve( func( ...args ) );
				} catch ( _ ) {
					return reject( _ );
				}
			}, timeout, ...args );
		} );
	}
	static whileLoading() {
		const [func, ...args] = arguments;
		if ( document.readyState === 'loading' ) {
			return func( ...args );
		}
	}
	static interactive() {
		const [func, ...args] = arguments;
		const options = Object.create( null );
		return new Promise( function ( resolve, reject ) {
			options.resolve = resolve;
			options.reject = reject;
			options.func = func;
			options.args = args;
			Wait.set( 'interactive', options );
		} );
	}
	static complete() {
		const [func, ...args] = arguments;
		const options = Object.create( null );
		return new Promise( function ( resolve, reject ) {
			options.resolve = resolve;
			options.reject = reject;
			options.func = func;
			options.args = args;
			Wait.set( 'complete', options );
		} );
	}
	static DOMContentLoaded() {
		const [func, ...args] = arguments;
		const options = Object.create( null );
		return new Promise( function ( resolve, reject ) {
			options.resolve = resolve;
			options.reject = reject;
			options.func = func;
			options.args = args;
			Wait.set( 'DOMContentLoaded', options );
		} );
	}
	static ready() {
		const [func, ...args] = arguments;
		const options = Object.create( null );
		return new Promise( function ( resolve, reject ) {
			options.resolve = resolve;
			options.reject = reject;
			options.func = func;
			options.args = args;
			Wait.set( 'complete', options );
		} );
	}
	static load() {
		const [func, ...args] = arguments;
		const options = Object.create( null );
		return new Promise( function ( resolve, reject ) {
			options.resolve = resolve;
			options.reject = reject;
			options.func = func;
			options.args = args;
			Wait.set( 'complete', options );
		} );
	}
}
class ExtendedWorker {
	constructor ( WorkerObject, WorkerOptions ) {
		if ( typeof WorkerObject === 'function' ) {
			WorkerObject = ExtendedWorker.prepareFromFunction( WorkerObject );
		}
		this.worker = new Worker( WorkerObject, WorkerOptions );
		if (
			WorkerOptions &&
			'promise' in WorkerOptions &&
			WorkerOptions.promise === true
		) {
			this.worker.promise = true;
			ExtendedWorker.assert();
			this.worker.onmessage = ExtendedWorker.onMessage;
		} else {
			this.worker.promise = false;
		}
	}
	static get global() {
		return getGlobal();
	}
	static prepareFromString( WorkerString ) {
		if ( typeof WorkerString === 'string' ) {
			const WorkerBody = '(' + WorkerString + ')()';
			const WorkerBlob = new Blob( [WorkerBody], { type: 'text/javascript' } );
			return URL.createObjectURL( WorkerBlob );
		}
		throw new Error( `WorkerString:${WorkerString} is not a string.` );
	}
	static prepareFromFunction( WorkerFunction ) {
		if ( typeof WorkerFunction === 'function' ) {
			return ExtendedWorker.prepareFromString( WorkerFunction.toString() );
		}
		throw new Error( `WorkerFunction:${WorkerFunction} is not a function.` );
	}
	static createFromString( WorkerString, WorkerOptions ) {
		if ( typeof WorkerString === 'string' ) {
			const WorkerBody = '(' + WorkerString + ')()';
			const WorkerBlob = new Blob( [WorkerBody], { type: 'text/javascript' } );
			return new ExtendedWorker(
				URL.createObjectURL( WorkerBlob ),
				WorkerOptions
			);
		}
		throw new Error( `WorkerString:${WorkerString} is not a string.` );
	}
	static createFromFunction( WorkerFunction, WorkerOptions ) {
		if ( typeof WorkerFunction === 'function' ) {
			return ExtendedWorker.createFromString(
				WorkerFunction.toString(),
				WorkerOptions
			);
		}
		throw new Error( `WorkerFunction:${WorkerFunction} is not a function.` );
	}
	get env() {
		return ExtendedWorker.global.ExtendedWorkers;
	}
	set onmessage( func ) {
		this.worker.onmessage = func;
	}
	get onmessage() {
		return this.worker.onmessage;
	}
	set onerror( func ) {
		this.worker.onerror = func;
	}
	get onerror() {
		return this.worker.onerror;
	}
	set onmessageerror( func ) {
		this.worker.onmessageerror = func;
	}
	get onmessageerror() {
		return this.worker.onmessageerror;
	}
	dispatchEvent() {
		return this.worker.dispatchEvent( ...arguments );
	}
	addEventListener() {
		return this.worker.addEventListener( ...arguments );
	}
	removeEventListener() {
		return this.worker.removeEventListener( ...arguments );
	}
	terminate() {
		return this.worker.terminate();
	}
	postMessage( data, transferableObject ) {
		return ExtendedWorker.postMessage(
			[data, transferableObject],
			this.worker
		);
	}
	static assert() {
		const self = ExtendedWorker.global;
		if ( !( 'ExtendedWorkers' in self ) ) {
			self.ExtendedWorkers = Object.assign( Object.create( null ), {
				resolves: [],
				rejects: []
			} );
		} else if (
			!(
				'resolves' in self.ExtendedWorkers &&
				'rejects' in self.ExtendedWorkers
			)
		) {
			self.ExtendedWorkers.resolves = [];
			self.ExtendedWorkers.rejecs = [];
		}
	}
	static postMessage( messagePayload, worker ) {
		if ( worker.promise ) {
			const messageId = identifier();
			const [data, transferableObject] = messagePayload;
			const message = Object.assign( Object.create( null ), {
				id: messageId,
				data: data
			} );
			return new Promise( function ( resolve, reject ) {
				ExtendedWorker.resolves[messageId] = resolve;
				ExtendedWorker.rejects[messageId] = reject;
				if ( transferableObject ) {
					worker.postMessage( message, transferableObject );
				} else {
					worker.postMessage( message );
				}
			} );
		} else {
			worker.postMessage( ...messagePayload );
		}
	}
	static onMessage( message ) {
		const { id, err, data } = message.data;
		const resolve = ExtendedWorker.resolves[id];
		const reject = ExtendedWorker.rejects[id];
		if ( data ) {
			if ( resolve ) {
				resolve( data );
			}
		} else if ( reject ) {
			if ( err ) {
				reject( err );
			} else {
				reject( 'Got nothing' );
			}
		}
		ExtendedWorker.delete( id );
	}
	static get resolves() {
		ExtendedWorker.assert();
		return ExtendedWorker.global.ExtendedWorkers.resolves;
	}
	static get rejects() {
		ExtendedWorker.assert();
		return ExtendedWorker.global.ExtendedWorkers.rejects;
	}
	static delete( id ) {
		delete ExtendedWorker.resolves[id];
		delete ExtendedWorker.rejects[id];
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
			if ( value ) {
				return this.get( key ) === value;
			}
			return !!this.get( key );
		}
		return false;
	}
	push() {
		for ( const func of arguments ) {
			if ( typeof func === 'function' || func instanceof Function ) {
				this.actions.push( func );
			} else {
				console.error( `func:${func} is not a function.` );
			}
		}
	}
	async run() {
		try {
			return Promise.all( this.actions.map( Wait.interactive ) );
		} catch ( _ ) {
			return console.error( _ );
		}
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
			attr( link, 'rel', relAttr !== '' ? `${relAttr} noopener` : 'noopener' );
		}
	}
}

const blockScroll = () => { };
const freeScroll = () => { };

const aemi = new Environment();

aemi.parallel( [
	aemi.set( 'global', getGlobal() ),
	aemi.set( 'site-header', document.getElementById( 'site-header' ) ),
	aemi.set( 'site-loop', document.getElementById( 'site-loop' ) ),
	aemi.set( 'first-header', document.getElementsByClassName( 'post-header' )[0] ),
	aemi.set( 'nav-toggle', document.getElementById( 'navigation-toggle' ) ),
	aemi.set( 'sea-toggle', document.getElementById( 'search-toggle' ) ),
	aemi.set( 'sea-input', document.getElementById( 'search-input-0' ) ),
	aemi.set( 'pro-bar', document.getElementById( 'site-progress-bar' ) ),
	aemi.set( 'csh-sel', document.getElementById( 'color-scheme-selector' ) ),
	aemi.set( 'csh-light', document.getElementById( 'light-scheme-option' ) ),
	aemi.set( 'csh-dark', document.getElementById( 'dark-scheme-option' ) ),
	aemi.set( 'csh-auto', document.getElementById( 'auto-scheme-option' ) )
] );

class ColorScheme {
	constructor () {
		this.scheme = ColorScheme.init();
	}

	/**
	 * Détecte la présence d'un cookie de préférence du ColorScheme
	 * @returns {Boolean} Retourne vrai si un cookie est configuré
	 */
	static hasCookie() {
		return Cookies.has( 'color-scheme' );
	}

	/**
	 * Configure un cookie de préférence de ColorScheme
	 * @param {String} scheme Scheme
	 * @returns {Boolean} Retourne vrai si le cookie a bien été configuré
	 */
	static setCookie( scheme ) {
		Cookies.set( 'color-scheme', scheme );
		return ColorScheme.getCookiesState() === scheme;
	}

	/**
	 * Supprime le cookie de préférence du ColorScheme
	 * @returns {Boolean} Retourne vrai si le cookie a été supprimé
	 */
	static deleteCookie() {
		Cookies.delete( 'color-scheme' );
		return Cookies.has( 'color-scheme' ) === false;
	}

	/**
	 * Retourne le ColorScheme opposé de celui passé entre paramètre
	 * @param {String} scheme
	 * @returns {'light'|'dark'|null}
	 */
	static getOppositeState( scheme ) {
		return scheme && scheme !== '' ? scheme === 'light' ? 'dark' : 'light' : null;
	}

	/**
	 * Détecte si le ColorScheme doit être configurée de manière automatique
	 * @returns {Boolean}
	 */
	static getAutoState() {
		return hasClass( document.body, 'color-scheme-auto' );
	}

	/**
	 * Retourne le ColorScheme pré-configuré
	 * @returns {'light'|'dark'|null}
	 */
	static getClassState() {
		if ( hasClass( document.body, 'color-scheme-light' ) ) {
			return 'light';
		}
		if ( hasClass( document.body, 'color-scheme-dark' ) ) {
			return 'dark';
		}
		return null;
	}

	/**
	 * Détecte si l'utilisateur a la possibilité de changer le ColorScheme et retourne vrai si un sélécteur de ColorScheme a été trouvé
	 * @returns {Boolean}
	 */
	static getUserState() {
		if ( aemi instanceof Environment ) {
			return aemi.assert( 'csh-sel' );
		}
		return !!document.getElementById( 'color-scheme-selector' );
	}

	/**
	 * Retourne le cookie de ColorScheme configuré 
	 */
	static getCookiesState() {
		const preference = Cookies.get( 'color-scheme' );
		return preference && preference !== '' ? preference : null;
	}

	/**
	 * Retourne le ColorScheme système compris par le navigateur ou null
	 * @returns {'light'|'dark'|null}
	 */
	static getBrowerState() {
		try {
			const matchMedia = window.matchMedia( '(prefers-color-scheme: light' );
			return matchMedia.matches !== 'not all' ? matchMedia.matches ? 'light' : 'dark' : null;
		} catch ( error ) {
			console.error( error );
			return null;
		}
	}

	/**
	 * Retourne le ColorScheme actuellement utilisé
	 * @returns {'light'|'dark'|null}
	 */
	static getState() {
		/* Récupère la classe de ColorScheme préconfigurée si existante, sinon null */
		const classState = ColorScheme.getClassState();
		/* Récupère la possibilité qu'a l'utilisateur de changer le ColorScheme, sinon null */
		const userState = ColorScheme.getUserState();
		/* Récupère le cookie de préférence du  */
		const cookieState = ColorScheme.getCookiesState();
		const browserState = ColorScheme.getBrowerState();
		/* Si une classe de ColorScheme est trouvée sur le document.body */
		if ( classState ) {
			/* Si l'utilisateur a la possibilité de changer le ColorScheme */
			if ( userState ) {
				/* Si un cookie est déjà configuré */
				if ( cookieState ) {
					/* Retourne le cookie de préférence du ColorScheme */
					return cookieState;
				}
			}
			/*C'est bon je suis là */
			/* Lis les commentaires depuis le début de ColorScheme */
			/* Sinon supprimer un cookie qui peut avoir existé avant --> ca évite un comportement indéfini */
			else {
				ColorScheme.deleteCookie();
			}
			/* Retourne la classe de ColorScheme actuelle */
			return classState;
		}
		if ( userState ) {
			if ( cookieState ) {
				return cookieState;
			}
		} else {
			ColorScheme.deleteCookie();
		}
		if ( browserState ) {
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
		const support = ColorScheme.getBrowerState() ? true : false;
		const matchMedia = window.matchMedia( '(prefers-color-scheme: light)' );
		if ( support && 'addEventListener' in matchMedia ) {
			matchMedia.addEventListener( 'change', () => {
				const autoState = ColorScheme.getAutoState();
				const classState = ColorScheme.getClassState();
				const userState = ColorScheme.getUserState();
				const cookieState = ColorScheme.getCookiesState();
				const browserState = ColorScheme.getBrowerState();
				if ( userState && cookieState && cookieState === 'auto' || !( classState && !autoState || userState ) ) {
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
		support = !!document.getElementById( 'color-scheme-selector' );
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

aemi.push( async function aemi_menu() {
	for ( const menu of document.getElementsByClassName( 'menu' ) ) {
		if ( !['header-menu', 'header-social', 'footer-menu'].includes( menu.id ) ) {
			for ( const parent of document.getElementsByClassName( 'menu-item-has-children', menu ) ) {
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
			if ( anchor ) {
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
	for ( const toggler of document.getElementsByClassName( 'toggle' ) ) {
		toggler.addEventListener( 'click', () => {
			const id = data( toggler, 'target' );
			if ( id && id !== '' ) {
				doToggle( document.getElementById( id ) );
			}
			doToggle( toggler );
		} );
	}
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
		requestAnimationFrame( () => {
			const totalHeight =
				document.body.clientHeight - window.innerHeight;
			const progress = window.scrollY / totalHeight;
			aemi.get( 'pro-bar' ).style.width = `${100 * ( progress > 1 ? 1 : progress )}vw`;
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
			const alts = toggleFilter.filter( e => e && e !== target );
			if ( isToggled( target ) ) {
				for ( const alt of alts.filter( e => isToggled( e ) ) ) {
					doToggle( document.getElementById( data( alt, 'target' ) ) );
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
	if ( aemi.assert( 'nav-toggle' ) ) {
		togglerObserver.observe( aemi.get( 'nav-toggle' ), {
			attributes: true,
			attributeFilter: ['class']
		} );	
	}
	if ( aemi.assert( 'sea-toggle' ) ) {
		togglerObserver.observe( aemi.get( 'sea-toggle' ), {
			attributes: true,
			attributeFilter: ['class']
		} );	
	}

	function colorSchemeHandler( mutationRecords ) {
		for ( const _ of mutationRecords ) {
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
				window.location.pathname === url.pathname && !!hash;
		} catch ( _ ) {
			if ( link.href.indexOf( '#' ) >= 0 ) {
				hash = link.href.split( '?' )[0];
				scrollable = !!hash;
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