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
// δίνονται ως παράμετροι (inclusive). Π.χ. η κλήση Globals.random(5, 10)
// μπορεί να δώσει 5, 6, 7, 8, 9 και 10.

Globals.random = function() {
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
	throw 'Globals.random: invalid argument[s]';

	return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Η μέθοδος "randomString" επιστρέφει ένα τυχαίο string με μήκος που
// καθορίζεται από τις παραμέτρους. Το string αποτελείται από γράμματα του
// λατινικού αλφαβήτου, αλλά αν θέλουμε μπορούμε να περάσουμε αυθαίρετο string
// από το οποίο θα επιλεγούν χαρακτήρες (παλέτα).

Globals.randomString = function(min, max, pool) {
	if (pool === undefined)
	pool = 'abcdefghijklmnopqrstuvwxyz';


	let n = pool.length - 1;
	let s = '';
	max = Globals.random(min, max);

	for (min = 0; min < max; min++)
	s += pool.substr(Globals.random(n), 1);

	return s;
};

///////////////////////////////////////////////////////////////////////////////@

globals.consoleLog = function(msg) {
	console.log(msg, '(' + globals.meraOra(true) + ')');
};

globals.consoleError = function(msg) {
	console.error(msg, '(' + globals.meraOra(true) + ')');
};

///////////////////////////////////////////////////////////////////////////////@

String.prototype.evalAsfales = function() {
	let x;

	eval('x = ' + this.valueOf() + ';');
	return x;
};

///////////////////////////////////////////////////////////////////////////////@
