<?php
///////////////////////////////////////////////////////////////////////////////@
//
// Το παρόν αρχείο περιέχει χρήσιμες δομές και functions για PHP προγράμματα
// που έχουν εφαρμογή τόσο σε αυτόνομα προγράμματα, όσο και σε ιστοσελίδες
// της εφαρμογής.
//
///////////////////////////////////////////////////////////////////////////////@

// Η συμβολική σταθερά "ILIKIA_MINIMUM" είναι το ελάχιστο όριο ηλικίας που
// απαιτείται για την εγγραφή στον «Ταβλαδόρο».

define("ILIKIA_MINIMUM", 18);

// Ακολουθούν διάφορες μάσκες που χρησιμοποιούνται στην κατασκευή των regular
// expressions που ελέγχουν την ορθότητα στοιχείων, π.χ. login names, emails
// κλπ. Παρόμοιες μάσκες υπάρχουν και στην javascript, οπότε εκεί που υπάρχει
// αλληλεπίδραση γίνεται έλεγχος προκειμένου να είμαστε σίγουροι ότι οι ίδιοι
// έλεγχοι ισχύουν παντού.

define("GRAMATA_MASK", "a-zA-Z" .
	"αβγδεζηθικλμνξοπρστυφχψω" .
	"ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ" .
	"άέήίόύώϊϋΐΰς" .
	"ΆΈΉΊΌΎΏΪΫ");
define("AKINDINA_MASK", "!@#$%*._+=-");
define("LOGIN_MASK", "^[a-zA-Z][a-zA-Z0-9" . AKINDINA_MASK . "]*$");
define("ONOMA_MASK", "^[" . GRAMATA_MASK . "][0-9 " . GRAMATA_MASK . AKINDINA_MASK . "]*$");
define("EMAIL_MASK", "^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$");

// Το singleton "Globals" χρησιμοποιείται ως name space για τα global
// αντικείμενα που χρησιμοποιούμε από την πλευρά της PHP. Ουσιαστικά
// πρόκειται για global μεταβλητές και functions γενικής χρήσης.

class Globals {
	// Η μεταβλητή "init_ok" είναι flag που δείχνει αν έχει τρέξει ήδη
	// η function "init" που είναι απαραίτητη στην αρχή οποιουδήποτε
	// PHP προγράμματος.

	private static $init_ok = FALSE;

	// Η μεταβλητή "base_dir" δείχνει το full pathname του directory στο
	// οποίο είναι εγκατεστημένα τα προγράμματα της εφαρμογής, π.χ.
	//
	//	/var/opt/tavli

	public static $base_dir;

	public static $conf;

	// Η μεταβλητή "db" είναι ο database connector και χρησιμοποιείται
	// όποτε υπάρχει ανάγκη χρήσης της database. Ωστόσο, η σύνδεση με
	// την database γίνεται ήδη από την αρχή και όχι όταν παραστεί
	// ανάγκη χρήσης της database.

	public static $db;

	// Η function "cleanup" καλείται λίγο πριν το τέλος όλων των PHP
	// προγραμμάτων και σκοπό έχει κυρίως το κλείσιμο της σύνδεσης με
	// την database.

	public static function cleanup() {
		if (self::$db)
		self::$db->close();
	}

	// Η function "init" καλείται στην αρχή όλων των PHP προγραμμάτων
	// και μεταξύ άλλων προκαταρκτικών ενεργειών, επιεχειρεί σύνδεση
	// με την database.

	public static function init() {
		if (self::$init_ok)
		return;

		self::$init_ok = TRUE;

		// Φροντίζουμε για το κλείσιμο της database και για άλλες
		// χρήσιμες ενέργειες που πρέπει να γίνουν στο τέλος όλων
		// των PHP προγραμμάτων της εφαρμογής.

		register_shutdown_function('Globals::cleanup');

		// Είναι η στιγμή να θέσουμε την μεταβλητή "base_dir" η οποία
		// δείχνει το full pathname του directory στο οποίο είναι
		// εγκατεστημένα τα προγράμματα της εφαρμογής.

		// Αρχικά επιχειρούμε να πάρουμε το "base_dir" από την
		// environment variable "TAVLI_BASEDIR".

		self::$base_dir = getenv("TAVLI_BASEDIR");

		// Αν δεν έχει τεθεί η συγκεκριμένη environment variable,
		// θέτουμε το "base_dir" από το παρόν source file.

		if (!self::$base_dir)
		self::$base_dir = preg_replace("/\/common\/lib\/standard.php$/", "", __FILE__);

		// Είναι η στιγμή να αποκαταστήσουμε σύνδεση με την database
		// της εφαρμογής. Τα credenrtials που θα χρησιμοποιήσουμε για
		// τη σύνδεση με την database βρίσκονται αποθηκευμένα σε μορφή
		// json στον αρχείο "conf.cf" στο directory "local" της
		// εφαρμογής. Θυμίζουμε ότι σε αυτό το directory υπάρχουν
		// per site αρχεία που δεν μετέχουν στο repository της
		// εφαρμογής.

		$conf_file = self::$base_dir . "/local/conf.cf";
		self::$conf = file_get_contents($conf_file);

		if (!self::$conf)
		self::fatal($conf_file . ": cannot read file");

		self::$conf = json_decode(self::$conf);

		if (!self::$conf)
		self::fatal($conf_file . ": configuration error");

		// Επιχειρούμε τώρα τη σύνδεση με την database της εφαρμογής.

		self::$db = new mysqli("localhost", self::$conf->dbuser,
			self::$conf->dbpass, self::$conf->dbname);

		if (self::$db->connect_errno)
		self::fatal("database connection error");

		// Θέτουμε το database character set (encoding).

		$charset = "utf8mb4";
		self::$db->set_charset($charset);

		if (self::$db->errno)
		self::fatal($charset . ": cannot set database character set");
	}

	// Η function "query" δέχεται ως παράμετρο ένα SQL query και
	// επιχειρεί να το εκτελέσει. Επιστρέφει το αποτέλεσμα το οποίο
	// μπορούμε να το διαχειρστούμε αργότερα. Σε περίπτωση αδυναμίας
	// εκτέλεσης του query το πρόγραμμα σταματά.

	public static function query($query) {
		$result = self::$db->query($query, MYSQLI_USE_RESULT);

		if (!$result)
		self::fatal($query . ": SQL error");

		return $result;
	}

	// Η function "affected_rows" επιστρέφει το πλήθος των affected
	// rows μετά την εκτέλεση κάποιου query.

	public static function affected_rows() {
		return self::$db->affected_rows;
	}

	// Η function "sql_string" δέχεται ένα string και το επιστρέφει
	// έτσι ώστε να μπορεί να ενταχθεί σε SQL script. Ως δεύτερη
	// παράμετρο μπορούμε να περάσουμε το quote character το οποίο
	// by default είναι το single quote. Αν επιθυμούμε να επιστραφεί
	// το string χωρίς τα εξωτερικά quotes, μπορούμε να περάσουμε
	// ως δεύτερη παράμετρο FALSE ή το κενό string.

	public static function sql_string($s, $quote = "'") {
		if ($quote === FALSE)
		$quote = "";

		return $quote . self::$db->real_escape_string($s) . $quote;
	}

	// Ακολουθούν function ελέγχου ορθότητας διαφόρων πραγμάτων, π.χ.
	// login names, emails κλπ.

	public static function valid_login($login) {
		if (!isset($login))
		return FALSE;

		return preg_match("/" . LOGIN_MASK . "/", $login);
	}

	public static function invalid_login($login) {
		return (!self::valid_login($login));
	}

	public static function valid_onoma($onoma) {
		if (!isset($onoma))
		return FALSE;

		return preg_match("/" . ONOMA_MASK . "/", $onoma);
	}

	public static function invalid_onoma($onoma) {
		return (!self::valid_onoma($onoma));
	}

	public static function valid_email($email) {
		if (!isset($email))
		return FALSE;

		return preg_match("/" . EMAIL_MASK . "/", $email);
	}

	public static function invalid_email($email) {
		return (!self::valid_email($email));
	}

	// Η function "json_encode" δέχεται ως παράμετρο ένα string και
	// το επιστρέφει έτσι ώστε να μπορεί να ενταχθεί σε json objects.

	public static function json_encode($x) {
		return json_encode($x, JSON_UNESCAPED_UNICODE);
	}

	// Η function "fatal" δέχεται ως παράμετρο ένα μήνυμα λάθους το
	// οποίο εκτυπώνει και διακόπτει το πρόγραμμα με exit status 2.

	public static function fatal($msg) {
		if (!$msg)
		$msg = "generic error";

		print $msg;
		exit(2);
	}
}

// Στο σημείο αυτό εκτελούμε την "init" function και αυτό συμβαίνει σε όλα
// τα προγράμματα εφόσον έχει συμπεριληφθεί, άμεσα ή έμμεσα, το ανά χείρας
// αρχείο.

Globals::init();

class Pektis {
	public $login;
	public $egrafi;
	public $onoma;
	public $email;
	public $kodikos;
	public $poll;
	public $peparam;

	public function __construct($login = NULL) {
		$this->clear();

		if (isset($login))
		$this->fetch($login);
	}

	public function clear() {
		$this->login = NULL;
		$this->egrafi = NULL;
		$this->onoma = NULL;
		$this->email = NULL;
		$this->kodikos = NULL;
		$this->poll = NULL;
		$this->peparam = NULL;

		return $this;
	}

	public function is_pektis() {
		return isset($this->login);
	}

	public function oxi_pektis() {
		return !$this->is_pektis();
	}

	public function fetch($login) {
		$query = "SELECT * FROM `pektis` WHERE `login` = " .
			Globals::sql_string($login);

		$result = Globals::query($query);
		$pektis = $result->fetch_assoc();
		$result->close();

		if (!$pektis)
		return $this->clear();

		foreach ($pektis as $key => $val)
		$this->$key = $val;

		return $this;
	}

	public function fetch_peparam() {
		if ($this->oxi_pektis()) {
			$this->peparam = NULL;
			return $this;
		}

		$this->peparam = [];

		$query = "SELECT `param`, `timi` FROM `peparam` " .
			"WHERE `pektis` = " . Globals::sql_string($this->login);

		$result = Globals::query($query);

		while ($peparam = $result->fetch_assoc()) {
			foreach ($peparam as $key => $val)
			$this->peparam[$key] = $val;
		}

		$result->close();

		return $this;
	}
}
?>
