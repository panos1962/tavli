<?php
require_once("../lib/selida.php");
Selida::header_json();

Account::data_check();
Account::error_check();

if (Selida::is_xristis())
Account::enimerosi();

else
Account::egrafi();

Account::error_check();

$_SESSION[SESSION_XRISTIS] = $_POST["login"];
print Globals::json_encode(["login" => $_POST["login"]]);

class Account {
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

		if (Selida::oxi_post("onoma"))
		return self::error_set([
			"pedio" => "onoma",
			"minima" => "Δεν περάστηκε ονοματεπώνυμο χρήστη"
		]);

		if (Globals::invalid_onoma($_POST["onoma"]))
		return self::error_set([
			"pedio" => "onoma",
			"minima" => "Μη αποδεκτό ονοματεπώνυμο χρήστη"
		]);

		if (Selida::oxi_post("email"))
		return self::error_set([
			"pedio" => "email",
			"minima" => "Δεν περάστηκε email χρήστη"
		]);

		if (Globals::invalid_email($_POST["email"]))
		return self::error_set([
			"pedio" => "email",
			"minima" => "Μη αποδεκτό email χρήστη"
		]);

		if (Selida::is_xristis()) {
			if (Selida::oxi_post("kodikos") || ($_POST["kodikos"] === ""))
			return self::error_set([
				"pedio" => "kodikos",
				"minima" => "Δεν περάστηκε κωδικός χρήστη"
			]);
		}

		else {
			if (Selida::oxi_post("kodikos1") || ($_POST["kodikos1"] === ""))
			return self::error_set([
				"pedio" => "kodikos1",
				"minima" => "Δεν περάστηκε κωδικός χρήστη"
			]);
		}

		if (Selida::oxi_post("kodikos2") ||
			($_POST["kodikos1"] !== $_POST["kodikos2"]))
		return self::error_set([
			"pedio" => "kodikos1",
			"minima" => "Οι δύο κωδικοί είναι διαφορετικοί"
		]);
	}

	public static function xristis_exists() {
		$found = FALSE;

		$query = "SELECT 1 FROM `pektis` WHERE `login` = " .
			Globals::sql_string($_POST["login"]);
		$result = Globals::query($query);

		while ($result->fetch_row())
		$found = TRUE;

		$result->close();

		if ($found)
		return self::error_set([
			"pedio" => "login",
			"minima" => "Υπάρχει ήδη χρήστης με το όνομα '" .
				$_POST["login"] . "'"
		]);

		return FALSE;
	}

	public static function egrafi() {
		$query = "INSERT INTO `pektis` (" .
			"`login`, " .
			"`onoma`, " .
			"`email`, " .
			"`kodikos`) " .
		"VALUES (" .
			Globals::sql_string($_POST["login"]) . ", " .
			Globals::sql_string($_POST["onoma"]) . ", " .
			Globals::sql_string($_POST["email"]) . ", " .
			Globals::sql_string(sha1($_POST["kodikos1"])) .
		")";

		Globals::query($query);

		if (Globals::affected_rows() === 1)
		return;

		return seld::error_set([
			"pedio" => "login",
			"minima" => "Απέτυχε η εγγραφή του χρήστη '" .
				Globals::sql_string($_POST["login"]) .
				"' στην database"
		]);
	}

	public static function enimerosi() {
		$query = "UPDATE `pektis` SET " .
			"`onoma` = " . Globals::sql_string($_POST["onoma"]) . ", " .
			"`email` = " . Globals::sql_string($_POST["email"]) . ", " .
			"`poll` = NOW()";

		if ($_POST["kodikos1"])
		$query .= ", `kodikos` = " . Globals::sql_string(sha1($_POST["kodikos1"]));

		$query .= " WHERE (`login` = " . Globals::sql_string($_POST["login"]) . ")" .
			" AND (`kodikos` = " . Globals::sql_string(sha1($_POST["kodikos"])) . ")";

		Globals::query($query);

		if (Globals::affected_rows() === 1)
		return;

		return self::error_set([
			"pedio" => "login",
			"minima" => "Απέτυχε η ενημέρωση στοιχείων του χρήστη '" .
				Globals::sql_string($_POST["login"]) . "'"
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
