"use strict";

global.server = {};

server.ekinisi = function(skiniko) {
	log.fasi.nea('Activating node server');
	server.atexit().oriste(skiniko);

	return server;
};

server.oriste = function(skiniko) {
	log.print('Listening at port ' + globals.conf.sport + ' for http requests');
	server.skiser = http.createServer(function(request, response) {
		var nodereq, x;

		// Συμμαζεύουμε τις δομές του αιτήματος σε ένα αντικείμενο
		// για να διευκολυνθούμε στους μετέπειτα χειρισμούς.

		nodereq = new nodeRequest(request, response, skiniko);

		// Αν η υπηρεσία που ζητείται είναι στις προβλεπόμενες υπηρεσίες
		// τότε καλείται η αντίστοιχη function με όρισμα το ενισχυμένο
		// αίτημα το οποίο εμπεριέχει τόσο το ίδιο το αίτημα όσο και το
		// κανάλι απάντησης.

		if (server.router.hasOwnProperty(nodereq.service)) {
			server.router[nodereq.service](nodereq);
			return;
		}

		// Αν η υπηρεσία που ζητείται ανήκει στις υπηρεσίες που αγνοούνται
		// κλείνουμε αμέσως το αίτημα χωρίς να στείλουμε καμία απάντηση.

		if (server.serviceIgnore.hasOwnProperty(nodereq.service)) {
			nodereq.end()
			return;
		}

		// Ζητήθηκε υπηρεσία που δεν προβλέπεται από τα παραπάνω. Σ' αυτή την
		// περίπτωση απαντάμε με σφάλμα.

		x = nodereq.service.replace(/^\//, '');
		if (x != '') x += ': ';
		nodereq.error(x + 'service not found', 404);
		console.error(x + 'invalid url pathname');
	}).listen(globals.conf.sport);

	return server;
};

///////////////////////////////////////////////////////////////////////////////@

server.shutdown = function() {
	log.fasi.nea('Shutting down the Node server');
	server.skiser.close();
	db.reset(function() {
		log.fasi.nea('Skiser shutdown complete!');
		process.reallyExit();
	});

	return server;
};

// Η function "atexit" θα κληθεί λίγο πριν βάλουμε μπροστά τον Node server
// και κανονίζει να γίνουν κάποιες ενέργειες σε περίπτωση διακοπής.

server.atexit = function() {
	var stopEvent, i;

	stopEvent = {
		'exit': 0,
		'SIGHUP': 0,
		'SIGINT': 0,
		'SIGQUIT': 0,
		'SIGABRT': 0,
		'SIGALRM': 0,
		'SIGTERM': 0,
	};

	log.print('Setting up shutdown actions');
	for (i in stopEvent) {
		process.on(i, function() {
			if (server.closed)
			return;

			server.closed = true;
			server.shutdown();
		});
	}

	return server;
};
