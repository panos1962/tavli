"use strict";

Selida.init = function() {
	Selida.ofelimoDOM.
	append($('<div>').
	attr('id', 'tavli').
	append($('<img>').
	attr('id', 'tavliBoard').
	prop('src', '../ikona/tavli.svg')));
};
