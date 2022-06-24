"use strict";

// Ακολουθεί μέθοδος με την οποία στήνεται το σκηνικό στον server. Η μέθοδος
// αποτελεί ουσιαστικά το σημείο εκκίνησης της διαδικασίας, καθώς υπάρχει
// πληθώρα επιμέρους διαδικασιών που καλούνται αλυσιδωτά προκειμένου να στηθεί
// το σκηνικό. Περιττό να πούμε ότι το στήσιμο του σκηνικού στον skiser γίνεται
// με βάση τα στοιχεία που υπάρχουν κρατημένα στην database.  

skiniko.stisimo = function() {
	log.fasi.nea('Στήσιμο σκηνικού');
	log.print('Τραπέζια');
	skiniko.stisimoTrapezi(db.connection());
};

// Διαβάζουμε τα ενεργά τραπέζια από την database και τα εντάσσουμε στο
// σκηνικό.

skiniko.stisimoTrapezi = function(conn) {
	skiniko.trapezi = {};

	let query = 'SELECT `kodikos`, `stisimo`, `pektis1`, `apodoxi1`, ' +
		'`pektis2`, `apodoxi2`, `poll` ' +
		'FROM `trapezi` ' +
		'WHERE `arxio` IS NULL ' +
		'ORDER BY `kodikos`';

	conn.query(query, function(conn, rows) {
		skiniko.izepart1 = {};
		skiniko.izepart2 = {};

		rows.forEach(function(trapezi) {
			trapezi = new tavladoros.trapezi(trapezi).trapeziPollSet();
			skiniko.trapeziPush(trapezi);
			skiniko.izepart1[trapezi.kodikos] = 1;
		});

		log.print('Παράμετροι τραπεζιών');
		return skiniko.stisimoTrparam(conn);
	});

	return skiniko;
};

skiniko.stisimoTrparam = function(conn) {
	for (let kodikos in skiniko.izepart1) {
		let trapezi = skiniko.trapezi[kodikos];

		skiniko.izepart2[kodikos] = 1;
		delete skiniko.izepart1[kodikos];

		let query = 'SELECT `param`, `timi` ' +
			'FROM `trparam` ' +
			'WHERE `trapezi` = ' + kodikos;

		conn.query(query, function(conn, rows) {
			rows.forEach(function(trparam) {
				trparam = new tavladoros.trparam(trparam);
				trapezi.trapeziTrparamPush(trparam);
			});

			skiniko.stisimoTrparam(conn);
		});

		return skiniko;
	}

	log.print('Παιχνίδια');
	return skiniko.stisimoPexnidi(conn);
};

skiniko.stisimoPexnidi = function(conn) {
	for (let kodikos in skiniko.izepart2) {
		let trapezi = skiniko.trapezi[kodikos];

		skiniko.izepart1[kodikos] = 1;
		delete skiniko.izepart2[kodikos];

		let query = 'SELECT `kodikos`, `enarxi`, `idos`, `protos`, ' +
			'`xamenos`, `ita`, `telos` ' +
			'FROM `pexnidi` ' +
			'WHERE `trapezi` = ' + kodikos + ' ' +
			'ORDER BY `kodikos`';

		conn.query(query, function(conn, rows) {
			rows.forEach(function(pexnidi) {
				pexnidi = new tavladoros.pexnidi(pexnidi);
				trapezi.trapeziPexnidiPush(pexnidi);
			});

			skiniko.stisimoPexnidi(conn);
		});

		return skiniko;
	}

	log.print('Κινήσεις');
	return skiniko.stisimoKinisi(conn);
};

skiniko.stisimoKinisi = function(conn) {
	for (let kodikos in skiniko.izepart1) {
		let trapezi = skiniko.trapezi[kodikos];

		skiniko.izepart2[kodikos] = 1;
		delete skiniko.izepart1[kodikos];

		if (!trapezi.pexnidi.length)
		return skiniko.stisimoKinisi(conn);

		let pexnidi = trapezi.pexnidi[trapezi.pexnidi.length - 1];

		let query = 'SELECT * ' +
			'FROM `kinisi` ' +
			'WHERE `pexnidi` = ' + pexnidi.kodikos;
			'ORDER BY `kodikos`';

		conn.query(query, function(conn, rows) {
			rows.forEach(function(kinisi) {
				kinisi = new tavladoros.kinisi(kinisi);
				pexnidi.pexnidiKinisiPush(kinisi);
			});

			skiniko.stisimoKinisi(conn);
		});

		return skiniko;
	}

	log.print('Συμμετοχές');
	return skiniko.stisimoSimetoxi(conn);
};

skiniko.stisimoSimetoxi = function(conn) {
	for (let kodikos in skiniko.izepart2) {
		let trapezi = skiniko.trapezi[kodikos];

		skiniko.izepart1[kodikos] = 1;
		delete skiniko.izepart2[kodikos];

		let query = 'SELECT `pektis`, `thesi` ' +
			'FROM `simetoxi` ' +
			'WHERE `trapezi` = ' + kodikos;

		conn.query(query, function(conn, rows) {
			rows.forEach(function(simetoxi) {
				simetoxi = new tavladoros.simetoxi(simetoxi);
				trapezi.trapeziSimetoxiPush(simetoxi);
			});

			skiniko.stisimoSimetoxi(conn);
		});

		return skiniko;
	}

console.log(skiniko.trapezi);
	return server.ekinisi();
};
