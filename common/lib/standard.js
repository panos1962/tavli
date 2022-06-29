"use strict";

try {
	global.globals = {};
} catch (e) {
	window.globals = {};
}

///////////////////////////////////////////////////////////////////////////////@

globals.ilikiaMinimum = 18;
globals.gramataMask = 'a-zA-Z' +
	'αβγδεζηθικλμνξοπρστυφχψω' +
	'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ' +
	'άέήίόύώϊϋΐΰς' +
	'ΆΈΉΊΌΎΏΪΫ';
globals.akindinaMask = '!@#$%*._+=-';
globals.loginMask = '^[a-zA-Z][a-zA-Z0-9' + globals.akindinaMask + ']*$';
globals.onomaMask = '^[' + globals.gramataMask + ']' +
	'[0-9 ' + globals.gramataMask + globals.akindinaMask + ']*$';
globals.emailMask = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$';

globals.validLogin = function(login) {
	if (login === undefined)
	return false;

	if (typeof(login) !== 'string')
	return false;

	return login.match(new RegExp(globals.loginMask));
};

globals.invalidLogin = function(login) {
	return !globals.validLogin(login);
};

globals.validOnoma = function(onoma) {
	if (onoma === undefined)
	return false;

	if (typeof(onoma) !== 'string')
	return false;

	return onoma.match(new RegExp(globals.onomaMask));
};

globals.invalidOnoma = function(onoma) {
	return !globals.validOnoma(onoma);
};

globals.validEmail = function(email) {
	if (email === undefined)
	return false;

	if (typeof(email) !== 'string')
	return false;

	return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/);
};

globals.invalidEmail = function(email) {
	return !globals.validEmail(email);
};

///////////////////////////////////////////////////////////////////////////////@


// Ακολουθούν functions σχετικές με ημερομηνία και ώρα.

// Η function "torams" επιστρέφει το τρέχον timestamp σε milliseconds, με όρους
// της μηχανής στην οποία εκτελείται.

globals.torams = function() {
	return (new Date).getTime();
};

// Η function "torasec" επιστρέφει το τρέχον timestamp σε seconds, με όρους
// της μηχανής στην οποία εκτελείται.

globals.torasec = function() {
	return Math.floor((new Date).getTime() / 1000);
};

// Η function "mera" δίνει την τρέχουσα ημερομηνία στη μηχανή που τρέχει.
// Μπορούμε να δώσουμε και συγκεκριμένη ώρα ως παράμετρο.

globals.mera = function(d, full) {
	let s = '';

	if (!d)
	d = new Date;

	else if (typeof d === 'number')
	d = new Date(d * 1000);

	let x = d.getDate();

	if (x < 10)
	s += '0';

	s += x;
	s += '/';

	x = d.getMonth() + 1;

	if (x < 10)
	s += '0';

	s += x;
	s += '/'; 

	x = d.getFullYear();

	if (full || (x < 2000))
	s += x;

	else {
		x %= 100;

		if (x < 10)
		s += '0';

		s += x;
	}

	return s;
};

// Η function "ora" δίνει την τρέχουσα ώρα στη μηχανή που τρέχει. Μπορούμε να
// δώσουμε και συγκεκριμένη ώρα ως παράμετρο.

globals.ora = function(d, seconds) {
	let s = '';

	if (!d)
	d = new Date;

	else if (typeof d === 'number')
	d = new Date(d * 1000);

	let x = d.getHours();

	if (x < 10)
	s += '0';

	s += x + ':';

	x = d.getMinutes();

	if (x < 10)
	s += '0';

	s += x;

	if (seconds === undefined)
	seconds = false;

	if (seconds) {
		s += ':';
		x = d.getSeconds();

		if (x < 10)
		s += '0';

		s += x;
	}

	return s;
};

globals.meraOra = function(seconds) {
	let tora = new Date;
	return globals.mera(tora) + ', ' + globals.ora(tora, seconds);
};

///////////////////////////////////////////////////////////////////////////////@

// Η μέθοδος "random" επιστρέφει έναν τυχαίο ακέραιο μεταξύ των τιμών που
// δίνονται ως παράμετροι (inclusive). Π.χ. η κλήση globals.random(5, 10)
// μπορεί να δώσει 5, 6, 7, 8, 9 και 10.

globals.random = function() {
	let min;
	let max;

	switch (arguments.length) {
	case 0:
		min = 0;
		max = 999999999;
		break;
	case 1:
		min = 0;
		max = parseInt(arguments[0]);
		break;
	case 2:
		min = parseInt(arguments[0]);
		max = parseInt(arguments[1]);
		break;
	}

	if (isNaN(min) || isNaN(max))
	throw 'globals.random: invalid argument[s]';

	return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Η μέθοδος "randomString" επιστρέφει ένα τυχαίο string με μήκος που
// καθορίζεται από τις παραμέτρους. Το string αποτελείται από γράμματα του
// λατινικού αλφαβήτου, αλλά αν θέλουμε μπορούμε να περάσουμε αυθαίρετο string
// από το οποίο θα επιλεγούν χαρακτήρες (παλέτα).

globals.randomString = function(min, max, pool) {
	if (pool === undefined)
	pool = 'abcdefghijklmnopqrstuvwxyz';


	let n = pool.length - 1;
	let s = '';
	max = globals.random(min, max);

	for (min = 0; min < max; min++)
	s += pool.substr(globals.random(n), 1);

	return s;
};

///////////////////////////////////////////////////////////////////////////////@

// Η function "json" δέχεται μια παράμετρο και την μετατρέπει σε μορφή ασφαλή
// ώστε να χρησιμοποιηθεί ως rvalue σε δομές json. Η function δεν δίδεται ως 
// string method ώστε να δύναται να χρησιμοποιηθεί σε οποιαδήποτε μεταβλητή
// και όχι μόνο σε strings.
//
// Μπορούμε να περάσουμε και δεύτερη παράμετρο με την οποία λέμε αν θέλουμε
// αντικατάσταση των control χαρακτήρων μέσα στα strings. Control χαρακτήρες
// είναι τα newlines, τα carriage returns, τα tabs κλπ. By default αυτή η
// παράμετρος λογίζεται true, επομένως όταν δεν θέλουμε αντικατάσταση των
// control χαρακτήρων, περνάμε παράμετρο με τιμή false.

globals.json = function(s, nl) {
	let err = false;

	if (s === undefined)
	err = 'undefined data';

	else if (s === null)
	err = 'null data';

	else {
		switch (typeof s)  {
		case 'number':
			return s;
		case 'string':
			s = s.replace(/\\/g, '\\\\');

			if (nl === undefined)
			nl = true;

			if (nl)
			s = s.replace(/[\n\r\f\v\b\t]/g, ' ');

			return "'" + s.replace(/'/g, '\\\'') + "'";
		default:
			err = s + ': invalid data type';
			break;
		}
	}

	globals.fatal('globals.json: ' + err);
};

///////////////////////////////////////////////////////////////////////////////@

globals.consoleLog = function(msg) {
	console.log(msg, '(' + globals.meraOra(true) + ')');
};

globals.consoleError = function(msg) {
	console.error(msg, '(' + globals.meraOra(true) + ')');
};

///////////////////////////////////////////////////////////////////////////////@

// Η μέθοδος "json" επιστρέφει json safe μορφή του ανά χείρας string.

String.prototype.json = function(nl) {
	return globals.json(this.valueOf(), nl);
};


String.prototype.evalAsfales = function() {
	let x;

	eval('x = ' + this.valueOf() + ';');
	return x;
};

///////////////////////////////////////////////////////////////////////////////@

globals.fatal = function(s) {
	s = (s !== undefined ? s + ': ' : '');
	console.error(s + 'fatal error');
	throw 'ERROR';
};

///////////////////////////////////////////////////////////////////////////////@
