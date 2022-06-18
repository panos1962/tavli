\! [ -z "__SILENT__" ] && echo "[re]Creating database…"

DROP DATABASE IF EXISTS `__DATABASE__`
;

-- Με το παρόν κατασκευάζουμε την database.

CREATE DATABASE `__DATABASE__`
DEFAULT CHARSET = utf8mb4
DEFAULT COLLATE = utf8mb4_general_ci
;

\! [ -z "__SILENT__" ] && echo "Database created!"

-- Καθιστούμε τρέχουσα την database που μόλις κατασκευάσαμε.

USE `__DATABASE__`;

-- Ακυρώνουμε προσωρινά τα foreign key checks, όχι επειδή είναι απαραίτητο,
-- αλλά επειδή σε κάποιες μηχανές προκαλείται κάποια εμπλοκή.

SET FOREIGN_KEY_CHECKS = 0;

\! [ -z "__SILENT__" ] && echo "Creating tables…"

-- Ο πίνακας "pektis" είναι ο σημαντικότερος πίνακας της εφαρμογής και περιέχει
-- τους χρήστες του «Ταβλαδόρου».

CREATE TABLE `pektis` (
	`login`		VARCHAR(64) NOT NULL COMMENT 'Login name',
	`egrafi`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Ημερομηνία εγγραφής',
	`onoma`		VARCHAR(128) NOT NULL COMMENT 'Πλήρες όνομα παίκτη',
	`email`		VARCHAR(128) NULL DEFAULT NULL COMMENT 'e-mail address',

	-- Το password αποθηκεύεται σε SHA1 κρυπτογραφημένη μορφή.

	`kodikos`	CHARACTER(40) COLLATE utf8_bin NOT NULL COMMENT 'Password',

	`poll`		TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Τελευταία προσπέλαση του παίκτη',

	PRIMARY KEY (
		`login`
	) USING BTREE,

	INDEX (
		`onoma`
	) USING BTREE,

	INDEX (
		`email`
	) USING BTREE
)

ENGINE = InnoDB
COMMENT = 'Πίνακας παικτών'
;

-- Στον πίνακα "peparam" κρατάμε στοιχεία και χαρακτηριστικά που αφορούν στους χρήστες,
-- π.χ. αν ο παίκτης είναι επόπτης πρέπει να βρούμε μια παράμετρο με κλειδί τη
-- λέξη "ΑΞΙΩΜΑ" και τιμή "ΕΠΟΠΤΗΣ", αν κάποιος χρήστης έχει επιλέξει ως background
-- το "tetragona.jpg" θα πρέπει να υπάρχει παράμετρος με κλειδί τη λέξη "ΠΑΡΑΣΚΗΝΙΟ"
-- και τιμή "tetragona.jpg" κλπ.
--
--	ΑΞΙΩΜΑ		ΘΑΜΩΝΑΣ
--			VIP
--			ΕΠΟΠΤΗΣ
--			ΔΙΑΧΕΙΡΙΣΤΗΣ
--			ADMINISTRATOR
--			ΠΡΟΕΔΡΟΣ
--
--	ΚΑΤΑΣΤΑΣΗ	ΔΙΑΘΕΣΙΜΟΣ
--			ΑΠΑΣΧΟΛΗΜΕΝΟΣ
--
--	ΠΟΥΛΙΑ		ΑΣΠΡΑ
--			ΜΑΥΡΑ
--
--	ΑΠΟΔΟΣΗ		κάποιο string που δείχνει την απόδοση τού παίκτη
--			με κάποιον τρόπο που προς το παρόν είναι ασαφής.

CREATE TABLE `peparam` (
	`pektis`	VARCHAR(64) NOT NULL COMMENT 'Παίκτης',
	`param`		VARCHAR(32) NOT NULL COMMENT 'Παράμετρος',
	`timi`		TEXT(32768) NOT NULL COMMENT 'Τιμή παραμέτρου',

	PRIMARY KEY (
		`pektis`,
		`param`
	) USING BTREE
)

ENGINE = InnoDB
COMMENT = 'Παράμετροι παικτών'
;

-- Στον πίνακα "profinfo" περιέχονται πληροφορίες που αφορούν τους παίκτες.
-- Το πεδίο "pektis" είναι ο παίκτης στον οποίον αφορά η πληροφορία, ενώ το
-- πεδίο "sxoliastis" είναι ο συντάκτης.
--
-- Οι πληροφορία που δίνει ο παίκτης για τον εαυτό του είναι δημόσια, ενώ
-- όλες οι υπόλοιπες πληροφορίες είναι προσβάσιμες μόνο από τον εκάστοτε
-- σχολιαστή.

CREATE TABLE `profinfo` (
	`pektis`	VARCHAR(64) NOT NULL COMMENT 'Παίκτης',
	`sxoliastis`	VARCHAR(64) NOT NULL COMMENT 'Σχολιαστής',
	`kimeno`	TEXT(32768) NOT NULL COMMENT 'Κείμενο παρατήρησης',

	PRIMARY KEY (
		`pektis`,
		`sxoliastis`
	) USING BTREE,

	INDEX (
		`sxoliastis`
	) USING HASH
)

ENGINE = InnoDB
COMMENT = 'Πίνακας πληροφοριών προφίλ παίκτη'
;

-- Ο πίνακας "sxesi" περιέχει τις σχέσεις μεταξύ των παικτών. Η πληροφορία είναι
-- προσβάσιμη μόνο από τον παίκτη που καθορίζει τη σχέση.

CREATE TABLE `sxesi` (
	`pektis`	VARCHAR(64) NOT NULL COMMENT 'Login name του παίκτη',
	`sxetizomenos`	VARCHAR(64) NOT NULL COMMENT 'Login name του σχετιζόμενου παίκτη',
	`sxesi`	ENUM (
		'ΦΙΛΟΣ',
		'ΑΠΟΚΛΕΙΣΜΕΝΟΣ'
	) NOT NULL COMMENT 'Είδος σχέσης',

	PRIMARY KEY (
		`pektis`,
		`sxetizomenos`
	) USING BTREE,

	INDEX (
		`sxetizomenos`
	) USING HASH
)

ENGINE = InnoDB
COMMENT = 'Πίνακας σχέσεων'
;

-- Ο πίνακας "minima" περιέχει την αλληλογραφία των παικτών. Πράγματι, οι παίκτες,
-- εκτός από την άμεση επικοινωνία μέσω του chat, μπορούν να επικοινωνούν και με
-- προσωπικά μηνύματα τα οποία αποστέλλουν ο ένας στον άλλον.

CREATE TABLE `minima` (
	`kodikos`	INTEGER(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primary key',
	`apostoleas`	VARCHAR(64) NOT NULL COMMENT 'Αποστολέας',
	`paraliptis`	VARCHAR(64) NOT NULL COMMENT 'Παραλήπτης',
	`kimeno`	TEXT(32768) NOT NULL COMMENT 'Κείμενο μηνύματος',
	`pote`		TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Ημερομηνία αποστολής',
	`status`	ENUM (
		'ΑΔΙΑΒΑΣΤΟ',
		'ΔΙΑΒΑΣΜΕΝΟ'
	) NOT NULL DEFAULT 'ΑΔΙΑΒΑΣΤΟ' COMMENT 'Κατάσταση μηνύματος',

	PRIMARY KEY (
		`kodikos`
	) USING BTREE,

	INDEX (
		`apostoleas`
	) USING HASH,

	INDEX (
		`paraliptis`
	) USING HASH
)

ENGINE = InnoDB
COMMENT = 'Πίνακας μηνυμάτων αλληλογραφίας'
;

-- Ο πίνακας "trapezi" είναι ο σημαντικότερος πίνακας της εφαρμογής μετά τον πίνακα
-- "pektis". Ο πίνακας περιέχει όλα τα ενεργά τραπέζια καθώς και όλα τα τραπέζια που
-- δημιουργήθηκαν κατά καιρούς. Το πεδίο "arxio" είναι πολύ σημαντικό και δείχνει
-- ποια από τα τραπέζια είναι ενεργά και ποια έχουν αρχειοθετηθεί. Τα τραπέζια στα
-- οποία το πεδίο "arxio" είναι null είναι ενεργά, ενώ στα τραπέζια που το πεδίο
-- είναι συμπληρωμένο δείχνει τη στιγμή της αρχειοθέτησής τους.
--
-- Τα τραπέζια μπορούν, όμως, να αρχειοθετηθούν ακόμη και όταν υπάρχουν παίκτες
-- εφόσον έχει περάσει αρκετός χρόνος χωρίς κάποιος παίκτης του τραπεζιού να έχει
-- επαφή με τον server.

CREATE TABLE `trapezi` (
	`kodikos`	INTEGER(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primary key',
	`stisimo`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Πότε δημιουργήθηκε',

	`pektis1`	VARCHAR(64) NULL DEFAULT NULL COMMENT 'Πρώτος παίκτης',
	`apodoxi1`	ENUM(
		'ΟΧΙ',
		'ΝΑΙ'
	) NOT NULL DEFAULT 'ΟΧΙ' COMMENT 'Αποδοχή όρων από τον πρώτο παίκτη',

	`pektis2`	VARCHAR(64) NULL DEFAULT NULL COMMENT 'Δεύτερος παίκτης',
	`apodoxi2`	ENUM(
		'ΟΧΙ',
		'ΝΑΙ'
	) NOT NULL DEFAULT 'ΟΧΙ' COMMENT 'Αποδοχή όρων από τον δεύτερο παίκτη',

	`poll`		TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Last poll time',
	`arxio`		TIMESTAMP NULL DEFAULT NULL COMMENT 'Αρχειοθέτηση τραπεζιού',

	PRIMARY KEY (
		`kodikos`
	) USING BTREE,

	INDEX (
		`pektis1`
	) USING HASH,

	INDEX (
		`pektis1`
	) USING HASH,

	INDEX (
		`stisimo`
	) USING BTREE,

	INDEX (
		`arxio`
	) USING BTREE
)

ENGINE = InnoDB
COMMENT = 'Πίνακας τραπεζιών'
;

-- Στον πίνακα "trparam" κρατάμε στοιχεία και χαρακτηριστικά που αφορούν στο
-- τραπέζι και στην παρτίδα που εξελίσσεται στο τραπέζι, π.χ. την κάσα της
-- παρτίδας, το αν το τραπέζι είναι δημόσιο ή πριβέ κλπ.
--
--	ΠΟΡΤΕΣ		ΝΑΙ
--			ΟΧΙ
--
--	ΠΛΑΚΩΤΟ		ΝΑΙ
--			ΟΧΙ
--
--	ΦΕΥΓΑ		ΝΑΙ
--			ΟΧΙ
--

CREATE TABLE `trparam` (
	`trapezi`	INTEGER(10) UNSIGNED NOT NULL COMMENT 'Τραπέζι',
	`param`		VARCHAR(32) NOT NULL COMMENT 'Παράμετρος',
	`timi`		TEXT(32768) NOT NULL COMMENT 'Τιμή παραμέτρου',

	PRIMARY KEY (
		`trapezi`,
		`param`
	) USING BTREE
)

ENGINE = InnoDB
COMMENT = 'Παράμετροι τραπεζιών'
;

-- Ο πίνακας "simetoxi" περιέχει εγγραφές που δείχνουν την τελευταία θέση που
-- κατείχαν ή παρακολουθούσαν οι παίκτες στα τραπέζια στα οποία συμμετείχαν
-- είτε ως παίκτες, είτε ως θεατές.
--
-- Πρόκειται για βοηθητικό πίνακα ο οποίος εξυπηρετεί μόνον τρέχουσες ανάγκες
-- αναφοράς όσο το τραπέζι είναι ενεργό. Μόλις το τραπέζι αρχειοθετηθεί, τα
-- στοιχεία του πίνακα "simetoxi" για το εν λόγω τραπέζι καθίστανται άχρηστα
-- και πρέπει να διαγραφούν.
--
-- Ουσιαστικά ο πίνακας χρησιμεύει στο να γνωρίζουμε σε ποια θέση συμμετείχε
-- κάποιος παίκτης σε κάποιο τραπέζι την τελευταία φορά που συμμετείχε στο
-- συγκεκριμένο τραπέζι, δηλαδή δίνουμε τραπέζι και παίκτη και επιστρέφεται
-- η θέση στην οποία συμμετείχε την τελευταία φορά σ' αυτό το τραπέζι.

CREATE TABLE `simetoxi` (
	`trapezi`	INTEGER(10) UNSIGNED NOT NULL COMMENT 'Κωδικός τραπεζιού',
	`pektis`	VARCHAR(64) NULL DEFAULT NULL COMMENT 'Login name παίκτη/θεατή',
	`thesi`		TINYINT(1) NOT NULL COMMENT 'Αριθμός θέσης',

	UNIQUE (
		`trapezi`,
		`pektis`
	) USING BTREE
)

ENGINE = InnoDB
COMMENT = 'Πίνακας συμμετοχών'
;

-- Ο πίνακας "telefteos" περιέχει εγγραφές που δείχνουν ποιος παίκτης κάθησε
-- τελευταίος σε κάθε θέση του τραπεζιού.
--
-- Πρόκειται για βοηθητικό πίνακα ο οποίος εξυπηρετεί μόνον τρέχουσες ανάγκες
-- αναφοράς όσο το τραπέζι είναι ενεργό. Μόλις το τραπέζι αρχειοθετηθεί, τα
-- στοιχεία του πίνακα "telefteos" για το εν λόγω τραπέζι καθίστανται άχρηστα
-- και πρέπει να διαγραφούν.
--
-- Ουσιαστικά ο πίνακας χρησιμεύει στο να γνωρίζουμε ποιος κάθισε τελευταίος
-- ως παίκτης σε κάθε θέση του τραπεζιού, δηλαδή δίνουμε τραπέζι και θέση και
-- επιστρέφεται ο παίκτης που κάθισε τελευταίος στη συγκεκριμένη θέση.

CREATE TABLE `telefteos` (
	`trapezi`	INTEGER(10) UNSIGNED NOT NULL COMMENT 'Κωδικός τραπεζιού',
	`thesi`		TINYINT(1) NOT NULL COMMENT 'Αριθμός θέσης',
	`pektis`	VARCHAR(64) NULL DEFAULT NULL COMMENT 'Login name παίκτη',

	PRIMARY KEY (
		`trapezi`,
		`thesi`
	) USING BTREE,

	INDEX (
		`pektis`
	) USING HASH
)

ENGINE = InnoDB
COMMENT = 'Πίνακας τελευταίων παικτών τραπεζιού'
;

-- Ο πίνακας προσκλήσεων περιέχει τις προσκλήσεις που αποστέλλονται μεταξύ
-- των παικτών. Για να παίξει κάποιος παίκτης σε κάποιο τραπέζι πρέπει να
-- λάβει πρόσκληση από κάποιον από τους ήδη υπάρχοντες παίκτες. Πρόσκληση,
-- επίσης, χρειάζεται κάποιος για να παρακολουθήσει σε πριβέ τραπέζι.
--
-- Ο πίνακας δεν χρήζει primary key καθώς υπάρχει μοναδικός συνδυασμός
-- πεδίων που θα μπορούσε να εξυπηρετήσει ως primary key, αλλά η εισαγωγή
-- ξέχωρου αριθμητικού primary key διευκολύνει κατά πολύ αρκετούς χειρισμούς.

CREATE TABLE `prosklisi` (
	`kodikos`	INTEGER(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primary key',
	`trapezi`	INTEGER(10) UNSIGNED NOT NULL COMMENT 'Κωδικός τραπεζιού',
	`apo`		VARCHAR(64) NOT NULL COMMENT 'Οικοδεσπότης',
	`pros`		VARCHAR(64) NOT NULL COMMENT 'Προσκεκλημένος',
	`epidosi`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Πότε επιδόθηκε',

	PRIMARY KEY (
		`kodikos`
	) USING BTREE,

	UNIQUE INDEX (
		`trapezi`,
		`apo`,
		`pros`
	) USING BTREE,

	INDEX (
		`apo`
	) USING HASH,

	INDEX (
		`pros`
	) USING HASH
)

ENGINE = InnoDB
COMMENT='Πίνακας προσκλήσεων'
;

-- Ο πίνακας αποκλεισμών παρτίδας περιέχει τους αποκλεισμούς συγκεκριμένων
-- προσώπων από συγκεκριμένες παρτίδες.

CREATE TABLE `arvila` (
	`trapezi`	INTEGER(10) UNSIGNED NOT NULL COMMENT 'Κωδικός τραπεζιού',
	`apo`		VARCHAR(64) NOT NULL COMMENT 'Παίκτης',
	`pros`		VARCHAR(64) NOT NULL COMMENT 'Αποκλεισμένος',

	UNIQUE INDEX (
		`trapezi`,
		`pros`
	) USING BTREE
)

ENGINE = InnoDB
COMMENT='Πίνακας αποκλεισμών παρτίδας'
;

-- Ο πίνακας "sizitisi" περιέχει όλα τα σχόλια των συζητήσεων που εξελίσσονται
-- στα τραπέζια ή στο καφενείο.

CREATE TABLE `sizitisi` (
	`kodikos`	INTEGER(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primary key',
	`pektis`	VARCHAR(64) NOT NULL COMMENT 'Ομιλών παίκτης',

	-- Αν ο κωδικός τραπεζιού είναι κενός, τότε πρόκειται για σχόλιο
	-- που αφορά στη συζήτηση του καφενείου.

	`trapezi`	INTEGER(10) UNSIGNED NULL COMMENT 'Κωδικός τραπεζιού',

	`sxolio`	TEXT(32768) NOT NULL COMMENT 'Κείμενο σχολίου',
	`pote`		TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Πότε ειπώθηκε',

	PRIMARY KEY (
		`kodikos`
	) USING BTREE,

	INDEX (
		`pektis`
	) USING HASH,

	INDEX (
		`trapezi`
	) USING HASH
)

ENGINE = InnoDB
COMMENT = 'Πίνακας συζητήσεων'
;

-- Με το παρόν κατασκευάζουμε τον πίνακα των παιχνιδιών. Κάθε τραπέζι έχει πολλά
-- παιχνίδια που απαρτίζουν την παρτίδα που παίχτηκε στο τραπέζι και κάθε παιχνίδι
-- έχει πολλές ενέργειες που είναι όλες οι κινήσεις που γίνονται στο παιχνίδι.

CREATE TABLE `pexnidi` (
	`kodikos`	INTEGER(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primary key',
	`trapezi`	INTEGER(10) UNSIGNED NOT NULL COMMENT 'Κωδικός τραπεζιού',
	`enarxi`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Στήσιμο παιχνιδιού',
	`idos`		ENUM(
		'ΠΟΡΤΕΣ',
		'ΠΛΑΚΩΤΟ',
		'ΦΕΥΓΑ'
	) NOT NULL DEFAULT 'ΠΟΡΤΕΣ' COMMENT 'Είδος παιχνιδιού',

	`protos`	TINYINT(1) NOT NULL COMMENT 'Ποιος παίζει πρώτος',
	`nikitis`	TINYINT(1) NOT NULL COMMENT 'Ποιος κέρδισε το παιχνίδι',
	`diplo`		ENUM (
		'ΟΧΙ',
		'ΝΑΙ'
	) NOT NULL DEFAULT 'ΟΧΙ' COMMENT 'Είναι ΝΑΙ στα διπλά κερδισμένα παιχνίδια',

	-- Το πεδίο "telos" είναι το timestamp του τέλους τού παιχνιδιού.
	-- Όσο το πεδίο "telos" παραμένει null, το παιχνίδι βρίσκεται σε
	-- εξέλιξη.

	`telos`		TIMESTAMP NULL DEFAULT NULL COMMENT 'Τέλος παιχνιδιού',

	PRIMARY KEY (
		`kodikos`
	) USING BTREE,

	INDEX (
		`trapezi`
	) USING HASH
)

ENGINE = InnoDB
COMMENT = 'Πίνακας παιχνιδιών'
;

-- Ο πίνακας "energia" περιέχει τις ενέργειες που γίνονται στα τραπέζια. Κάθε ενέργεια
-- εντάσσεται στα πλαίσια κάποιου παιχνιδιού και κάθε παιχνίδι εντάσσεται σε κάποιο τραπέζι.

CREATE TABLE `energia` (
	`kodikos`	INTEGER(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primary key',
	`pexnidi`	INTEGER(10) UNSIGNED NOT NULL COMMENT 'Κωδικός παιχνιδιού',
	`pektis`	TINYINT(1) NOT NULL COMMENT 'Θέση παίκτη που εκτελεί την ενέργεια',

	`idos`	ENUM (
		'ΖΑΡΙΑ',
		'ΠΑΙΞΙΜΟ',
		'ΜΟΝΟ',
		'ΔΙΠΛΟ'
	) NOT NULL COMMENT 'Είδος ενέργειας',

	-- Το πεδίο "data" περιέχει τα δεδομένα της ενέργειας και έχουν συγκεκριμένο
	-- συντακτικό και περιεχόμενο, ανάλογα με το είδος της ενέργειας.
	--
	-- Παραθέτουμε δείγματα από διάφορα είδη ενεργειών:
	--
	--	ΖΑΡΙΑ		53 (είναι η ζαριά πέντε τρία)
	--	ΠΑΙΞΙΜΟ		8:5:13:3 (το πούλι 8 παίζει 5 και το πούλι 13 παίζει 3)
	--	ΜΟΝΟ		(το αφήνω μονό)
	--	ΔΙΠΛΟ		(το αφήνω διπλό)

	`data`		VARCHAR(64) NOT NULL COMMENT 'Δεδομένα ενέργειας',

	`pote`		TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Χρονική στιγμή',

	PRIMARY KEY (
		`kodikos`
	) USING BTREE,

	INDEX (
		`pexnidi`
	) USING HASH
)

ENGINE = InnoDB
COMMENT ='Πίνακας ενεργειών'
;

-- Ο πίνακας "sinedria" περιέχει τους ενεργούς παίκτες. Για κάθε χρήστη που εισέρχεται
-- στο καφενείο δημιουργείται ένα record συνεδρίας και με βάση το record αυτό γίνεται
-- η περαιτέρω επικοινωνία του χρήστη με τον server.
--
-- Όταν η συνεδρία λήξει, τότε αρχειοθετείται στον πίνακα "istoriko". Η λήξη μιας
-- συνεδρίας γίνεται είτε όταν ο παίκτης εξέλθει ρητά από το καφενείο, είτε όταν
-- περάσει αρκετός χρόνος χωρίς επαφή του χρήστη με τον server.

CREATE TABLE `sinedria` (
	-- Κάθε συνεδρία έχει ως πρωτεύον στοιχείο της το login name τού παίκτη,
	-- το οποίο μάλιστα χρησιμοποιείται ως primary key.

	`pektis`	VARCHAR(64) NOT NULL COMMENT 'Παίκτης',

	-- Το πεδίο "klidi" είναι string 10 χαρακτήρων και δημιουργείται αυτόματα
	-- κατά την εισαγωγή του record στην database, δηλαδή με την είσοδο ή την
	-- εγγραφή του παίκτη. Το κλειδί αποθηκεύεται σε cookie και χρησιμοποιείται
	-- κατόπιν για την πιστοποίηση των κλήσεων Ajax προς τον Node server.

	`klidi`		CHARACTER(10) NOT NULL COMMENT 'Κλειδί πιστοποίησης',

	-- Στο πεδίο "IP" κρατάμε την IP του client από τον οποίο δημιουργήθηκε η
	-- συνεδρία. Όσον αφορά στο μέγεθος της IP, ειδωμένης ως character string
	-- και όχι ως bit sequence, το θέμα έχει περιπλακεί μετά την εισαγωγή τής
	-- IPv6. Σε διάφορα blogs αναφέρονται διάφορες τιμές για το σωστό μήκος
	-- μιας IP address, π.χ. 39, 45 κλπ, επομένως μια τιμή 64 χαρακτήρων πρέπει
	-- να με καλύπτει.

	`ip`		VARCHAR(64) NOT NULL DEFAULT '' COMMENT 'IP address',

	`isodos`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Είσοδος',

	-- Το πεδίο "poll" δείχνει την τελευταία επαφή τού παίκτη με τον server στα
	-- πλαίσια της συγκεκριμένης συνεδρίας.

	`poll`		TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Τελευταία επαφή',

	-- Τα παρακάτω στοιχεία ονομάζονται στοιχεία θέσης. Πρόκειται για το τρέχον
	-- τραπέζι του παίκτη/θεατή, για τη θέση στην οποία παίζει/παρακολουθεί και
	-- για το αν συμμετέχει ως παίκτης ή ως θεατής.

	`trapezi`	INTEGER(10) UNSIGNED NULL DEFAULT NULL COMMENT 'Τρέχον τραπέζι παίκτη',
	`thesi`		TINYINT(1) NULL DEFAULT NULL COMMENT 'Θέση παίκτη/θεατή',
	`simetoxi`	ENUM (
		'ΠΑΙΚΤΗΣ',
		'ΘΕΑΤΗΣ'
	) NULL DEFAULT NULL COMMENT 'Τρόπος συμμετοχής',

	PRIMARY KEY (
		`pektis`
	) USING BTREE,

	INDEX (
		`trapezi`
	) USING HASH
)

ENGINE = InnoDB
COMMENT = 'Πίνακας συνεδριών'
;

-- Ο πίνακας "istoriko" αρχειοθετεί τις συνεδρίες που κλείνουν.

CREATE TABLE `istoriko` (
	`kodikos`	INTEGER(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primary key',
	`pektis`	VARCHAR(64) NOT NULL COMMENT 'Παίκτης',
	`ip`		VARCHAR(64) NOT NULL DEFAULT '' COMMENT 'IP address',
	`isodos`	TIMESTAMP NOT NULL COMMENT 'Είσοδος',
	`exodos`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Έξοδος',

	PRIMARY KEY (
		`kodikos`
	) USING BTREE,

	INDEX (
		`pektis`
	) USING HASH
)

ENGINE = InnoDB
COMMENT ='Πίνακας συνεδριών (αρχείο)'
;

COMMIT WORK
;

\! [ -z "__SILENT__" ] && echo "Tables created!"

\! [ -z "__SILENT__" ] && echo "Creating relations…"

-- Στο παρόν παρατίθενται όλα τα foreign keys, δηλαδή οι συσχετίσεις
-- μεταξύ των πινάκων τής database.

-- Πίνακας παραμέτρων παίκτη ("peparam")

ALTER TABLE `peparam` ADD FOREIGN KEY (
	`pektis`
) REFERENCES `pektis` (
	`login`
) ON UPDATE CASCADE ON DELETE CASCADE
;

-- Πίνακας πληροφοριών προφίλ ("profinfo")

ALTER TABLE `profinfo` ADD FOREIGN KEY (
	`pektis`
) REFERENCES `pektis` (
	`login`
) ON UPDATE CASCADE ON DELETE CASCADE
;

ALTER TABLE `profinfo` ADD FOREIGN KEY (
	`sxoliastis`
) REFERENCES `pektis` (
	`login`
) ON UPDATE CASCADE ON DELETE CASCADE
;

-- Πίνακας σχέσεων ("sxesi")

ALTER TABLE `sxesi` ADD FOREIGN KEY (
	`pektis`
) REFERENCES `pektis` (
	`login`
) ON UPDATE CASCADE ON DELETE CASCADE
;

ALTER TABLE `sxesi` ADD FOREIGN KEY (
	`sxetizomenos`
) REFERENCES `pektis` (
	`login`
) ON UPDATE CASCADE ON DELETE CASCADE
;

-- Πίνακας μηνυμάτων ("minima")

ALTER TABLE `minima` ADD FOREIGN KEY (
	`apostoleas`
) REFERENCES `pektis` (
	`login`
) ON UPDATE CASCADE ON DELETE CASCADE
;

ALTER TABLE `minima` ADD FOREIGN KEY (
	`paraliptis`
) REFERENCES `pektis` (
	`login`
) ON UPDATE CASCADE ON DELETE CASCADE
;

-- Πίνακας τραπεζιών ("trapezi")

ALTER TABLE `trapezi` ADD FOREIGN KEY (
	`pektis1`
) REFERENCES `pektis` (
	`login`
) ON UPDATE CASCADE
;

ALTER TABLE `trapezi` ADD FOREIGN KEY (
	`pektis2`
) REFERENCES `pektis` (
	`login`
) ON UPDATE CASCADE
;

-- Πίνακας παραμέτρων τραπεζιού ("trparam")

ALTER TABLE `trparam` ADD FOREIGN KEY (
	`trapezi`
) REFERENCES `trapezi` (
	`kodikos`
) ON UPDATE CASCADE ON DELETE CASCADE
;

-- Πίνακας συμμετοχών ("simetoxi")

ALTER TABLE `simetoxi` ADD FOREIGN KEY (
	`trapezi`
) REFERENCES `trapezi` (
	`kodikos`
) ON UPDATE CASCADE ON DELETE CASCADE
;

ALTER TABLE `simetoxi` ADD FOREIGN KEY (
	`pektis`
) REFERENCES `pektis` (
	`login`
) ON UPDATE CASCADE ON DELETE CASCADE
;

-- Πίνακας συμμετεχόντων παικτών ("telefteos")

ALTER TABLE `telefteos` ADD FOREIGN KEY (
	`trapezi`
) REFERENCES `trapezi` (
	`kodikos`
) ON UPDATE CASCADE ON DELETE CASCADE
;

ALTER TABLE `telefteos` ADD FOREIGN KEY (
	`pektis`
) REFERENCES `pektis` (
	`login`
) ON UPDATE CASCADE ON DELETE CASCADE
;

-- Πίνακας προσκλήσεων ("prosklisi")

ALTER TABLE `prosklisi` ADD FOREIGN KEY (
	`trapezi`
) REFERENCES `trapezi` (
	`kodikos`
) ON UPDATE CASCADE ON DELETE CASCADE
;

ALTER TABLE `prosklisi` ADD FOREIGN KEY (
	`apo`
) REFERENCES `pektis` (
	`login`
) ON UPDATE CASCADE ON DELETE CASCADE
;

ALTER TABLE `prosklisi` ADD FOREIGN KEY (
	`pros`
) REFERENCES `pektis` (
	`login`
) ON UPDATE CASCADE ON DELETE CASCADE
;

-- Πίνακας αποκλεισμών παρτίδας ("arvila")

ALTER TABLE `arvila` ADD FOREIGN KEY (
	`trapezi`
) REFERENCES `trapezi` (
	`kodikos`
) ON UPDATE CASCADE ON DELETE CASCADE
;

-- Πίνακας παιχνιδιών ("pexnidi")

ALTER TABLE `pexnidi` ADD FOREIGN KEY (
	`trapezi`
) REFERENCES `trapezi` (
	`kodikos`
) ON UPDATE CASCADE ON DELETE CASCADE
;

-- Πίνακας ενεργειών ("energia")

ALTER TABLE `energia` ADD FOREIGN KEY (
	`pexnidi`
) REFERENCES `pexnidi` (
	`kodikos`
) ON UPDATE CASCADE ON DELETE CASCADE
;

-- Πίνακας συνεδριών ("sinedria")

ALTER TABLE `sinedria` ADD FOREIGN KEY (
	`pektis`
) REFERENCES `pektis` (
	`login`
) ON UPDATE CASCADE ON DELETE CASCADE
;

ALTER TABLE `sinedria` ADD FOREIGN KEY (
	`trapezi`
) REFERENCES `trapezi` (
	`kodikos`
) ON UPDATE CASCADE
;

-- Ιστορικό συνεδριών ("istoriko")

ALTER TABLE `istoriko` ADD FOREIGN KEY (
	`pektis`
) REFERENCES `pektis` (
	`login`
) ON UPDATE CASCADE ON DELETE CASCADE
;

-- Πίνακας συζητήσεων ("sizitisi")

ALTER TABLE `sizitisi` ADD FOREIGN KEY (
	`pektis`
) REFERENCES `pektis` (
	`login`
) ON UPDATE CASCADE ON DELETE CASCADE
;

ALTER TABLE `sizitisi` ADD FOREIGN KEY (
	`trapezi`
) REFERENCES `trapezi` (
	`kodikos`
) ON UPDATE CASCADE ON DELETE CASCADE
;

COMMIT WORK
;

\! [ -z "__SILENT__" ] && echo "Relations created!"

\! [ -z "__SILENT__" ] && echo "Creating views…"

-- Το view "partida" περιλαμβάνει τα ενεργά τραπέζια, δηλαδή τις παρτίδες
-- που βρίσκονται σε εξέλιξη.

CREATE VIEW `partida` AS SELECT *
FROM `trapezi`
WHERE `arxio` IS NULL
ORDER BY `kodikos` DESC
;

COMMIT WORK
;

\! [ -z "__SILENT__" ] && echo "Views created!"

-- Επαναφέρουμε την προσωρινή ακύρωση του foreign key check.

SET FOREIGN_KEY_CHECKS = 1;

\! [ -z "__SILENT__" ] && echo "[re]Creating users…"

DROP USER IF EXISTS '__DBUSER__'@'localhost'
;

CREATE USER '__DBUSER__'@'localhost' IDENTIFIED BY '__DBPASS__'
;

COMMIT WORK
;

\! [ -z "__SILENT__" ] && echo "Users created…"

\! [ -z "__SILENT__" ] && echo "Granting permissions…"

GRANT SELECT, INSERT, UPDATE, DELETE
ON `__DATABASE__`.* TO '__DBUSER__'@'localhost'
;

COMMIT WORK
;

\! [ -z "__SILENT__" ] && echo "Permissions granted…"
