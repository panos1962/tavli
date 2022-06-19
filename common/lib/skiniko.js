"use strict";

try {
	window.skiniko = {};
} catch (e) {
	global.skiniko = {};
}

///////////////////////////////////////////////////////////////////////////////@

skiniko.sinedria = {};
skiniko.trapezi = {};
skiniko.sizitisi = {};

///////////////////////////////////////////////////////////////////////////////@

skiniko.trapeziSet = function(trapezi) {
	skiniko.trapezi[trapezi.kodikos] = trapezi;
	return skiniko;
};

skiniko.sinedriaSet = function(sinedria) {
	skiniko.sinedria[sinedria.pektis] = sinedria;
	return skiniko;
};

skiniko.pektisSet = function(pektis) {
	skiniko.pektis[pektis.login] = pektis;
	return skiniko;
};

///////////////////////////////////////////////////////////////////////////////@
