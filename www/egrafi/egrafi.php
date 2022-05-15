<?php
require_once("../lib/selida.php");
Selida::unset_xristis();
Selida::header_json();

if ($error = Egrafi::invalid_data())
Egrafi::return_error($error);

if ($error = Egrafi::xristis_exists())
Egrafi::return_error($error);

if ($error = Egrafi::insert_xristis_failed())
Egrafi::return_error($error);

$_SESSION[SESSION_XRISTIS] = $_POST["login"];
print Globals::json_encode(array("login" => $_POST["login"]));

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

		return FALSE;
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
		return array(
			"pedio" => "login",
			"minima" => "Υπάρχει ήδη χρήστης με το όνομα '" .
				$_POST["login"] . "'"
		);

		return FALSE;
	}

	public static function insert_xristis_failed() {
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
		return FALSE;

		return array(
			"pedio" => "login",
			"minima" => "Απέτυχε η εγγραφή του χρήστη '" .
				Globals::sql_string($_POST["login"]) .
				"' στην database"
		);
	}

	public static function return_error($error) {
		$error["error"] = 1;
		print Globals::json_encode($error);
		exit(0);
	}
}
?>
