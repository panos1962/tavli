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

String.prototype.evalAsfales = function() {
	let x;

	eval('x = ' + this.valueOf() + ';');
	return x;
};

///////////////////////////////////////////////////////////////////////////////@
