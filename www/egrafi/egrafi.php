<?php
require_once("../lib/selida.php");
Selida::header_json();

unset($_SESSION[SESSION_XRISTIS]);

if ($error = Egrafi::invalid_data())
Egrafi::return_error($error);

if (!Egrafi::insert_xristis())
Egrafi::return_error();

$_SESSION[SESSION_XRISTIS] = $_POST["login"];

print Globals::json_encode(array(
	"login" => $_POST["login"],
	"onoma"=> $_POST["onoma"]
));

class Egrafi {
	public static function invalid_data() {
		if (Selida::oxi_post("login"))
		return array(
			"pedio" => "login",
			"minima" => "Δεν περάστηκε login name χρήστη"
		);

		if (Globals::invalid_login($_POST["login"]))
		return array(
			"pedio" => "login",
			"minima" => "Μη αποδεκτό login name χρήστη"
		);

		if (Selida::oxi_post("onoma"))
		return array(
			"pedio" => "onoma",
			"minima" => "Δεν περάστηκε ονοματεπώνυμο χρήστη"
		);

		if (Globals::invalid_onoma($_POST["onoma"]))
		return array(
			"pedio" => "onoma",
			"minima" => "Μη αποδεκτό ονοματεπώνυμο χρήστη"
		);

		if (Selida::oxi_post("email"))
		return array(
			"pedio" => "email",
			"minima" => "Δεν περάστηκε email χρήστη"
		);

		if (Globals::invalid_email($_POST["email"]))
		return array(
			"pedio" => "email",
			"minima" => "Μη αποδεκτό email χρήστη"
		);

		if (Selida::oxi_post("kodikos1"))
		return array(
			"pedio" => "kodikos1",
			"minima" => "Δεν περάστηκε κωδικός χρήστη"
		);

		if (Selida::oxi_post("kodikos2") ||
			($_POST["kodikos1"] !== $_POST["kodikos2"]))
		return array(
			"pedio" => "kodikos2",
			"minima" => "Οι δύο κωδικοί είναι διαφορετικοί"
		);
	}

	public static function insert_xristis() {
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

		return (Globals::affected_rows() === 1);
	}

	public static function return_error($error = NULL) {
		if (!isset($error))
		$error = array(
				"minima" => "Παρουσιάστηκε σφάλμα κατά την εισαγωγή χρήστη στην database"
		);

		$error["error"] = 1;
		print Globals::json_encode($error);
		exit(0);
	}
}
?>
