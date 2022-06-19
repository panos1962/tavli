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
	let query;

	skiniko.izepart = {};	// λίστα τραπεζιών
	skiniko.sitkep = {};	// λίστα συμμετεχόντων παικτών

	skiniko.trapezi = {};

	query = 'SELECT `kodikos`, `stisimo`, `pektis1`, `apodoxi1`, ' +
		'`pektis2`, `apodoxi2`, `poll` ' +
		'FROM `trapezi` ' +
		'WHERE `arxio` IS NULL ' +
		'ORDER BY `kodikos`';

	conn.query(query, function(conn, rows) {
		rows.forEach(function(trapezi) {
			trapezi = new tavladoros.trapezi(trapezi).trapeziPollSet();
			skiniko.trapeziSet(trapezi);

			// Κρατάμε τα ενεργά τραπέζια στη λίστα "izepart".

			skiniko.izepart[trapezi.kodikos] = trapezi;

			// Κρατάμε όλους τους εμπλεκόμενους παίκτες στη λίστα
			// "sitkep".

			skiniko.sitkep[trapezi.pektis1] = 1;
			skiniko.sitkep[trapezi.pektis2] = 2;
		});

		delete skiniko.sitkep[null];

		log.print('Παράμετροι τραπεζιών');
		skiniko.izepart2 = {};		// δευτερεύουσα λίστα τραπεζιών
		skiniko.stisimoTrparam(conn);
	});

	return this;
};

// Διαβάζουμε τις παραμέτρους των ενεργών τραπεζιών και τις εντάσσουμε στο
// σκηνικό.

skiniko.stisimoTrparam = function(conn) {
	let kodikos;
	let query;

	for (kodikos in skiniko.izepart) {
		let trapezi = skiniko.izepart[kodikos];
		delete skiniko.izepart[kodikos];

		skiniko.izepart2[kodikos] = trapezi;

		query = 'SELECT `param`, `timi` ' +
			'FROM `trparam` ' +
			'WHERE `trapezi` = ' + kodikos;

		conn.query(query, function(conn, rows) {
			rows.forEach(function(i, trparam) {
				trapezi.trapeziTrparamSet(new Trparam(trparam));
			});

			// Συνεχίζουμε με τα υπόλοιπα στοιχεία της λίστας
			// τραπεζιών.

			skiniko.stisimoTrparam(conn);
		});

		// Διακόπτουμε τη διαδικασία στο πρώτο τραπέζι εφόσον
		// λειτουργούμε με αναδρομή.

		return skiniko;
	}

console.log(skiniko.trapezi);
	// Έχει εξαντληθεί η λίστα τραπεζιών, οπότε προχωρούμε στην επόμενη φάση
	// που αφορά στις συμμετοχές.

	log.print('Μητρώο συμμετοχών');
	//this.stisimoSimetoxi(conn);
	server.ekinisi();
	return skiniko;
};
