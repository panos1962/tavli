<?php
require_once("../lib/selida.php");
Selida::content_json();
Selida::xristis_unset();

Isodos::data_check();
Isodos::error_check();

Isodos::xristis_check();
Isodos::error_check();

$_SESSION[SESSION_XRISTIS] = $_POST["login"];
$_SESSION[SESSION_KLIDI] = Globals::random_string(KLIDI_LENGTH);

print Globals::json_encode(array("login" => $_SESSION[SESSION_XRISTIS]));

class Isodos {
	public static $error = NULL;

	public static function data_check() {
		if (Selida::oxi_post("login"))
		return self::error_set([
			"pedio" => "login",
			"minima" => "Δεν περάστηκε login name χρήστη"
		]);

		if (Globals::invalid_login($_POST["login"]))
		return self::error_set([
			"pedio" => "login",
			"minima" => "Μη αποδεκτό login name χρήστη"
		]);

		if (Selida::oxi_post("kodikos"))
		return self::error_set([
			"pedio" => "kodikos",
			"minima" => "Δεν περάστηκε κωδικός χρήστη"
		]);

		return __CLASS__;
	}

	public static function xristis_check() {
		$found = FALSE;

		$query = "SELECT 1 FROM `pektis` WHERE " .
			"(`login` = " . Globals::sql_string($_POST["login"]) . ") AND " .
			"(`kodikos` = " . Globals::sql_string(sha1($_POST["kodikos"])) . ")";
		$result = Globals::query($query);

		while ($result->fetch_row())
		$found = TRUE;

		$result->close();

		if ($found)
		return __CLASS__;

		return self::error_set([
			"pedio" => "login",
			"minima" => "Login failed",
		]);
	}

	public static function error_set($error) {
		$error["error"] = 1;
		self::$error = $error;

		return __CLASS__;
	}

	public static function error_check() {
		if (!isset(self::$error))
		return;

		print Globals::json_encode(self::$error);
		exit(0);
	}
}
?>
