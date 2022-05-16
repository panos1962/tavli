"use strict";

var Globals = {};

Globals.gramataMask = 'a-zA-Z' +
	'αβγδεζηθικλμνξοπρστυφχψω' +
	'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ' +
	'άέήίόύώϊϋΐΰς' +
	'ΆΈΉΊΌΎΏΪΫ';
Globals.akindinaMask = '!@#$%*._+=-';
Globals.loginMask = '^[a-zA-Z][a-zA-Z0-9' + Globals.akindinaMask + ']*$';
Globals.onomaMask = '^[' + Globals.gramataMask + '][0-9 ' + Globals.gramataMask + Globals.akindinaMask + ']*$';
Globals.emailMask = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$';
Globals.ilikiaMinimum = 18;

Globals.validLogin = function(login) {
	if (login === undefined)
	return false;

	if (typeof(login) !== 'string')
	return false;

	return login.match(new RegExp(Globals.loginMask));
};

Globals.invalidLogin = function(login) {
	return !Globals.validLogin(login);
};

Globals.validOnoma = function(onoma) {
	if (onoma === undefined)
	return false;

	if (typeof(onoma) !== 'string')
	return false;

	return onoma.match(new RegExp(Globals.onomaMask));
};

Globals.invalidOnoma = function(onoma) {
	return !Globals.validOnoma(onoma);
};

Globals.validEmail = function(email) {
	if (email === undefined)
	return false;

	if (typeof(email) !== 'string')
	return false;

	return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/);
};

Globals.invalidEmail = function(email) {
	return !Globals.validEmail(email);
};
