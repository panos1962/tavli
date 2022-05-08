<?php
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

	public static function fatal($msg) {
		if (!$msg)
		$msg = "generic error";

		print $msg;
		exit(2);
	}
}

Globals::init();
?>
