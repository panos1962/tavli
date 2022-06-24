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
		rows.forEach(function(trapezi) {
			trapezi = new tavladoros.trapezi(trapezi).trapeziPollSet();
			skiniko.trapeziPush(trapezi);

			skiniko.stisimoTrparam(conn, trapezi);
		});
console.log('XXXXXX');

		server.ekinisi();
	});

	return skiniko;
};

skiniko.stisimoTrparam = function(conn, trapezi) {
	let query = 'SELECT `param`, `timi` ' +
		'FROM `trparam` ' +
		'WHERE `trapezi` = ' + trapezi.kodikos;

	conn.query(query, function(conn, rows) {
		rows.forEach(function(i, trparam) {
			trapezi.trapeziTrparamPush(new tavladoros.trparam(trparam));
		});

		skiniko.stisimoPexnidi(conn, trapezi);
	});

	return skiniko;
};

skiniko.stisimoPexnidi = function(conn, trapezi) {
	let query = 'SELECT `kodikos`, `enarxi`, `idos`, `protos`, ' +
		'`xamenos`, `ita`, `telos` ' +
		'FROM `pexnidi` ' +
		'WHERE `trapezi` = ' + trapezi.kodikos + ' ' +
		'ORDER BY `kodikos`';

	conn.query(query, function(conn, rows) {
		rows.forEach(function(i, pexnidi) {
			pexnidiLast = new tavladoros.pexnidi(pexnidi);
			trapezi.trapeziPexnidiPush(pexnidiLast);
		});

		skiniko.stisimoKinisi(conn, trapezi)
	});

	return skiniko;
};

skiniko.stisimoKinisi = function(conn, trapezi) {
	if (!trapezi.pexnidi.length)
	return skiniko.stisimoSimetoxi(conn, trapezi);

	let query = 'SELECT * ' +
		'FROM `kinisi` ' +
		'WHERE `pexnidi` = ' + trapezi.pexnidi[trapezi.pexnidi.length - 1].kodikos;
		'ORDER BY `kodikos`';

	conn.query(query, function(conn, rows) {
		skiniko.stisimoSimetoxi(conn, trapezi)
	});

	return skiniko;
};

skiniko.stisimoSimetoxi = function(conn, trapezi) {
	return skiniko;
};
