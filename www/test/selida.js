"use strict";

Selida.init = function() {
	setTimeout(function() {
		Selida.fyiMessage('LEFT');
	}, 1000);
	setTimeout(function() {
		Selida.fyiMessageRight('RIGHT');
	}, 2000);
	setTimeout(function() {
		Selida.fyiError('ERROR');
	}, 3000);
	setTimeout(function() {
		Selida.fyiErrorRight('ERROR RIGHT');
	}, 4000);
};
