"use strict";

global.server = {};

server.ekinisi = function(skiniko) {
	Log.fasi.nea('Activating the node server');
	server.atexit().oriste(skiniko);

	return server;
};

server.oriste = function(skiniko) {
	Globals.sport = server.readFileSync('misc/.mistiko/sport').replace(/[^a-zA-Z0-9]/g, '');
	Log.print('listening port ' + Globals.sport + ' for http requests');
	server.skiser = HTTP.createServer(function(request, response) {
		var nodereq, x;

		// Συμμαζεύουμε τις δομές του αιτήματος σε ένα αντικείμενο
		// για να διευκολυνθούμε στους μετέπειτα χειρισμούς.

		nodereq = new NodeRequest(request, response, skiniko);

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

		if (server.off.hasOwnProperty(nodereq.service)) {
			nodereq.end()
			return;
		}

		// Ζητήθηκε υπηρεσία που δεν προβλέπεται από τα παραπάνω. Σ' αυτή την
		// περίπτωση απαντάμε με σφάλμα.

		x = nodereq.service.replace(/^\//, '');
		if (x != '') x += ': ';
		nodereq.error(x + 'service not found', 404);
		console.error(x + 'invalid url pathname');
	}).listen(Globals.sport);

	return server;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////@

server.shutdown = function() {
	Log.fasi.nea('Shutting down the Node server');
	server.skiser.close();
	DB.reset(function() {
		Log.fasi.nea('Skiser shutdown complete!');
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

	Log.print('Setting up shutdown actions');
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
