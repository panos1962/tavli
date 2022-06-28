"use strict";

console.log('Launching node server');

// Εμπλουτίζουμε με απλές δομές και μεθόδους που θα μας βοηθήσουν στην
// εκτύπωση μηνυμάτων προόδου των εργασιών του παρόντος κλπ.

require('./log.js');
log.print('Reading log functions\' module');

///////////////////////////////////////////////////////////////////////////////@

// Εμπλουτίζουμε με θεμελιακές δομές και μεθόδους που αφορούν στη γενικότερη
// λειτουργία του node server.

log.level.push('Reading node server system modules');

// Εμπλουτίζουμε με δομές και μεθόδους που θα μας επιτρέψουν να προσπελάσουμε
// παραμέτρους του λειτουργικού συστήματος.

log.print('Reading operating system module');
global.os = require('os');

// Εμπλουτίζουμε με δομές και μεθόδους που θα μας επιτρέψουν να προσπελάσουμε
// το file system προκειμένου να διαβάσουμε αρχεία ή να γράψουμε σε αυτά.

log.print('Reading file system module');
global.fs = require('fs');

// Εμπλουτίζουμε με δομές και μεθόδους που θα μας επιτρέψουν να επικοινωνήσουμε
// με την MySQL database που αποτελεί τον πυρήνα της εφαρμογής.

log.print('Reading MySQL module');
try {
	global.MySQL = require('mysql');
} catch (e) {
	global.MySQL = require('/usr/local/lib/node_modules/mysql');
}

// Εμπλουτίζουμε με δομές και μεθόδους που επιτρέπουν στον node server να
// ακούει και να απαντά σε HTTP requests.

log.print('Reading http module');
global.http = require('http');

// Εμπλουτίζουμε με δομές και μεθόδους που μας επιτρέπουν να αποδομήσουμε ένα
// url και να προσπελάσουμε τα δομικά του στοιχεία, π.χ. pathname, παράμετροι
// κλπ.

log.print('Reading url module');
global.url = require('url');

// Εμπλουτίζουμε με δομές και μεθόδους που μας επιτρέπουν να κρυπτογραφούμε
// τους κωδικούς εισόδου των χρηστών.

log.print('Reading crypto module');
global.crypto = require('crypto');

log.level.reset();

///////////////////////////////////////////////////////////////////////////////@

log.level.push('Reading utility functions\' modules');

// Εμπλουτίζουμε με δομές και μεθόδους που είναι κοινές σε server και client,
// και αφορούν σε JavaScript functions γενικής χρήσης.

log.print('Reading common "standard" module');
require('../common/lib/standard');

// Εμπλουτίζουμε με δομές και μεθόδους που αφορούν σε JavaScript functions
// γενικής χρήσης που αφορούν στον node server.

log.print('Reading server "standard" module');
require('./standard.js');

// Εμπλουτίζουμε με δομές και μεθόδους που διευκολύνουν την επαφή μας με την
// database της εφαρμογής.

log.print('Reading database utility functions\' module');
require('./db.js');

// Εμπλουτίζουμε με δομές και μεθόδους που είναι κοινές σε server και client
// και αφορούν σε «ταβλικά» αντικείμενα.

log.print('Reading common "tavladoros" module');
require('../common/lib/tavladoros.js');

log.level.reset();

///////////////////////////////////////////////////////////////////////////////@

log.level.push('Reading "skiniko" modules');

// Εμπλουτίζουμε με δομές και μεθόδους που είναι κοινές σε server και client
// και αφορούν στη διαμόρφωση και στον χειρισμό του σκηνικού.

log.print('Reading common "skiniko" module');
require('../common/lib/skiniko');
require('../common/lib/metavoli');

// Εμπλουτίζουμε με δομές και μεθόδους που αφορούν στη διαμόρφωση και στον
// χειρισμό του σκηνικού ειδικά από την πλευρά του server.

log.print('Reading server "skiniko" module');
require('./skiniko.js');
require('./metavoli.js');

log.level.reset();

///////////////////////////////////////////////////////////////////////////////@

// Εμπλουτίζουμε με δομές και μεθόδους που αφορούν στη διαχείριση των αιτημάτων
// που υποβάλλουν οι clients.

log.print('Reading "request" module');
require('./request.js');

// Εμπλουτίζουμε με δομές και μεθόδους που αφορούν στον τρόπο με τον οποίο
// εκκινούν οι υπηρεσίες που παρέχει ο node server.

log.print('Reading "server" module');
require('./server.js');

// Εμπλουτίζουμε με δομές και μεθόδους που αφορούν στις υπηρεσίες που θα παρέχει
// ο Node server.

log.print('Reading "service" module');
require('./service.js');

// Αναπροσαρμόζουμε διάφορες παραμέτρους, στήνουμε το σκηνικό και μπαίνουμε
// σε κατάσταση ετοιμότητας. Όλα αυτά θα γίνουν αλυσιδωτά, εκκινώντας με το
// στήσιμο του σκηνικού και συνεχίζοντας με callbacks μέχρι το άνοιγμα της
// πόρτας υποδοχής αιτημάτων.

skiniko.stisimo();
