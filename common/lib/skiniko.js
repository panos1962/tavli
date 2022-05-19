"use strict";

var skiniko = {};

var Pektis = function(props) {
	let i;

	for (i in props)
	this[i] = props[i]

	this.param = {};
}

Pektis.prototype.pektisParamSet = function(param, timi) {
	if (!Tavladoros.peparamValid.hasOwnProperty(param))
	throw param + ': invalid parameter';

	this.param[param] = timi;
	return this;
}

Pektis.prototype.pektisParamGet = function(param) {
	return this.param[param];
}

Pektis.prototype.pektisAxiomaSet = function(axioma) {
	if (!Tavladoros.axiomaRank.hasOwnProperty(axioma))
	throw axioma + ': μη αποδεκτό αξίωμα';

	this.pektisParamSet(Tavladoros.peparamAxioma, axioma);
	return this;
}

Pektis.prototype.pektisAxiomaGet = function() {
	let axioma = this.pektisParamGet(Tavladoros.peparamAxioma);

	if (Tavladoros.axiomaRank.hasOwnProperty(axioma))
	return axioma;

	this.pektisAxiomaSet(Tavladoros.axiomaThamonas);
	return Tavladoros.axiomaThamonas;
}

Pektis.prototype.pektisIsThamonas = function(strict) {
	let axioma = this.pektisAxiomaGet();

	if (strict)
	return (axioma === Tavladoros.axiomaThamonas);

	return (Tavladoros.axiomaRank[axioma] >= Tavladoros.axiomaRank[Tavladoros.axiomaThamonas]);
}

Pektis.prototype.pektisIsVip = function(strict) {
	let axioma = this.pektisAxiomaGet();

	if (strict)
	return (axioma === Tavladoros.axiomaVip);

	return (Tavladoros.axiomaRank[axioma] >= Tavladoros.axiomaRank[Tavladoros.axiomaVip]);
}

Pektis.prototype.pektisIsEpoptis = function(strict) {
	let axioma = this.pektisAxiomaGet();

	if (strict)
	return (axioma === Tavladoros.axiomaEpoptis);

	return (Tavladoros.axiomaRank[axioma] >= Tavladoros.axiomaRank[Tavladoros.axiomaEpoptis]);
}

Pektis.prototype.pektisIsDiaxiristis = function(strict) {
	let axioma = this.pektisAxiomaGet();

	if (strict)
	return (axioma === Tavladoros.axiomaDiaxiristis);

	return (Tavladoros.axiomaRank[axioma] >= Tavladoros.axiomaRank[Tavladoros.axiomaDiaxiristis]);
}

Pektis.prototype.pektisIsAdministrator = function(strict) {
	let axioma = this.pektisAxiomaGet();

	if (strict)
	return (axioma === Tavladoros.axiomaAdministrator);

	return (Tavladoros.axiomaRank[axioma] >= Tavladoros.axiomaRank[Tavladoros.axiomaAdministrator]);
}

Pektis.prototype.pektisIsProedros = function(strict) {
	let axioma = this.pektisAxiomaGet();

	if (strict)
	return (axioma === Tavladoros.axiomaProedros);

	return (Tavladoros.axiomaRank[axioma] >= Tavladoros.axiomaRank[Tavladoros.axiomaProedros]);
}

///////////////////////////////////////////////////////////////////////////////@

// Το τάβλι έχει τέσσερις (4) περιοχές που αριθμούνται από 0 έως 3 ως εξής:
//
//	0: κάτω αριστερά
//	1: κάτω δεξία
//	2: πάνω δεξιά
//	3: πάνω αριστερά

Perioxi = function(id) {
	if (id !== undefined)
	this.idSet(id);
};

Perioxi.prototype.perioxiIdSet = function(id) {
	this.id = id;
	return this;
};

Perioxi.prototype.perioxiIdGet = function() {
	return this.id;
};

///////////////////////////////////////////////////////////////////////////////@

Thesi = function(id) {
	if (id !== undefined)
	this.idSet(id);
};

Thesi.prototype.thesiIdSet = function(id) {
	this.id = id;
	this.thesiPerioxiSet(parseInt(this.thesIIdGet() / 6));

	return this;
};

Thesi.prototype.thesiIdGet = function() {
	return this.id;
};

Thesi.prototype.thesiPerioxiSet = function(perioxi) {
	this.perioxi = perioxi;
	return this;
};

Thesi.prototype.thesiPerioxiGet = function() {
	return this.perioxi;
};

///////////////////////////////////////////////////////////////////////////////@
