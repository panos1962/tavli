///////////////////////////////////////////////////////////////////////////////@

// Ακολουθούν τα σχετικά με τις υπηρεσίες που θα προσφέρει ο skiser.
// Οι υπηρεσίες ορίζονται σε δικά τους modules. Υπάρχουν modules που
// ορίζουν μια υπηρεσία, υπάρχουν όμως και modules που ορίζουν πολλές
// παρεμφερείς υπηρεσίες.

global.service = {};

log.level.push();
require('./service/fereSkiniko.js');
require('./service/fereMetavoles.js');
log.level.pop();

// Στο αντικείμενο "router" περιέχονται οι υπηρεσίες που προσφέρει ο server.
// Σε κάθε "υπηρεσία" αντιστοιχούμε μια function που θα κληθεί με παράμετρο
// το ίδιο το αίτημα όπως αυτό διαμορφώνεται μετά τον έλεγχο και την αρχική
// επεξεργασία που υφίσταται από τον server.

server.router = {
	'/fereSkiniko': service.fereSkiniko,
	'/fereMetavoles': service.fereMetavoles,
};

// Ακολουθούν υπηρεσίες που ζητούνται μεν, αλλά αγνοούνται και δεν επιστρέφουν
// αποτελέσματα ούτε εκτελούν κάποιες διεργασίες. Η υπηρεσία "favicon.ico" είναι
// κλήση που ζητείται από πολλούς browsers by default μετά την αίτηση οποιασδήποτε
// σελίδας, αλλά ο παρών server δεν χρειάζεται να απαντάει σε τέτοιου είδους
// αιτήματα.

server.serviceIgnore = {
	'/favicon.ico': true,
	'/testOff': true,
};

// Ακολουθούν υπηρεσίες που δεν πρέπει να επηρεάζουν το timestamp επαφής της
// συνεδρίας καθώς εκτελούνται αυτόματα από το πρόγραμμα ακόμη και αν ο παίκτης
// δεν κάνει καμία απολύτως ενέργεια.

server.serviceNoPoll = {
	'/fereMetavoles': true,
};
