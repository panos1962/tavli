"use strict";

try {
	window.tavladoros = {};
} catch (e) {
	global.tavladoros = {};
}

///////////////////////////////////////////////////////////////////////////////@

tavladoros.sxesiFilos = 'ΦΙΛΟΣ';
tavladoros.sxesiApoklismenos = 'ΑΠΟΚΛΕΙΣΜΕΝΟΣ';

tavladoros.simetoxiPektis = 'ΠΑΙΚΤΗΣ';
tavladoros.simetoxiTheatis = 'ΘΕΑΤΗΣ';

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

tavladoros.pexniidiPortes = 'ΠΟΡΤΕΣ';
tavladoros.pexniidiPlakoto = 'ΠΛΑΚΩΤΟ';
tavladoros.pexniidiFevga = 'ΦΕΥΓΑ';

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

tavladoros.pektisGet = function(x) {
	if (typeof(x) === 'string')
	return x;

	if (typeof(x) !== 'object')
	return undefined;

	if (x instanceof tavladoros.pektis)
	return x.login;

	if (x instanceof tavladoros.sinedria)
	return x.pektis;

	return undefined;
};

tavladoros.trapeziGet = function(x) {
	if (typeof(x) === 'number')
	return x;

	if (typeof(x) !== 'object')
	return undefined;

	if (x instanceof tavladoros.trapezi)
	return x.kodikos;

	if (x instanceof tavladoros.sinedria)
	return x.trapezi;

	return undefined;
};

///////////////////////////////////////////////////////////////////////////////@

tavladoros.pektis = function(props) {
	if (props) {
		for (let i in props)
		this[i] = props[i];
	}

	this.peparam = {};
	this.profinfo = {};
	this.sxesi = {};
}

tavladoros.pektis.prototype.pektisPeparamPush = function(peparam) {
	this.peparam[peparam.param] = peparam.timi;
	return this;
};

tavladoros.pektis.prototype.pektisProfinfoPush = function(profinfo) {
	this.profinfo[profinfo.sxoliastis] = profinfo.kimeno;
	return this;
};

tavladoros.pektis.prototype.pektisSxesiPush = function(sxesi) {
	this.sxesi[sxesi.sxetizomenos] = sxesi.sxesi;
	return this;
};

tavladoros.pektis.prototype.pektisPeparamSet = function(param, timi) {
	if (!tavladoros.peparamValid.hasOwnProperty(param))
	throw param + ': invalid parameter';

	this.peparam[param] = timi;
	return this;
}

tavladoros.pektis.prototype.pektisPeparamGet = function(param) {
	return this.peparam[param];
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

tavladoros.peparam = function(props) {
	if (props) {
		for (let i in props)
		this[i] = props[i];
	}
};

///////////////////////////////////////////////////////////////////////////////@

tavladoros.profinfo = function(props) {
	if (props) {
		for (let i in props)
		this[i] = props[i];
	}
};

///////////////////////////////////////////////////////////////////////////////@

tavladoros.sxesi = function(props) {
	if (props) {
		for (let i in props)
		this[i] = props[i];
	}
};

///////////////////////////////////////////////////////////////////////////////@

tavladoros.trapezi = function(props) {
	if (props) {
		for (let i in props)
		this[i] = props[i];
	}

	this.trparam = {};
	this.pexnidi = [];
	this.sizitisi = [];
	this.theatis = {};
	this.simetoxi = {};
};

tavladoros.trapezi.prototype.trapeziPollSet = function() {
	this.poll = globals.torasec();
	return this;
};

tavladoros.trapezi.prototype.trapeziTrparamPush = function(trparam) {
	this.trparam[trparam.param] = trparam.timi;
	return this;
};

tavladoros.trapezi.prototype.trapeziPexnidiPush = function(pexnidi) {
	this.pexnidi.push(pexnidi);
	return this;
};

tavladoros.trapezi.prototype.trapeziSimetoxiPush = function(simetoxi) {
	this.simetoxi[simetoxi.pektis] = simetoxi;
	return this;
};

tavladoros.trapezi.prototype.trapeziPektisGet = function(thesi) {
	return this['pektis' + thesi];
};

///////////////////////////////////////////////////////////////////////////////@

tavladoros.trparam = function(props) {
	if (props) {
		for (let i in props)
		this[i] = props[i];
	}
};

///////////////////////////////////////////////////////////////////////////////@

tavladoros.pexnidi = function(props) {
	if (props) {
		for (let i in props)
		this[i] = props[i];
	}

	this.kinisi = [];
};

tavladoros.pexnidi.prototype.pexnidiKinisiPush = function(kinisi) {
	this.kinisi.push(kinisi);
	return this;
};

///////////////////////////////////////////////////////////////////////////////@

tavladoros.kinisi = function(props) {
	if (props) {
		for (let i in props)
		this[i] = props[i];
	}
};

///////////////////////////////////////////////////////////////////////////////@

tavladoros.simetoxi = function(props) {
	if (props) {
		for (let i in props)
		this[i] = props[i];
	}
};

///////////////////////////////////////////////////////////////////////////////@

tavladoros.sinedria = function(props) {
	if (props) {
		for (let i in props)
		this[i] = props[i];
	}
}

tavladoros.sinedria.prototype.sinedriaPollSet = function() {
	this.poll = globals.torasec();
	return this;
};

tavladoros.sinedria.prototype.sinedriaIpSet = function(ip) {
	this.ip = ip;
	return this;
};

tavladoros.sinedria.prototype.sinedriaPektisGet = function() {
	return this.pektis;
};

tavladoros.sinedria.prototype.sinedriaRebelosSet = function() {
	this.trapezi = undefined;
	this.thesi = undefined;
	this.simetoxi = undefined;

	return this;
};

tavladoros.sinedria.prototype.sinedriaIsPektis = function() {
	return (this.simetoxi === tavladoros.simetoxiPektis);
};

tavladoros.sinedria.prototype.sinedriaIsTheatis = function() {
	return (this.simetoxi === tavladoros.simetoxiTheatis);
};

tavladoros.sinedria.prototype.sinedriaTrapeziGet = function() {
	return this.trapezi;
};

///////////////////////////////////////////////////////////////////////////////@
