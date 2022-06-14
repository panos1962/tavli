"use strict";

let Server = global.server;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Στο παρόν παρέχονται δομές και μέθοδοι που αφορούν γενικά στον skiser.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Η function "readFileSync" διαβάζει ολόκληρο το περιεχόμενο ενός file και το επιστρέφει
// ως ενιαίο string. Όπως υπονοεί και το όνομά της η διαδικασία είναι σύγχρονη, επομένως
// μπλοκάρει τον skiser και γι' αυτό το λόγο θα πρέπει να χρησιμοποιείται μόνο κατά το
// ανέβασμα, ή το κατέβασμα του skiser.

Server.require = function(fname) {
	if ((!fname.match(/^\//)) && Server.hasOwnProperty('APPDIR'))
	fname = Server.APPDIR + fname;

	return require(fname);
}

// Η function "readFileSync" διαβάζει ολόκληρο το περιεχόμενο ενός file και το επιστρέφει
// ως ενιαίο string. Όπως υπονοεί και το όνομά της η διαδικασία είναι σύγχρονη, επομένως
// μπλοκάρει τον skiser και γι' αυτό το λόγο θα πρέπει να χρησιμοποιείται μόνο κατά το
// ανέβασμα, ή το κατέβασμα του skiser.

Server.readFileSync = function(fname) {
	if ((!fname.match(/^\//)) && Server.hasOwnProperty('APPDIR'))
	fname = Server.APPDIR + fname;

	return FS.readFileSync(fname, {
		encoding: 'utf8',
	}, function(err) {
		console.log(err);
	});
}
