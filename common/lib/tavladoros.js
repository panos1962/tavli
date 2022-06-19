"use strict";

try {
	window.tavladoros = {};
} catch (e) {
	global.tavladoros = {};
}

///////////////////////////////////////////////////////////////////////////////@

tavladoros.sxesiFilos = 'ΦΙΛΟΣ';
tavladoros.sxesiApoklismenos = 'ΑΠΟΚΛΕΙΣΜΕΝΟΣ';

tavladoros.peparamAxioma = 'ΑΞΙΩΜΑ';
tavladoros.peparamKatastasi = 'ΚΑΤΑΣΤΑΣΗ';
tavladoros.peparamPoulia = 'ΠΟΥΛΙΑ';
tavladoros.peparamApodosi = 'ΑΠΟΔΟΣΗ';

tavladoros.peparamValid = {};
tavladoros.peparamValid[tavladoros.peparamAxioma] = 1;
tavladoros.peparamValid[tavladoros.peparamKatastasi] = 1;
tavladoros.peparamValid[tavladoros.peparamPoulia] = 1;
tavladoros.peparamValid[tavladoros.peparamApodosi] = 1;

tavladoros.axiomaThamonas = 'ΘΑΜΩΝΑΣ';
tavladoros.axiomaVip = 'VIP';
tavladoros.axiomaEpoptis = 'ΕΠΟΠΤΗΣ';
tavladoros.axiomaDiaxiristis = 'ΔΙΑΧΕΙΡΙΣΤΗΣ';
tavladoros.axiomaAdministrator = 'ADMINISTRATOR';
tavladoros.axiomaProedros = 'ΠΡΟΕΔΡΟΣ';

tavladoros.katastasiEleftheros = 'ΕΛΕΥΘΕΡΟΣ';
tavladoros.katastasiApasxolimenos = 'ΑΠΑΣΧΟΛΗΜΕΝΟΣ';

tavladoros.pouliaAspra = 'ΑΣΠΡΑ';
tavladoros.pouliaMavra = 'ΜΑΥΡΑ';

tavladoros.axiomaRank = {};
tavladoros.axiomaRank[tavladoros.axiomaThamonas] = 0;
tavladoros.axiomaRank[tavladoros.axiomaVip] = 10;
tavladoros.axiomaRank[tavladoros.axiomaEpoptis] = 20;
tavladoros.axiomaRank[tavladoros.axiomaDiaxiristis] = 30;
tavladoros.axiomaRank[tavladoros.axiomaAdministrator] = 40;
tavladoros.axiomaRank[tavladoros.axiomaProedros] = 50;

tavladoros.peparamDefault = {};
tavladoros.peparamDefault[tavladoros.peparamAxioma] = tavladoros.axiomaThamonas;
tavladoros.peparamDefault[tavladoros.peparamKatastasi] = tavladoros.katastasiEleftheros;
tavladoros.peparamDefault[tavladoros.peparamPoulia] = tavladoros.pouliaAspra;
tavladoros.peparamDefault[tavladoros.peparamApodosi] = '';

///////////////////////////////////////////////////////////////////////////////@

tavladoros.loginGet = function(x) {
	if (typeof(x) === 'string')
	return x;

	if (typeof(x) !== 'object')
	return undefined;

	if (x instanceof tavladoros.pektis)
	return x.login;

	return undefined;
};

///////////////////////////////////////////////////////////////////////////////@

tavladoros.pektis = function(props) {
	if (props) {
		for (let i in props)
		this[i] = props[i];
	}

	this.param = {};
	this.sxesi = {};
}

tavladoros.pektis.prototype.pektisParamSet = function(param, timi) {
	if (!tavladoros.peparamValid.hasOwnProperty(param))
	throw param + ': invalid parameter';

	this.param[param] = timi;
	return this;
}

tavladoros.pektis.prototype.pektisParamGet = function(param) {
	return this.param[param];
}

tavladoros.pektis.prototype.pektisAxiomaSet = function(axioma) {
	if (!tavladoros.axiomaRank.hasOwnProperty(axioma))
	throw axioma + ': μη αποδεκτό αξίωμα';

	this.pektisParamSet(tavladoros.peparamAxioma, axioma);
	return this;
}

tavladoros.pektis.prototype.pektisAxiomaGet = function() {
	let axioma = this.pektisParamGet(tavladoros.peparamAxioma);

	if (tavladoros.axiomaRank.hasOwnProperty(axioma))
	return axioma;

	this.pektisAxiomaSet(tavladoros.axiomaThamonas);
	return tavladoros.axiomaThamonas;
}

tavladoros.pektis.prototype.pektisIsThamonas = function(strict) {
	let axioma = this.pektisAxiomaGet();

	if (strict)
	return (axioma === tavladoros.axiomaThamonas);

	return (tavladoros.axiomaRank[axioma] >= tavladoros.axiomaRank[tavladoros.axiomaThamonas]);
}

tavladoros.pektis.prototype.pektisIsVip = function(strict) {
	let axioma = this.pektisAxiomaGet();

	if (strict)
	return (axioma === tavladoros.axiomaVip);

	return (tavladoros.axiomaRank[axioma] >= tavladoros.axiomaRank[tavladoros.axiomaVip]);
}

tavladoros.pektis.prototype.pektisIsEpoptis = function(strict) {
	let axioma = this.pektisAxiomaGet();

	if (strict)
	return (axioma === tavladoros.axiomaEpoptis);

	return (tavladoros.axiomaRank[axioma] >= tavladoros.axiomaRank[tavladoros.axiomaEpoptis]);
}

tavladoros.pektis.prototype.pektisIsDiaxiristis = function(strict) {
	let axioma = this.pektisAxiomaGet();

	if (strict)
	return (axioma === tavladoros.axiomaDiaxiristis);

	return (tavladoros.axiomaRank[axioma] >= tavladoros.axiomaRank[tavladoros.axiomaDiaxiristis]);
}

tavladoros.pektis.prototype.pektisIsAdministrator = function(strict) {
	let axioma = this.pektisAxiomaGet();

	if (strict)
	return (axioma === tavladoros.axiomaAdministrator);

	return (tavladoros.axiomaRank[axioma] >= tavladoros.axiomaRank[tavladoros.axiomaAdministrator]);
}

tavladoros.pektis.prototype.pektisIsProedros = function(strict) {
	let axioma = this.pektisAxiomaGet();

	if (strict)
	return (axioma === tavladoros.axiomaProedros);

	return (tavladoros.axiomaRank[axioma] >= tavladoros.axiomaRank[tavladoros.axiomaProedros]);
}

tavladoros.pektis.prototype.pektisIsFilos = function(pektis) {
	pektis = tavladoros.loginGet(pektis);
	return (this.sxesi[pektis] === tavladoros.sxesiFilos);
};

tavladoros.pektis.prototype.pektisIsApoklismenos = function(pektis) {
	pektis = tavladoros.loginGet(pektis);
	return (this.sxesi[pektis] === tavladoros.sxesiApoklismenos);
};

///////////////////////////////////////////////////////////////////////////////@

tavladoros.trapezi = function(props) {
	if (props) {
		for (let i in props)
		this[i] = props[i];
	}

	this.param = {};
	this.theatis = {};
}

tavladoros.trapezi.prototype.trapeziPollSet = function() {
	this.poll = new Date;
	return this;
};

///////////////////////////////////////////////////////////////////////////////@

tavladoros.sinedria = function(props) {
	if (props) {
		for (let i in props)
		this[i] = props[i];
	}
}

tavladoros.trapezi.prototype.trapeziPollSet = function() {
	this.poll = new Date;
	return this;
};

///////////////////////////////////////////////////////////////////////////////@
