<?php
define("ILIKIA_MINIMUM", 18);

define("GRAMATA_MASK", "a-zA-Z" .
	"αβγδεζηθικλμνξοπρστυφχψω" .
	"ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ" .
	"άέήίόύώϊϋΐΰς" .
	"ΆΈΉΊΌΎΏΪΫ");
define("AKINDINA_MASK", "!@#$%*._+=-");
define("LOGIN_MASK", "^[a-zA-Z][a-zA-Z0-9" . AKINDINA_MASK . "]*$");
define("ONOMA_MASK", "^[" . GRAMATA_MASK . "][0-9 " . GRAMATA_MASK . AKINDINA_MASK . "]*$");

class Globals {
	private static $init_ok = FALSE;
	public static $base_dir;
	public static $db;

	public static function cleanup() {
		if (self::$db)
		self::$db->close();
	}

	public static function init() {
		if (self::$init_ok)
		return;

		self::$init_ok = TRUE;

		register_shutdown_function('Globals::cleanup');

		self::$base_dir = getenv("TAVLI_BASEDIR");

		if (!self::$base_dir)
		self::$base_dir = preg_replace("/\/common\/lib\/standard.php$/", "", __FILE__);

		$dbconf_file = self::$base_dir . "/local/db.cf";
		$dbconf = file_get_contents($dbconf_file);

		if (!$dbconf)
		self::fatal($dbconf_file . ": cannot read file");

		$dbconf = json_decode($dbconf);

		if (!$dbconf)
		self::fatal($dbconf_file . ": configuration error");

		self::$db = new mysqli("localhost", $dbconf->dbuser,
			$dbconf->dbpass, $dbconf->dbname);

		$charset = "utf8mb4";

		if (!self::$db->set_charset($charset))
		self::fatal($charset . ": cannot set character set");
	}

	public static function query($query) {
		$result = self::$db->query($query, MYSQLI_USE_RESULT);

		if (!$result)
		self::fatal($query . ": SQL error");

		return $result;
	}

	public static function affected_rows() {
		return self::$db->affected_rows;
	}

	public static function sql_string($s, $quote = "'") {
		return $quote . self::$db->real_escape_string($s) . $quote;
	}

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

		return filter_var($email, FILTER_VALIDATE_EMAIL);
	}

	public static function invalid_email($email) {
		return (!self::valid_email($email));
	}

	public static function json_encode($x) {
		return json_encode($x, JSON_UNESCAPED_UNICODE);
	}

	public static function fatal($msg) {
		if (!$msg)
		$msg = "generic error";

		print $msg;
		exit(2);
	}
}

Globals::init();
?>
