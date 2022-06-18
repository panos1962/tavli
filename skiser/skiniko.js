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

	query = 'SELECT `kodikos`, `pektis1`, `pektis2` ' +
		'FROM `trapezi` ' +
		'WHERE `arxio` IS NULL ' +
		'ORDER BY `kodikos`';

	conn.query(query, function(conn, rows) {
		rows.forEach(function(i, trapezi) {
console.log(i);
return;
			trapezi = new Trapezi(trapezi).trapeziPollSet();
			skiniko.skinikoTrapeziSet(trapezi);

			// Κρατάμε τα ενεργά τραπέζια στη λίστα "izepart".

			skiniko.izepart[trapezi.kodikos] = trapezi;

			// Κρατάμε όλους τους εμπλεκόμενους παίκτες στη λίστα "sitkep".
			// Ενδεχομένως να κρατήσουμε και κενή εγγραφή, αλλά αργότερα
			// θα διαγράψουμε την κενή εγγραφή. Εκμεταλλευόμαστε αυτή τη
			// λίστα για να κρατήσουμε και τα πιο φρέσκα στοιχεία θέσης
			// του παίκτη, καθώς επισκεπτόμαστε τα τραπέζι κατ' αύξουσα
			// σειρά.

			trapezi.trapeziThesiWalk(function(thesi) {
				skiniko.sitkep[this.trapeziPektisGet(thesi)] = {
					trapezi: trapezi.kodikos,
					thesi: thesi,
				};
			});
		});

		delete skiniko.sitkep[null];
		log.print('Παράμετροι τραπεζιών');
		skiniko.izepart2 = {};		// δευτερεύουσα λίστα τραπεζιών
		skiniko.stisimoTrparam(conn);
	});

	return this;
};
