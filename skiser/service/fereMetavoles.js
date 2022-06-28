"use strict";

// Η function "feremetavoles" εξυπηρετεί αίτημα αποστολής δεδομένων μεταβολής
// σκηνικών δεδομένων. Αν βρεθούν δεδομένα μεταβολής επιστρέφει αμέσως με τα
// δεδομένα μεταβολής, αλλιώς τίθεται σε αναμονή μέχρι να προκύψουν μεταβολές,
// ή να κλείσει επιστρέφοντας κωδικό μη μεταβολής λόγω παρέλευσης μέγιστου χρόνου
// αναμονής.

service.fereMetavoles = function(nodereq) {
	if (nodereq.isvoli())
	return;

	if (nodereq.denPerastike('id', true))
	return;

	nodereq.sinedriaGet().
	feredataPollSet().
	feredataSet(nodereq).
	feredataAlages();
};

