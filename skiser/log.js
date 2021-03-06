"use strict";

// Στο παρόν module ορίζουμε δομές και μεθόδους που αφορούν στο console log
// και γενικότερα στην παρακολούθηση των εργασιών που εκτελούνται στον node
// server.

global.log = {};

log.level = {
	level: 0,

	reset: function() {
		log.level.level = 0;
		return log;
	},

	push: function() {
		log.level.level++;
		return log;
	},

	pop: function() {
		log.level.level--;
		return log;
	},
};

log.fasi = {
	fasi: 0,

	nea: function(msg) {
		log.fasi.fasi++;
		console.log('\nPHASE ' + log.fasi.fasi + ': ' + msg);
		log.level.reset();
	},
};

log.print = function(msg) {
	var tabs = '', i;

	for (i = 0; i <= log.level.level; i++)
	tabs += '\t';

	console.log(tabs + msg);
}

// Η ενημέρωση είναι πρωθύστερη για ευνόητους λόγους.

log.fasi.nea('initializing the node server');
