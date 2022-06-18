"use strict";

try {
	global.globals = {};
} catch (e) {
	window.globals = {};
}

///////////////////////////////////////////////////////////////////////////////@

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
globals.ilikiaMinimum = 18;

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

// Η function "torams" επιστρέφει το τρέχον timestamp σε milliseconds,
// με όρους της μηχανής στην οποία εκτελείται.

globals.torams = function() {
	return (new Date).getTime();
};

// Η function "tora" επιστρέφει το τρέχον timestamp σε seconds,
// με όρους της μηχανής στην οποία εκτελείται.

globals.tora = function() {
	return Math.floor((new Date).getTime() / 1000);
};


// Η function "mera" δίνει την τρέχουσα ημερομηνία στη μηχανή που τρέχει.
// Μπορούμε να δώσουμε και συγκεκριμένη ώρα ως παράμετρο.

globals.mera = function(d, full) {
	let s, x;

	if (!d) d = new Date;
	else if (typeof d === 'number') d = new Date(d * 1000);

	s = '';

	x = d.getDate();
	if (x < 10) s += '0';
	s += x;
	s += '/';

	x = d.getMonth() + 1;
	if (x < 10) s += '0';
	s += x;
	s += '/'; 

	x = d.getFullYear();
	if (full || (x < 2000)) s += x;
	else {
		x %= 100;
		if (x < 10) s += '0';
		s += x;
	}

	return s;
};


// Η function "ora" δίνει την τρέχουσα ώρα στη μηχανή που τρέχει.
// Μπορούμε να δώσουμε και συγκεκριμένη ώρα ως παράμετρο.

globals.ora = function(d, seconds) {
	var s, x;

	if (!d) d = new Date;
	else if (typeof d === 'number') d = new Date(d * 1000);

	s = '';

	x = d.getHours();
	if (x < 10) s += '0';
	s += x + ':';

	x = d.getMinutes();
	if (x < 10) s += '0';
	s += x;

	if (seconds === undefined)
	seconds = false;

	if (seconds) {
		s += ':';
		x = d.getSeconds();
		if (x < 10) s += '0';
		s += x;
	}

	return s;
};

globals.meraOra = function(seconds) {
	const tora = new Date;
	return globals.mera(tora) + ', ' + globals.ora(tora, seconds);
};

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
