"use strict";

var skiniko = {};

var Pektis = function(props) {
	let i;

	for (i in props)
	this[i] = props[i]

	this.param = {};
}

Pektis.prototype.pektisParamSet = function(param, timi) {
	if (!tavli.peparamValid.hasOwnProperty(param))
	throw param + ': invalid parameter';

	this.param[param] = timi;
	return this;
}

Pektis.prototype.pektisParamGet = function(param) {
	return this.param[param];
}

Pektis.prototype.pektisAxiomaSet = function(axioma) {
	if (!tavli.axiomaRank.hasOwnProperty(axioma))
	throw axioma + ': μη αποδεκτό αξίωμα';

	this.pektisParamSet(tavli.peparamAxioma, axioma);
	return this;
}

Pektis.prototype.pektisAxiomaGet = function() {
	let axioma = this.pektisParamGet(tavli.peparamAxioma);

	if (tavli.axiomaRank.hasOwnProperty(axioma))
	return axioma;

	this.pektisAxiomaSet(tavli.axiomaThamonas);
	return tavli.axiomaThamonas;
}

Pektis.prototype.pektisIsThamonas = function(strict) {
	let axioma = this.pektisAxiomaGet();

	if (strict)
	return (axioma === tavli.axiomaThamonas);

	return (tavli.axiomaRank[axioma] >= tavli.axiomaRank[tavli.axiomaThamonas]);
}

Pektis.prototype.pektisIsVip = function(strict) {
	let axioma = this.pektisAxiomaGet();

	if (strict)
	return (axioma === tavli.axiomaVip);

	return (tavli.axiomaRank[axioma] >= tavli.axiomaRank[tavli.axiomaVip]);
}

Pektis.prototype.pektisIsEpoptis = function(strict) {
	let axioma = this.pektisAxiomaGet();

	if (strict)
	return (axioma === tavli.axiomaEpoptis);

	return (tavli.axiomaRank[axioma] >= tavli.axiomaRank[tavli.axiomaEpoptis]);
}

Pektis.prototype.pektisIsDiaxiristis = function(strict) {
	let axioma = this.pektisAxiomaGet();

	if (strict)
	return (axioma === tavli.axiomaDiaxiristis);

	return (tavli.axiomaRank[axioma] >= tavli.axiomaRank[tavli.axiomaDiaxiristis]);
}

Pektis.prototype.pektisIsAdministrator = function(strict) {
	let axioma = this.pektisAxiomaGet();

	if (strict)
	return (axioma === tavli.axiomaAdministrator);

	return (tavli.axiomaRank[axioma] >= tavli.axiomaRank[tavli.axiomaAdministrator]);
}

Pektis.prototype.pektisIsProedros = function(strict) {
	let axioma = this.pektisAxiomaGet();

	if (strict)
	return (axioma === tavli.axiomaProedros);

	return (tavli.axiomaRank[axioma] >= tavli.axiomaRank[tavli.axiomaProedros]);
}
