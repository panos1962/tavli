"use strict";

try {
	window.skiniko = {};
} catch (e) {
	global.skiniko = {};
}

///////////////////////////////////////////////////////////////////////////////@

skiniko.trapezi = {};
skiniko.pektis = {};
skiniko.sizitisi = {};
skiniko.sinedria = {};

///////////////////////////////////////////////////////////////////////////////@

skiniko.trapeziPush = function(trapezi) {
	skiniko.trapezi[trapezi.kodikos] = trapezi;
	return skiniko;
};

skiniko.trapeziPop = function(trapezi) {
	delete skiniko.trapezi[trapezi.kodikos];
	return skiniko;
};

skiniko.sinedriaPush = function(sinedria) {
	skiniko.sinedria[sinedria.pektis] = sinedria;
	return skiniko;
};

skiniko.sinedriaPop = function(sinedria) {
	skiniko.sinedria[sinedria.pektis] = sinedria;
	return skiniko;
};

skiniko.pektisSet = function(pektis) {
	skiniko.pektis[pektis.login] = pektis;
	return skiniko;
};

///////////////////////////////////////////////////////////////////////////////@
