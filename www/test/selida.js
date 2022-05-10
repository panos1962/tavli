"use strict";

selida.init = function() {
	setTimeout(function() {
		selida.fyiMessage('LEFT');
	}, 1000);
	setTimeout(function() {
		selida.fyiMessageRight('RIGHT');
	}, 2000);
	setTimeout(function() {
		selida.fyiError('ERROR');
	}, 3000);
	setTimeout(function() {
		selida.fyiErrorRight('ERROR RIGHT');
	}, 4000);
};
